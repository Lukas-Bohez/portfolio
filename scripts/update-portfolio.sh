#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAMP_FILE="${ROOT_DIR}/out/.last-update.txt"
PORTFOLIO_URL_DEFAULT="https://quizthespire.com/LukasBohez/"

resolve_path() {
	cd "$1" && pwd -P
}

sync_output_dir() {
	local source_dir="$1"
	local target_dir="$2"

	if command -v rsync >/dev/null 2>&1; then
		rsync -a --delete "${source_dir}"/ "${target_dir}"/
	else
		cp -a "${source_dir}"/. "${target_dir}"/
	fi
}

atomic_sync_output_dir() {
	local source_dir="$1"
	local target_dir="$2"
	local target_parent
	local target_name
	local tmp_dir
	local old_dir

	target_parent="$(dirname "${target_dir}")"
	target_name="$(basename "${target_dir}")"
	tmp_dir="${target_parent}/.${target_name}.tmp.$$"
	old_dir="${target_parent}/.${target_name}.old.$$"

	rm -rf "${tmp_dir}" "${old_dir}"
	mkdir -p "${tmp_dir}"
	sync_output_dir "${source_dir}" "${tmp_dir}"

	if [[ -d "${target_dir}" ]]; then
		mv "${target_dir}" "${old_dir}"
	fi

	mv "${tmp_dir}" "${target_dir}"
	rm -rf "${old_dir}"
}

extract_build_id() {
	local static_dir="$1"
	find "${static_dir}" -mindepth 2 -maxdepth 2 -type f -name '_buildManifest.js' -printf '%h\n' | head -n 1 | xargs -r basename
}

cd "${ROOT_DIR}"

# Auto-detect Apache alias if not explicitly set
if [[ -z "${PORTFOLIO_DEPLOY_DIR:-}" ]]; then
	# Try to extract from Apache vhost config
	if [[ -f "/etc/apache2/sites-enabled/quizthespire.com-le-ssl.conf" ]]; then
		DETECTED=$(grep -oP "Alias /LukasBohez/? \K.*" /etc/apache2/sites-enabled/quizthespire.com-le-ssl.conf | head -1 | xargs)
		if [[ -z "${DETECTED}" ]]; then
			DETECTED=$(grep -oP "Alias /portfolio/? \K.*" /etc/apache2/sites-enabled/quizthespire.com-le-ssl.conf | head -1 | xargs)
		fi
		if [[ -n "${DETECTED}" ]]; then
			PORTFOLIO_DEPLOY_DIR="${DETECTED}"
			echo "[update-portfolio] Auto-detected deploy directory from Apache: ${PORTFOLIO_DEPLOY_DIR}"
		fi
	fi
fi

# Still require explicit setting if auto-detection failed
if [[ -z "${PORTFOLIO_DEPLOY_DIR:-}" ]]; then
	echo "[update-portfolio] ERROR: PORTFOLIO_DEPLOY_DIR is not set and could not be auto-detected."
	echo "[update-portfolio] Refusing to run because this can look successful locally while production stays stale."
	echo "[update-portfolio] Example: PORTFOLIO_DEPLOY_DIR=/var/www/quizthespire.com/LukasBohez npm run update:portfolio"
	exit 1
fi

echo "[update-portfolio] Building static export..."
NEXT_BASE_PATH="${NEXT_BASE_PATH:-/LukasBohez}" NEXT_STATIC_EXPORT=true npm run build

mkdir -p "${ROOT_DIR}/out"
date -u +"%Y-%m-%dT%H:%M:%SZ" > "${STAMP_FILE}"

echo "[update-portfolio] Updated out/ at $(cat "${STAMP_FILE}")"

DEPLOY_DIR="${PORTFOLIO_DEPLOY_DIR}"
mkdir -p "${DEPLOY_DIR}"

if [[ "$(resolve_path "${ROOT_DIR}/out")" != "$(resolve_path "${DEPLOY_DIR}")" ]]; then
	echo "[update-portfolio] Publishing out/ to ${DEPLOY_DIR}..."
	atomic_sync_output_dir "${ROOT_DIR}/out" "${DEPLOY_DIR}"
	echo "[update-portfolio] Published to ${DEPLOY_DIR}"
fi

if [[ ! -f "${ROOT_DIR}/out/index.html" || ! -f "${DEPLOY_DIR}/index.html" ]]; then
	echo "[update-portfolio] ERROR: index.html missing in build output or deploy directory."
	exit 3
fi

SOURCE_SUM="$(sha256sum "${ROOT_DIR}/out/index.html" | awk '{print $1}')"
DEPLOY_SUM="$(sha256sum "${DEPLOY_DIR}/index.html" | awk '{print $1}')"

echo "[update-portfolio] Source index checksum: ${SOURCE_SUM}"
echo "[update-portfolio] Deploy index checksum: ${DEPLOY_SUM}"

if [[ "${SOURCE_SUM}" != "${DEPLOY_SUM}" ]]; then
	echo "[update-portfolio] ERROR: deploy checksum mismatch after copy."
	exit 4
fi

DEPLOY_REV="$(git -C "${ROOT_DIR}" rev-parse HEAD)"
printf "%s | %s\n" "$(date -u '+%Y-%m-%d %H:%M:%SZ')" "${DEPLOY_REV}" > "${DEPLOY_DIR}/last-deployed.txt"
echo "[update-portfolio] Wrote ${DEPLOY_DIR}/last-deployed.txt"

BUILD_ID="$(extract_build_id "${ROOT_DIR}/out/_next/static")"
PORTFOLIO_URL="${PORTFOLIO_URL:-${PORTFOLIO_URL_DEFAULT}}"

if [[ -n "${BUILD_ID}" ]] && command -v curl >/dev/null 2>&1; then
	echo "[update-portfolio] Verifying live URL ${PORTFOLIO_URL} serves build ${BUILD_ID}..."
	LIVE_HTML="$(curl -fsSL "${PORTFOLIO_URL}?v=$(cat "${STAMP_FILE}")")"
	if grep -q -- "${BUILD_ID}" <<<"${LIVE_HTML}"; then
		echo "[update-portfolio] Live verification passed."
	else
		echo "[update-portfolio] WARNING: Live page does not include build ${BUILD_ID}."
		echo "[update-portfolio] Check Apache mapping for /LukasBohez and any CDN/reverse-proxy cache."
		exit 2
	fi
fi

echo "[update-portfolio] Done."

#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAMP_FILE="${ROOT_DIR}/out/.last-update.txt"
PORTFOLIO_URL_DEFAULT="https://quizthespire.com/portfolio/"

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

extract_build_id() {
	local static_dir="$1"
	find "${static_dir}" -mindepth 2 -maxdepth 2 -type f -name '_buildManifest.js' -printf '%h\n' | head -n 1 | xargs -r basename
}

cd "${ROOT_DIR}"

if [[ -z "${PORTFOLIO_DEPLOY_DIR:-}" ]]; then
	echo "[update-portfolio] ERROR: PORTFOLIO_DEPLOY_DIR is not set."
	echo "[update-portfolio] Refusing to run because this can look successful locally while production stays stale."
	echo "[update-portfolio] Example: PORTFOLIO_DEPLOY_DIR=/var/www/quizthespire.com/portfolio npm run update:portfolio"
	exit 1
fi

echo "[update-portfolio] Building static export..."
NEXT_BASE_PATH="${NEXT_BASE_PATH:-/portfolio}" npm run build

mkdir -p "${ROOT_DIR}/out"
date -u +"%Y-%m-%dT%H:%M:%SZ" > "${STAMP_FILE}"

echo "[update-portfolio] Updated out/ at $(cat "${STAMP_FILE}")"

DEPLOY_DIR="${PORTFOLIO_DEPLOY_DIR}"
mkdir -p "${DEPLOY_DIR}"

if [[ "$(resolve_path "${ROOT_DIR}/out")" != "$(resolve_path "${DEPLOY_DIR}")" ]]; then
	echo "[update-portfolio] Publishing out/ to ${DEPLOY_DIR}..."
	sync_output_dir "${ROOT_DIR}/out" "${DEPLOY_DIR}"
	echo "[update-portfolio] Published to ${DEPLOY_DIR}"
fi

BUILD_ID="$(extract_build_id "${ROOT_DIR}/out/_next/static")"
PORTFOLIO_URL="${PORTFOLIO_URL:-${PORTFOLIO_URL_DEFAULT}}"

if [[ -n "${BUILD_ID}" ]] && command -v curl >/dev/null 2>&1; then
	echo "[update-portfolio] Verifying live URL ${PORTFOLIO_URL} serves build ${BUILD_ID}..."
	LIVE_HTML="$(curl -fsSL "${PORTFOLIO_URL}?v=$(cat "${STAMP_FILE}")")"
	if grep -q "${BUILD_ID}" <<<"${LIVE_HTML}"; then
		echo "[update-portfolio] Live verification passed."
	else
		echo "[update-portfolio] WARNING: Live page does not include build ${BUILD_ID}."
		echo "[update-portfolio] Check Apache mapping for /portfolio and any CDN/reverse-proxy cache."
		exit 2
	fi
fi

echo "[update-portfolio] Done."

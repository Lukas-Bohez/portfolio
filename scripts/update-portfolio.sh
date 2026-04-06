#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAMP_FILE="${ROOT_DIR}/out/.last-update.txt"

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

cd "${ROOT_DIR}"

echo "[update-portfolio] Building static export..."
npm run build

mkdir -p "${ROOT_DIR}/out"
date -u +"%Y-%m-%dT%H:%M:%SZ" > "${STAMP_FILE}"

echo "[update-portfolio] Updated out/ at $(cat "${STAMP_FILE}")"

if [[ -n "${PORTFOLIO_DEPLOY_DIR:-}" ]]; then
	DEPLOY_DIR="${PORTFOLIO_DEPLOY_DIR}"
	mkdir -p "${DEPLOY_DIR}"

	if [[ "$(resolve_path "${ROOT_DIR}/out")" != "$(resolve_path "${DEPLOY_DIR}")" ]]; then
		echo "[update-portfolio] Publishing out/ to ${DEPLOY_DIR}..."
		sync_output_dir "${ROOT_DIR}/out" "${DEPLOY_DIR}"
		echo "[update-portfolio] Published to ${DEPLOY_DIR}"
	fi
fi

echo "[update-portfolio] If Apache serves /portfolio from your deploy dir, reload or refresh cache after publishing."

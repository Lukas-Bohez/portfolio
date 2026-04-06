#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAMP_FILE="${ROOT_DIR}/out/.last-update.txt"

cd "${ROOT_DIR}"

echo "[update-portfolio] Building static export..."
npm run build

mkdir -p "${ROOT_DIR}/out"
date -u +"%Y-%m-%dT%H:%M:%SZ" > "${STAMP_FILE}"

echo "[update-portfolio] Updated out/ at $(cat "${STAMP_FILE}")"
echo "[update-portfolio] If Apache aliases /portfolio to out/, changes are now live after reload/cache refresh."

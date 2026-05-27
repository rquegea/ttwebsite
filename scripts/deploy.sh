#!/usr/bin/env bash
# Build static export of the Next.js site and sync to both GCS buckets.
# - gs://trucoytrufa-web-prod  (GCP Load Balancer backend)
# - gs://www.trucoytrufa.es    (Cloudflare origin — the one actually serving production)
# Admin/acceso routes are built but excluded from the GCS sync.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BUCKET="${BUCKET:-gs://trucoytrufa-web-prod}"
WWW_BUCKET="gs://www.trucoytrufa.es"

echo "==> Building static export"
rm -rf out .next
npm run build

if [ ! -d out ]; then
  echo "ERROR: 'out/' directory not found after build." >&2
  exit 1
fi

echo "==> Removing admin/acceso from export (not for production)"
rm -rf out/admin out/acceso

echo "==> Generating root-level redirect stubs"
node scripts/generate-root-redirects.mjs

echo "==> Syncing to ${BUCKET}"
gsutil -m rsync -r -d out "${BUCKET}"

echo "==> Syncing to ${WWW_BUCKET} (Cloudflare origin)"
gsutil -m rsync -r -d out "${WWW_BUCKET}"

echo "==> Setting cache headers on HTML (short) and static assets (long)"
for B in "${BUCKET}" "${WWW_BUCKET}"; do
  gsutil -m setmeta -r -h "Cache-Control:public,max-age=300,must-revalidate" \
    "${B}/es/" "${B}/en/" 2>/dev/null || true
  gsutil -m setmeta -h "Cache-Control:public,max-age=300,must-revalidate" \
    "${B}/index.html" "${B}/404.html" "${B}/coming-soon.html" 2>/dev/null || true
  gsutil -m setmeta -r -h "Cache-Control:public,max-age=31536000,immutable" \
    "${B}/_next/static/" 2>/dev/null || true
done

echo "==> Done. Visit https://trucoytrufa.es"

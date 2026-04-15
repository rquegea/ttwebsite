#!/usr/bin/env bash
# Build static export of the Next.js site and sync to gs://trucoytrufa.es/.
# Admin/acceso routes are temporarily hidden so they are NOT exported to production.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BUCKET="${BUCKET:-gs://trucoytrufa.es}"

HIDDEN=()
restore() {
  for name in "${HIDDEN[@]}"; do
    if [ -d "app/_hidden_${name}" ]; then
      mv "app/_hidden_${name}" "app/${name}"
    fi
  done
}
trap restore EXIT

for name in admin acceso; do
  if [ -d "app/${name}" ]; then
    mv "app/${name}" "app/_hidden_${name}"
    HIDDEN+=("${name}")
  fi
done

echo "==> Building static export"
rm -rf out .next
npm run build

if [ ! -d out ]; then
  echo "ERROR: 'out/' directory not found after build." >&2
  exit 1
fi

echo "==> Generating root-level redirect stubs"
node scripts/generate-root-redirects.mjs

echo "==> Syncing to ${BUCKET}"
gsutil -m rsync -r -d out "${BUCKET}"

echo "==> Setting cache headers on HTML (short) and static assets (long)"
gsutil -m setmeta -h "Cache-Control:public,max-age=300,must-revalidate" \
  "${BUCKET}/**/*.html" "${BUCKET}/*.html" 2>/dev/null || true
gsutil -m setmeta -h "Cache-Control:public,max-age=31536000,immutable" \
  "${BUCKET}/_next/static/**" 2>/dev/null || true

echo "==> Invalidating Cloud CDN cache (trucoytrufa-lb)"
gcloud compute url-maps invalidate-cdn-cache trucoytrufa-lb --path "/*" --async || true

echo "==> Done. Visit https://trucoytrufa.es (CDN invalidation takes 1-5 min)"

// For every path under out/es/ (and en/ paths not covered by es/), create a
// bare-path index.html that runs language detection and redirects to the
// appropriate /es/ or /en/ URL. This replaces the old middleware behavior
// for users who land on /brand-radar/, /marketing/strategy/, etc.

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'out');

function listPathsUnder(dir, prefix = []) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const sub = path.join(dir, entry.name);
    const parts = [...prefix, entry.name];
    if (fs.existsSync(path.join(sub, 'index.html'))) {
      out.push(parts.join('/'));
    }
    out.push(...listPathsUnder(sub, parts));
  }
  return out;
}

function stubHtml(esUrl, enUrl) {
  const fallback = esUrl || enUrl;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>T&T</title>
<meta name="robots" content="noindex">
<script>
(function(){
  try {
    var esUrl = ${JSON.stringify(esUrl)};
    var enUrl = ${JSON.stringify(enUrl)};
    var cookie = (document.cookie.match(/(?:^|;\\s*)NEXT_LOCALE=(en|es)/) || [])[1];
    var lang = cookie || ((navigator.language || 'es').toLowerCase().split('-')[0]);
    var target = (lang === 'en' && enUrl) ? enUrl : (esUrl || enUrl);
    location.replace(target);
  } catch (e) {
    location.replace(${JSON.stringify(fallback)});
  }
})();
</script>
<noscript><meta http-equiv="refresh" content="0;url=${fallback}"></noscript>
</head>
<body></body>
</html>`;
}

function writeStub(bareRel, esUrl, enUrl) {
  const dest = path.join(ROOT, bareRel, 'index.html');
  // Skip if a real page already exists at the bare path (don't overwrite /es/, /en/ etc.)
  if (fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, stubHtml(esUrl, enUrl));
}

const esPaths = new Set(listPathsUnder(path.join(ROOT, 'es')));
const enPaths = new Set(listPathsUnder(path.join(ROOT, 'en')));

let count = 0;
for (const p of esPaths) {
  const enUrl = enPaths.has(p) ? `/en/${p}/` : null;
  writeStub(p, `/es/${p}/`, enUrl);
  count++;
}
for (const p of enPaths) {
  if (esPaths.has(p)) continue;
  writeStub(p, null, `/en/${p}/`);
  count++;
}

console.log(`Generated ${count} root-level redirect stubs.`);

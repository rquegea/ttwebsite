const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const pages = {
  think: ['creatividad', 'pr-comunicacion', 'performance', 'trade-marketing'],
  tech: ['desarrollo', 'inteligencia-artificial', 'crm', 'automatizacion'],
  trends: ['consultoria', 'data-analitica', 'investigacion'],
  team: ['captacion', 'formacion', 'teambuilding'],
  events: ['corporativos', 'stands', 'marketing-experiencial']
};

// Replace body with <body class="light-theme">
let lightIndex = indexHtml.replace('<body>', '<body class="light-theme">');
// Change paths in lightIndex so they work from subdirectories if necessary. Wait, if we use /think/index.html, hrefs to "/" or "/src/main.js" need to be absolute like "/src/main.js". 
// indexHtml already uses "/src/main.js" and "styles.css". Let's change styles.css to "/styles.css"
lightIndex = lightIndex.replace('href="styles.css"', 'href="/styles.css"');
lightIndex = lightIndex.replace('src="src/main.js"', 'src="/src/main.js"');

function createPage(dirPath, pageName) {
  const fullPath = path.join(__dirname, dirPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  
  // Here we could customize the main content inside <main>...
  // For now, just generate the structure with a placeholder title.
  // We'll replace the main content block.
  
  const mainRegex = /<main>[\s\S]*?<\/main>/;
  const newMain = `<main style="padding-top: 150px; min-height: 80vh; text-align: center;"><h1>${pageName}</h1></main>`;
  const pageHtml = lightIndex.replace(mainRegex, newMain);
  
  fs.writeFileSync(path.join(fullPath, 'index.html'), pageHtml);
}

// Generate main category pages
for (const [category, submenus] of Object.entries(pages)) {
  createPage(category, `Página de t&${category}`);
  
  for (const sub of submenus) {
    createPage(`${category}/${sub}`, `Página de ${sub.replace('-', ' ')}`);
  }
}

console.log('Pages generated!');

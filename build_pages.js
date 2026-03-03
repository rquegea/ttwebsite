const fs = require('fs');
const path = require('path');

let indexHtml = fs.readFileSync('index.html', 'utf8');

const pages = {
    think: ['creatividad', 'pr-comunicacion', 'performance', 'trade-marketing'],
    tech: ['desarrollo', 'inteligencia-artificial', 'crm', 'automatizacion'],
    trends: ['consultoria', 'data-analitica', 'investigacion'],
    team: ['captacion', 'formacion', 'teambuilding'],
    events: ['corporativos', 'stands', 'marketing-experiencial']
};

const formatTitle = (slug) => {
    return slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
};

// Adjust relative sources to absolute for subdirectories
let template = indexHtml.replace('href="styles.css"', 'href="/styles.css"');
template = template.replace('<body>', '<body class="light-theme">');

// Find the content to replace (from hero until footer)
const contentStart = template.indexOf('<section class="hero">');
const contentEnd = template.indexOf('<footer class="footer">');

if (contentStart !== -1 && contentEnd !== -1) {
    const beforeContent = template.substring(0, contentStart);
    const afterContent = template.substring(contentEnd);

    function createPage(dirPath, pageName) {
        const fullPath = path.join(__dirname, dirPath);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }

        const newMain = `<main style="padding-top: 15rem; min-height: 80vh; text-align: center;">\n  <h1>${pageName}</h1>\n</main>\n`;
        const pageHtml = beforeContent + newMain + afterContent;

        fs.writeFileSync(path.join(fullPath, 'index.html'), pageHtml);
    }

    // Generate main category pages
    for (const [category, submenus] of Object.entries(pages)) {
        createPage(category, `t&${category} Overview`);

        for (const sub of submenus) {
            createPage(`${category}/${sub}`, formatTitle(sub));
        }
    }

    console.log('Pages generated successfully!');
} else {
    console.error('Could not find content sections to replace.');
}

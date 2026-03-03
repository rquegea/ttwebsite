const fs = require('fs');
const path = require('path');

let indexHtml = fs.readFileSync('index.html', 'utf8');

const pagesConf = {
    think: [
        { slug: 'creativity-art-direction', title: 'Creativity and Art Direction' },
        { slug: 'pr-communication', title: 'PR and Communication' },
        { slug: 'performance-media', title: 'Performance and Media' },
        { slug: 'trade-marketing', title: 'Trade Marketing' }
    ],
    tech: [
        { slug: 'web-app-development', title: 'Web and App Development' },
        { slug: 'artificial-intelligence', title: 'Artificial Intelligence' },
        { slug: 'crm-systems', title: 'CRM Systems' },
        { slug: 'automation', title: 'Automation' }
    ],
    trends: [
        { slug: 'strategic-consulting', title: 'Strategic Consulting' },
        { slug: 'data-analytics', title: 'Data and Analytics' },
        { slug: 'market-research', title: 'Market Research' }
    ],
    team: [
        { slug: 'recruitment-talent', title: 'Recruitment and Talent' },
        { slug: 'continuous-training', title: 'Continuous Training' },
        { slug: 'teambuilding', title: 'Teambuilding' }
    ],
    events: [
        { slug: 'corporate-events', title: 'Corporate Events' },
        { slug: 'stand-design', title: 'Stand Design' },
        { slug: 'experiential-marketing', title: 'Experiential Marketing' }
    ]
};

// Replace top level links
Object.keys(pagesConf).forEach(cat => {
    indexHtml = indexHtml.replace(new RegExp(`<a href="#">t&amp;${cat}`, 'g'), `<a href="/${cat}/">t&amp;${cat}`);
    indexHtml = indexHtml.replace(new RegExp(`<a href="#">t&${cat}`, 'g'), `<a href="/${cat}/">t&${cat}`);
});

// Wrap feature items with links
for (const [cat, items] of Object.entries(pagesConf)) {
    for (const item of items) {
        const title = item.title;
        // Look for <div class="feature-item( active)?">\s*<h3>Title</h3>
        const r1 = new RegExp(`(<div class="feature-item(?: active)?">\\s*)(<h3>${title}</h3>)`, 'g');
        if (indexHtml.match(r1)) {
            // Find everything up to the closing div of the feature item to wrap it.
            // Actually it's easier to just wrap the inner contents.
            // Or we can just do a very simple replacement:
            const searchStr = `<h3>${title}</h3>`;
            const linkStart = `<a href="/${cat}/${item.slug}/" style="display:block; text-decoration:none; color:inherit;">`;
            const linkEnd = `</a>`;

            // We know structure is: <h3>...</h3>\s*<p>...</p>
            const regexStr = `(<h3>${title}</h3>\\s*<p>[^<]+</p>)`;
            const r2 = new RegExp(regexStr, 'g');
            indexHtml = indexHtml.replace(r2, `${linkStart}$1${linkEnd}`);
        }
    }
}

fs.writeFileSync('index.html', indexHtml);

// Now generate pages
let template = indexHtml.replace('href="styles.css"', 'href="/styles.css"');
template = template.replace('src="/src/main.js"', 'src="/src/main.js"'); // ensure absolute if changed
template = template.replace('src="src/main.js"', 'src="/src/main.js"'); // ensure absolute
template = template.replace('<body>', '<body class="light-theme">');

const contentStart = template.indexOf('<section class="hero">');
const contentEnd = template.indexOf('<footer class="footer">');

if (contentStart !== -1 && contentEnd !== -1) {
    const beforeContent = template.substring(0, contentStart);
    const afterContent = template.substring(contentEnd);

    function createPage(dirPath, pageName, descOpt) {
        const fullPath = path.join(__dirname, dirPath);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }

        const newMain = `<main style="padding: 15rem 2rem 5rem 2rem; min-height: 80vh; text-align: center;">
        <h1 style="color: #000; font-size: 3rem; margin-bottom: 1rem;">${pageName}</h1>
        ${descOpt ? `<p style="color: #444; font-size: 1.2rem; max-width: 600px; margin: 0 auto;">${descOpt}</p>` : ''}
      </main>\n`;
        const pageHtml = beforeContent + newMain + afterContent;

        fs.writeFileSync(path.join(fullPath, 'index.html'), pageHtml);
    }

    // Generate main category pages
    for (const [category, submenus] of Object.entries(pagesConf)) {
        createPage(category, `t&${category}`, `Explora todas nuestras soluciones de ${category}.`);

        for (const sub of submenus) {
            // extract the p text if possible
            const r2 = new RegExp(`<h3>${sub.title}</h3>\\s*<p>([^<]+)</p>`);
            const match = indexHtml.match(r2);
            const desc = match ? match[1] : `Detalles sobre ${sub.title}`;
            createPage(`${category}/${sub.slug}`, sub.title, desc);
        }
    }

    console.log('Pages generated successfully!');
} else {
    console.error('Could not find content sections to replace.');
}

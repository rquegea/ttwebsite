const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// For top level links
const categories = ['think', 'tech', 'trends', 'team', 'events'];
categories.forEach(cat => {
    const rx = new RegExp(`<a href="#">t&amp;${cat}`, 'g');
    html = html.replace(rx, `<a href="/${cat}/">t&amp;${cat}`);
    // In case it's not escaped
    const rx2 = new RegExp(`<a href="#">t&${cat}`, 'g');
    html = html.replace(rx2, `<a href="/${cat}/">t&${cat}`);
});

// We need to match <div class="feature-item ..."> <h3>...</h3> <p>...</p> </div>
// and wrap the h3 + p in an <a> tag.
// We can do this iteratively or via cheerio. Cheerio is safer.

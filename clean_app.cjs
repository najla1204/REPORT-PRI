const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Remove STUDENTS array
appTsx = appTsx.replace(/const STUDENTS = \[\s*\{[\s\S]*?\}\s*\];/g, '');

// Remove OVERALL object
appTsx = appTsx.replace(/const OVERALL = \{[\s\S]*?\};/g, '');

// Remove DOMAINS array
appTsx = appTsx.replace(/const DOMAINS = \[\s*\{[\s\S]*?\}\s*\];/g, '');

fs.writeFileSync('src/App.tsx', appTsx);

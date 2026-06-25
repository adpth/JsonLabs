const fs = require('fs');
const files = [
  'src/components/JsonTreeViewer.jsx',
  'src/data/challenges.js',
  'src/data/lessons.js',
  'src/data/playgroundSamples.js',
  'src/pages/Dashboard.jsx',
  'src/pages/PracticePage.jsx',
  'src/components/Layout.jsx',
  'src/contexts/ToastContext.jsx'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.split('\\`').join('`');
  c = c.split('\\${').join('${');
  fs.writeFileSync(f, c);
  console.log("Fixed " + f);
});

const fs = require('fs');
const path = require('path');

const dirToSearch = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let replaced = content.replace(/import { useApp } from '[\.\/]+context\/AppContext';/g, "import { useApp } from '../context/useApp';");
  replaced = replaced.replace(/import { useApp } from '\.\/context\/AppContext';/g, "import { useApp } from './context/useApp';");
  if (content !== replaced) {
    fs.writeFileSync(filePath, replaced);
    console.log('Updated:', filePath);
  }
}

function walkPath(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkPath(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkPath(dirToSearch);

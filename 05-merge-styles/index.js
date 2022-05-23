const _fs = require('fs');
const path = require('path');

const fs = _fs.promises;

const dest = path.join(__dirname, 'project-dist');

async function bundleCss() {
  const styles = await fs.readdir(path.join(__dirname, 'styles'));
  for (const fileWithExt of styles) {
    if (path.extname(fileWithExt) === '.css') {
      const fileContent = await fs.readFile(path.join(__dirname, 'styles', fileWithExt));
      await fs.appendFile(path.join(dest, 'bundle.css'),  fileContent.toString());
    }
  }
}
  
bundleCss();

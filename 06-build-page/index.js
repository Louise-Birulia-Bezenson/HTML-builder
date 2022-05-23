const _fs = require('fs');
const path = require('path');

const fs = _fs.promises;

const dest = path.join(__dirname, 'project-dist');


async function createIndexHtml() {
  await fs.rm(dest, { recursive: true });
  await fs.mkdir(dest);

  const template = await fs.readFile(path.join(__dirname, 'template.html'));
  
  const components = await fs.readdir(path.join(__dirname, 'components'));

  let templateStr = template.toString();
  for (const fileWithExt of components) {
    const fileName = fileWithExt.split('.')[0];
    const componentContent = await fs.readFile(path.join(__dirname, 'components', fileWithExt));
    templateStr = templateStr.replace(`{{${fileName}}}`, componentContent.toString());
  }

  await fs.appendFile(path.join(dest, 'index.html'), templateStr);
}

async function copyFolderRecursive(source, target) {
  const stat = await fs.stat(source);

  const targetFolder = path.join(target, path.basename(source));
  await fs.mkdir(targetFolder);

  if (stat.isDirectory()) {
    const dirContent = await fs.readdir(source);
    for (const file of dirContent) {
      const curSource = path.join(source, file);
      const innerStat = await fs.stat(curSource);
      if (innerStat.isDirectory()) {
        await copyFolderRecursive(curSource, targetFolder);
      } else {
        await fs.copyFile(curSource, path.join(targetFolder, file));
      }
    }
  }
}

async function copyAssets() {
  await copyFolderRecursive(path.join(__dirname, 'assets'), dest);
}

async function bundleCss() {
  const styles = await fs.readdir(path.join(__dirname, 'styles'));
  for (const fileWithExt of styles) {
    const fileContent = await fs.readFile(path.join(__dirname, 'styles', fileWithExt));
    await fs.appendFile(path.join(dest, 'style.css'),  fileContent.toString());
  }
}

(async function () {
  await createIndexHtml();
  await copyAssets();
  await bundleCss();
})();
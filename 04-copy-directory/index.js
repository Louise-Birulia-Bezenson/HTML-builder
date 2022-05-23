
const _fs = require('fs');
const path = require('path');

const fs = _fs.promises;

const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

async function recopy() {
  await fs.rm(dest, { recursive: true });
  await fs.mkdir(dest);
  const files = await fs.readdir(src);

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    await fs.copyFile(
      path.join(src, fileName),
      path.join(dest, fileName),
    );
  }
}

(async function() {
  await recopy();

  const watcher = fs.watch(src);

  // eslint-disable-next-line no-unused-vars
  for await (const event of watcher) {
    await recopy();
  }
})();

const fs = require('fs/promises');
const path = require('path');
async function checkFilesInFolder() {
  const pathToDir = path.join(__dirname, 'secret-folder');
  try {
    const allFiles = await fs.readdir(pathToDir, { withFileTypes: true });
    for (const file of allFiles) {
      if (file.isFile()) {
        const fileExt = path.extname(file.name);
        const fileName = path.basename(file.name, fileExt);
        const filePath = path.join(pathToDir, file.name);
        const stats = await fs.stat(filePath);
        console.log(`${fileName} - ${fileExt.slice(1)} - ${stats.size}`);
      }
    }
  } catch (err) {
    console.error('Error reading', err);
  }
}

checkFilesInFolder();

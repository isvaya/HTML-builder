const fs = require('fs/promises');
const path = require('path');
async function copyDir() {
  const dirPath = path.join(__dirname, 'files');
  const newFolder = path.join(__dirname, 'files-copy');
  try {
    await fs.mkdir(newFolder, { recursive: true });
    const allFiles = await fs.readdir(dirPath, { withFileTypes: true });
    const deleteFiles = await fs.readdir(newFolder, { withFileTypes: true });
    for (const fileD of deleteFiles) {
      const filePath = path.join(newFolder, fileD.name);
      await fs.rm(filePath, { recursive: true, force: true });
    }
    for (const file of allFiles) {
      const dirFilePath = path.join(dirPath, file.name);
      const newFilePath = path.join(newFolder, file.name);
      if (file.isFile()) {
        await fs.copyFile(dirFilePath, newFilePath);
      }
    }
    console.log('Copyright done!');
  } catch (err) {
    console.log('Error to copyright!', err.message);
  }
}
copyDir();
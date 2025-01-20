const fs = require('fs/promises');
const path = require('path');
async function createBundleCss() {
  const dirPath = path.join(__dirname, 'styles');
  const filePath = path.join(__dirname, 'project-dist');
  const bundlePath = path.join(filePath, 'bundle.css');
  try {
    await fs.mkdir(filePath, { recursive: true });
    const allFiles = await fs.readdir(dirPath, { withFileTypes: true });
    let allStyles = '';
    for (const file of allFiles) {
      if (file.isFile()) {
        const fileExt = path.extname(file.name);
        if (fileExt === '.css') {
          const filePath = path.join(dirPath, file.name);
          const fileContent = await fs.readFile(filePath, 'utf-8');
          allStyles += fileContent + '\n';
        }
      }
    }
    await fs.writeFile(bundlePath, allStyles, 'utf-8');
    console.log('Bundle CSS done succesfully!');
  } catch (err) {
    console.log('Error to create bundle', err.message);
  }
}
createBundleCss();
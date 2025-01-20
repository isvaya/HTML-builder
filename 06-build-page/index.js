const fs = require('fs/promises');
const path = require('path');
async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if ( entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}
async function buildPage() {
  const buildPath = path.join(__dirname, 'project-dist');
  const stylesPath = path.join(__dirname, 'styles');
  const componentsPath = path.join(__dirname, 'components');
  const htmlPath = path.join(buildPath, 'index.html');
  const cssPath = path.join(buildPath, 'style.css');
  const assetsPath = path.join(__dirname, 'assets');
  try {
    await fs.mkdir(buildPath, { recursive: true });
    const templatePath = path.join(__dirname, 'template.html');
    let templateContent = await fs.readFile(templatePath, 'utf-8');
    const componentFiles = await fs.readdir(componentsPath, {
      withFileTypes: true,
    });
    for (const file of componentFiles) {
      if (file.isFile() && path.extname(file.name) === '.html') {
        const componentName = path.basename(file.name, '.html');
        const componentPath = path.join(componentsPath, file.name);
        const componentContent = await fs.readFile(componentPath, 'utf-8');
        const tag = `{{${componentName}}}`;
        templateContent = templateContent.replace(
          new RegExp(tag, 'g'),
          componentContent,
        );
      }
    }
    await fs.writeFile(htmlPath, templateContent);
    console.log('HTML build done!');
    const allFilesStyles = await fs.readdir(stylesPath, {
      withFileTypes: true,
    });
    let allStyles = '';
    for (const file of allFilesStyles) {
      if (file.isFile()) {
        const fileExt = path.extname(file.name);
        if (fileExt === '.css') {
          const filePath = path.join(stylesPath, file.name);
          const fileContent = await fs.readFile(filePath, 'utf-8');
          allStyles += fileContent + '\n';
        }
      }
    }
    await fs.writeFile(cssPath, allStyles, 'utf-8');
    console.log('All Css files copied to style.css');

    const newAssets = path.join(buildPath, 'assets');
    await copyDirectory(assetsPath, newAssets);
    console.log('Copied assets files done!');
  } catch (err) {
    console.log('Error to build page!', err.message);
  }
}
buildPage();
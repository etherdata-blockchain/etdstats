const { join } = require('path');
const fs = require('fs');
const ncc = require('@vercel/ncc');

async function main() {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const oldVersion = pkg.version;
  const mongooseVersion = pkg.dependencies.mongoose;

  pkg.version = mongooseVersion;
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
  // ncc
  try {
    const { code } = await ncc(join(__dirname, '../dist/main.js'));
    fs.writeFileSync(join(__dirname, '../dist/index.js'), code);
  } catch (e) {
    console.error(e);
  }
  pkg.version = oldVersion;
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
}

main();

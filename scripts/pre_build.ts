import fs from 'fs';
import path from 'path';
import glob from 'glob';

/**
 * Copy shared grpc folder in the root to monorepo packages
 */
export default function main() {
  const dir = './services';
  const sourceDir = './grpc';
  const files = glob.sync(path.join(sourceDir, '*.proto'));
  const folders = fs
    .readdirSync(dir)
    .filter((folder) => fs.lstatSync(path.join(dir, folder)).isDirectory());

  for (const folder of folders) {
    const outputDir = path.join(dir, folder, 'src', 'grpc');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    console.log(`Copying to ${outputDir}`);
    for (const file of files) {
      fs.copyFileSync(file, path.join(outputDir, path.basename(file)));
    }
  }
}

main();

import fs from 'fs';
import path from 'path';

function main() {
  const dir = './services';
  const sourceDir = './grpc';
  const folders = fs
    .readdirSync(dir)
    .filter((folder) => fs.lstatSync(path.join(dir, folder)).isDirectory());

  for (const folder of folders) {
    const outputDir = path.join(dir, folder, 'grpc');
    fs.symlinkSync(outputDir, sourceDir);
  }
}

main();

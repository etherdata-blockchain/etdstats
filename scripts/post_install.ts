import fs from 'fs';
import path from 'path';
import glob from 'glob';

/**
 * Will copy everything from fromDir to toDir
 * @param fromDir
 * @param toDir
 * @param createExtraDirectoryName will append this name to the toDir
 */
function copyTo(
  fromDir: string,
  toDir: string,
  createExtraDirectoryName?: string,
) {
  const files = glob
    .sync(fromDir)
    .filter((file) => fs.lstatSync(file).isFile());
  const destFolders = glob
    .sync(toDir)
    .filter((file) => fs.lstatSync(file).isDirectory());

  for (const destFolder of destFolders) {
    for (const file of files) {
      const filename = path.basename(file);
      const copyDest = path.join(destFolder, createExtraDirectoryName ?? '');
      console.log(`Copying file ${filename} to ${copyDest}`);
      if (!fs.existsSync(copyDest)) {
        fs.mkdirSync(copyDest);
      }
      fs.copyFileSync(file, path.join(copyDest, filename));
    }
  }
}

/**
 * Copy shared grpc folder in the root to monorepo packages
 */
export default function main() {
  // copy grpc protobuf to services
  copyTo('./shared/grpc/*', 'services/*/src', 'grpc');
}

main();

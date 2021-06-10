import { promises as fsp } from 'fs';
import fetch from 'node-fetch';
import { cloudinary } from './cloudinary.js';
import { ASSETS_ROOT_PATH, RELATIVE_ASSETS_PATH } from './constants.js';

/**
 * This function converts gif to video and returns the necessary markup
 * @param {string} fileName without extension
 */
async function optimizeGif(fileName) {
  const folderPath = `${ASSETS_ROOT_PATH}media/${fileName}`;
  const gifPath = `${folderPath}.gif`;

  try {
    await fsp.mkdir(folderPath);
  } catch (e) {
    // console.log(e);
  }

  const res = await cloudinary.uploader.upload(gifPath, {
    format: 'mp4',
    folder: 'media',
    transformation: {
      quality: 80,
    },
    use_filename: true,
    overwrite: true,
  });

  console.log(res.url);

  const buffer = await fetch(res.url).then((res) => res.buffer());

  await fsp.writeFile(folderPath + '/vidgif.mp4', buffer);

  console.log(`Starting gif conversion: ${fileName}`);

  console.log(`Done with GIF: ${fileName}`);
  console.log();
}

export { optimizeGif };

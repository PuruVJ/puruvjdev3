import { promises as fsp } from 'fs';
import fetch from 'node-fetch';
import { cloudinary } from './cloudinary.js';
import { ASSETS_ROOT_PATH } from './constants';

/**
 * Converts gif to video and returns the necessary markup
 */
export async function optimizeGif(fileName: string) {
  const folderPath = `${ASSETS_ROOT_PATH}media/${fileName}`;
  const gifPath = `${folderPath}.gif`;

  try {
    await fsp.mkdir(folderPath);
  } catch {}

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

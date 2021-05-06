// @ts-check
import _cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import fetch from 'node-fetch';
import { ASSETS_ROOT_PATH, RELATIVE_ASSETS_PATH } from './constants.js';
import { gifMarkup, optimizeGif } from './gif-module.js';

const { access, mkdir, readdir, readFile, writeFile } = fs.promises;

dotenv.config({
  path: '../.env',
});

const cloudinary = _cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

/**
 * Optimize the image and create its different versions
 * Assuming the image is media folder in assets
 * @param {string} src
 */
export async function optimizeBlogImages(src, returnMarkup = true) {
  // Start measuring
  console.log('Starting to retrieve/create image/data');

  // First off, don't optimize this image and save us some CPU time if it
  // already exists
  // First get the filename
  const [filePath, baseFolder] = src.split('/').reverse();
  const [fileName] = filePath.split('.');

  const [format] = filePath.split('.').reverse();
  const folderPath = `${ASSETS_ROOT_PATH}/${baseFolder}/${fileName}`;

  // The list of file paths to return
  const list = {
    large: {
      org: `${RELATIVE_ASSETS_PATH}/${baseFolder}/${fileName}/large.${format}`,
    },
    small: {
      org: `${RELATIVE_ASSETS_PATH}/${baseFolder}/${fileName}/small.${format}`,
    },
    aspectHTW: 1,
  };

  let shouldOptimize = true;

  // Check if this folder exists
  try {
    await access(folderPath);
    shouldOptimize = false;

    if (!shouldOptimize && (await readdir(folderPath)).includes('data.json') && format !== 'gif') {
      // The data file exists. Get the aspect ratio from there
      const { aspectHTW } = JSON.parse(await readFile(`${folderPath}/data.json`, 'utf-8'));

      list.aspectHTW = aspectHTW;
    }
  } catch (e) {}

  // The markup

  // Should not optimize, if not gif
  if (!shouldOptimize && format !== 'gif') {
    // Log the time
    console.log(`Finished.`);
    console.log();
    return returnMarkup ? markup(list, format) : list;
  }

  // Optimize if GIF
  if (format === 'gif') {
    // Do the gif-specific optimizations and return early
    console.log('GIF detected!');

    if (shouldOptimize) await optimizeGif(fileName);

    return gifMarkup(fileName);
  }

  // The image is optimizable. That means work, boys!
  // Let's try make the folder
  try {
    await mkdir(`${ASSETS_ROOT_PATH}/${baseFolder}/${fileName}`);
  } catch (e) {}

  const bigOriginalP = cloudinary.uploader.upload(`${folderPath}.${format}`, {
    format,
    folder: 'media',
    transformation: [
      {
        quality: 80,
        width: 1200,
        crop: 'scale',
      },
    ],
    use_filename: true,
    overwrite: true,
  });

  const smallOriginalP = cloudinary.uploader.upload(`${folderPath}.${format}`, {
    format,
    folder: 'media',
    transformation: [
      {
        quality: 80,

        width: 600,
        crop: 'scale',
      },
    ],
    use_filename: true,
    overwrite: true,
  });

  const [bigOriginal, smallOriginal] = await Promise.all([bigOriginalP, smallOriginalP]);

  const bigOriginalBufferP = fetch(bigOriginal.url).then((res) => res.buffer());
  const smallOriginalBufferP = fetch(smallOriginal.url).then((res) => res.buffer());

  const [bigOriginalBuffer, smallOriginalBuffer] = await Promise.all([
    bigOriginalBufferP,
    smallOriginalBufferP,
  ]);

  // get aspect ratio
  list.aspectHTW = bigOriginal.height / bigOriginal.width;

  // Write inside the folder
  await writeFile(`${folderPath}/large.${format}`, bigOriginalBuffer);
  await writeFile(`${folderPath}/small.${format}`, smallOriginalBuffer);

  // Also write the data.json
  await writeFile(
    `${folderPath}/data.json`,
    JSON.stringify({
      aspectHTW: list.aspectHTW,
    })
  );

  // Log the time
  console.log(`Finished`);
  console.log();

  // Return the list
  return returnMarkup ? markup(list, format) : list;
}

try {
  optimizeBlogImages('../../static/media/deep-dive-preact-source--wait-what.gif', false);
} catch (e) {
  console.log(e);
}
function markup(list, format) {
  return `
  <figure style="width: 100%;padding-top: ${list.aspectHTW * 100}%;">
    <picture>
      <source
        type="image/${format}"
        media="(min-width: 501px)"
        data-srcset="${list.large.org}"
      ></source>
      <source
        type="image/${format}"
        media="(max-width: 500px)"
        data-srcset="${list.small.org}"
      ></source>
      <img alt="Placeholder"
      data-src="${list.large.org}"
      class="lazyload blog-img" />
    </picture>
  </figure>
  `;
}

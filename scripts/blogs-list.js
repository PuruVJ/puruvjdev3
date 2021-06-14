import { promises as fsp } from 'fs';
import { ASSETS_ROOT_PATH } from './constants.js';

/**
 * @param {Object} obj
 * @param {import('./scripts').BlogData[]} obj.blogData
 * @param {import('./scripts').Series} obj.seriesList
 */
export async function generateBlogsList({ blogData }) {
  console.log('--------- Generating blogs list -----------');

  const finalData = blogData.map(({ body, cover_image, ...data }) => data);

  // Write data
  await fsp.writeFile(`${ASSETS_ROOT_PATH}/data/blogs-list.json`, JSON.stringify(finalData));

  console.log('---------- Generated ------------');
}

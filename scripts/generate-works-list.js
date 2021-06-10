import { promises as fsp } from 'fs';
import yaml from 'yaml';
import { ASSETS_ROOT_PATH, SRC_FOLDER_PATH } from './constants.js';
import { optimizeBlogImages } from './optimize-images.js';

export async function generateWorksList() {
  const worksFilePath = await fsp.readFile(`${SRC_FOLDER_PATH}/works.yaml`, 'utf-8');

  /**
   * @type {import('./scripts.js').Work[]}
   */
  const works = yaml.parse(worksFilePath);

  const dataToCreate = [];

  for (let work of works) {
    const { image } = work;
    // @ts-ignore
    work.image = await optimizeBlogImages(`../static/works/${image}`, false);

    dataToCreate.push(work);
  }

  await fsp.writeFile(`${ASSETS_ROOT_PATH}/data/works.json`, JSON.stringify(dataToCreate));
}

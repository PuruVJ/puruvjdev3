// @ts-check
import { promises } from 'fs';
import yaml from 'yaml';
import { ASSETS_ROOT_PATH, SRC_FOLDER_PATH } from './constants.js';
import { optimizeBlogImages } from './optimize-images.js';

const { readFile, writeFile } = promises;

(async () => {
  const worksFilePath = await readFile(`${SRC_FOLDER_PATH}/works.yml`, 'utf-8');

  /**
   * @type {
   {
      title: string; 
      url: string; 
      stack: string; 
      description: string;
      image: unknown;
      repo: {
        url: string;
        type: string
      }
    }[]
  }
   */
  const works = yaml.parse(worksFilePath);

  const dataToCreate = [];

  for (let work of works) {
    const { image } = work;
    work.image = await optimizeBlogImages(`../static/works/${image}`, false);

    dataToCreate.push(work);
  }

  await writeFile(`${ASSETS_ROOT_PATH}/data/works.json`, JSON.stringify(dataToCreate));
})();

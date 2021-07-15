import { promises as fsp } from 'fs';
import yaml from 'yaml';
import { ASSETS_ROOT_PATH, SRC_FOLDER_PATH } from './constants';
import { optimizeBlogImages } from './optimize-images';
import type { ExportedImagesMetaData, Work } from './types';
import markdown from 'markdown-it';
import twemoji from 'twemoji';

const md = markdown({ html: true });

export async function generateWorksList() {
  const worksFilePath = await fsp.readFile(`${SRC_FOLDER_PATH}/works.yaml`, 'utf-8');

  const works: (Omit<Work, 'image'> & { image: string })[] = yaml.parse(worksFilePath);

  const dataToCreate: Work[] = [];

  for (let work of works) {
    const { image, description, title } = work;
    const img = (await optimizeBlogImages(
      `../../static/works-data/${image}`,
      `${title} photo`,
      false,
    )) as ExportedImagesMetaData;

    const parsedDescription = twemoji.parse(md.render(description), {
      ext: '.svg',
      folder: 'svg',
    });

    dataToCreate.push({ ...work, image: img, description: parsedDescription });
  }

  fsp.writeFile(`${ASSETS_ROOT_PATH}/data/works.json`, JSON.stringify(dataToCreate));
}

generateWorksList();

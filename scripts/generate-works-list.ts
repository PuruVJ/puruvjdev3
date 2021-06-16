import { promises as fsp } from 'fs';
import yaml from 'yaml';
import { ASSETS_ROOT_PATH, SRC_FOLDER_PATH } from './constants';
import { optimizeBlogImages } from './optimize-images';
import type { ExportedImagesMetaData, Work } from './types';

export async function generateWorksList() {
  const worksFilePath = await fsp.readFile(`${SRC_FOLDER_PATH}/works.yaml`, 'utf-8');

  const works: (Omit<Work, 'image'> & { image: string })[] = yaml.parse(worksFilePath);

  const dataToCreate: Work[] = [];

  for (let work of works) {
    const { image } = work;
    const img = (await optimizeBlogImages(
      `../static/works/${image}`,
      false,
    )) as ExportedImagesMetaData;

    dataToCreate.push({ ...work, image: img });
  }

  fsp.writeFile(`${ASSETS_ROOT_PATH}/data/works.json`, JSON.stringify(dataToCreate));
}

import { promises as fsp } from 'fs';
import { ASSETS_ROOT_PATH } from './constants';
import type { BlogData } from './types';

export async function generateBlogsList({ blogData }: { blogData: BlogData[] }) {
  console.log('--------- Generating blogs list -----------');

  const finalData = blogData.map(({ body, cover_image, ...data }) => data);

  // Write data
  fsp.writeFile(`${ASSETS_ROOT_PATH}/data/blogs-list.json`, JSON.stringify(finalData));

  console.log('---------- Generated ------------');
}

import { promises as fsp } from 'fs';
import { ASSETS_ROOT_PATH } from './constants.js';

/**
 * @param {Object} obj
 * @param {import('./scripts').BlogData[]} obj.blogData
 * @param {import('./scripts').Series} obj.seriesList
 */
export async function generateSitemap({ blogData }) {
  const render = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://puruvj.dev/</loc></url>
  <url><loc>https://puruvj.dev/blog</loc></url>
  <url><loc>https://puruvj.dev/works</loc></url>
  ${blogData.map(({ id }) => `  <url><loc>https://puruvj.dev/blog/${id}</loc></url>`).join('\n')}
</urlset>
  `;

  fsp.writeFile(`${ASSETS_ROOT_PATH}/sitemap.xml`, render);
}

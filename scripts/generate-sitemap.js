import { promises as fsp } from 'fs';
import glob from 'glob-promise';

(async function () {
  const files = await glob(
    '../__sapper__/export/**/index.html'
    // '!../__sapper__/export/{art,blog,client,css,data,icons,media,photos}'
  );

  const urls = files
    .map((file) => file.replace('../__sapper__/export/', '').replace('index.html', ''))
    .map((url) => `<url><loc>https://puruvj.dev/${url}</loc></url>`)
    .join('\n');

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  // Write the file
  await fsp.writeFile('../__sapper__/export/sitemap.xml', sitemapContent, 'utf-8');
})();

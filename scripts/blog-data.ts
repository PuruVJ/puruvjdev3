import fm, { FrontMatterResult } from 'front-matter';
import { promises as fsp } from 'fs';
import twemoji from 'twemoji';
import { BLOG_POSTS_MD_PATH, RELATIVE_ASSETS_PATH } from './constants';
import { BlogData, Series } from './types';

export async function getBlogData() {
  // get all blogs in directory
  const filesAbs = (await fsp.readdir(BLOG_POSTS_MD_PATH)).filter((file) => file.endsWith('.md'));
  const filePaths = filesAbs.map((absFile) => `${BLOG_POSTS_MD_PATH}/${absFile}`);

  const ids = filesAbs.map((fileAbs) => fileAbs.split('.')[0]);

  const finalData: BlogData[] = [];

  const frontMatterData: FrontMatterResult<any>[] = [];

  for (const filePath of filePaths) {
    const fileData = await fsp.readFile(filePath, 'utf-8');

    // Get the metadata inside the markdown
    frontMatterData.push(fm(fileData) as FrontMatterResult<any>);
  }

  let seriesList: Series = {};

  for (let [idx, fmData] of Object.entries(frontMatterData))
    seriesList = getSeries(seriesList, fmData.attributes, ids[+idx]);

  for (const [idx, { attributes: attrs, body }] of Object.entries(frontMatterData)) {
    const published = attrs.published ?? true;

    // Skip everything if not published
    if (!published) continue;

    // Reset the cover image if required
    attrs.cover_image = attrs.cover_image || `${RELATIVE_ASSETS_PATH}/media/blog-social-intro.png`;

    attrs.title = twemoji.parse(attrs.title, {
      ext: '.svg',
      folder: 'svg',
    });

    const series = attrs.series;

    let seriesIndex = 0;

    if (series) {
      let seriesPosts = seriesList[series].sort((a, b) => +a.date - +b.date);

      seriesIndex = seriesPosts.findIndex(({ id }) => id === ids[+idx]) + 1;
    }

    finalData.push({
      body,
      cover_image: attrs.cover_image,
      date: new Date(attrs.date),
      description: attrs.description,
      id: ids[+idx],
      title: attrs.title,
      seriesIndex,
      series,
    });
  }

  return { blogData: finalData.sort((a, b) => +b.date - +a.date), seriesList };
}

function getSeries(seriesList: Series, attributes: any, id: string) {
  let { date, title } = attributes;

  date = new Date(date);

  const series = attributes.series;

  if (!series) return seriesList;
  if (!(series in seriesList)) seriesList[series] = [];

  seriesList[series].push({ title, date: new Date(date), id });

  return seriesList;
}

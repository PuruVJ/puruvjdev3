import { promises as fsp } from 'fs';
import { JSDOM } from 'jsdom';
import markdown from 'markdown-it';
import readingTime from 'reading-time';
import { getHighlighter } from 'shiki';
import { getBlogData } from './blog-data';
import {
  generateTOC,
  headingsWithAnchorsPlugin,
  imageOptimMarkupPlugin,
  linkNoOpenerPlugin,
  seriesLinksPlugin,
  twemojiPlugin,
} from './blog-plugins/index';
import { ASSETS_ROOT_PATH } from './constants';
import { UnwrapPromise } from './types';

export async function blogMDHtml({
  blogData,
  seriesList,
}: UnwrapPromise<ReturnType<typeof getBlogData>>) {
  const highlighter = await getHighlighter({
    theme: 'material-theme-palenight',
  });

  const md = markdown({ html: true, highlight: highlighter.codeToHtml });

  console.log('<<<--------- Series found --------->>>');
  console.log(seriesList);
  console.log('\n');

  // Let's do it
  for (let { body, series, title, id, description, date, cover_image, seriesIndex } of blogData) {
    // Let's render it
    let html = md.render(body);

    // The dom representation
    let { document } = new JSDOM(html).window;

    document = linkNoOpenerPlugin(document);
    document = await imageOptimMarkupPlugin(document);
    document = headingsWithAnchorsPlugin(document);

    if (series) {
      /** @type {Array}*/
      let seriesPostsList = seriesList[series].sort((p1, p2) => +p1.date - +p2.date);

      document = seriesLinksPlugin(document, seriesPostsList, series, id);
    }

    document = twemojiPlugin(document);

    const toc = generateTOC(document);

    // Finally
    html = document.body.innerHTML;

    // Calculate reading time
    const reading_time = readingTime(html, { wordsPerMinute: 400 }).minutes;

    fsp.writeFile(
      `${ASSETS_ROOT_PATH}/data/blog/${id}.json`,
      JSON.stringify({
        cover_image,
        title,
        date,
        description,
        body: html,
        id,
        reading_time,
        toc,
        series,
        seriesIndex,
      }),
    );

    console.log('\n');
  }
}

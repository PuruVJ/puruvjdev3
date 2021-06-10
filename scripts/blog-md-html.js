import fm from 'front-matter';
import { promises as fsp } from 'fs';
import { JSDOM } from 'jsdom';
import markdown from 'markdown-it';
import readingTime from 'reading-time';
import { getHighlighter } from 'shiki';
import twemoji from 'twemoji';
import { generateTOC } from './blog-plugins/generate-toc.js';
import { headingsWithAnchorsPlugin } from './blog-plugins/headings-anchor.js';
import { imageOptimMarkupPlugin } from './blog-plugins/image-optim-markup.js';
import { seriesLinksPlugin } from './blog-plugins/series-links.js';
import { convertToTwitterEmojisPlugin } from './blog-plugins/twitter-emojis.js';
import { ASSETS_ROOT_PATH, BLOG_POSTS_MD_PATH, RELATIVE_ASSETS_PATH } from './constants.js';

(async () => {
  // Shiki instance
  const highlighter = await getHighlighter({
    theme: JSON.parse(await fsp.readFile('./theme.json', 'utf-8')),
  });

  // Prepare md for shiki
  const md = markdown({ html: true, highlight: highlighter.codeToHtml });

  // Parse the links in a different way
  // Remember old renderer, if overridden, or proxy to default renderer
  const defaultRender =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
      // @ts-ignore
      tokens[idx].attrs[aIndex][1] = '_blank'; // replace value of existing attr
    }

    // Add no-opener
    tokens[idx].attrPush(['rel', 'noopener']);
    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    console.log(tokens[idx].attrGet('alt'));

    tokens[idx].attrPush(['class', 'feature-image']);
    return defaultRender(tokens, idx, options, env, self);
  };

  // get all blogs in directory
  const filesAbs = (await fsp.readdir(BLOG_POSTS_MD_PATH)).filter((file) => file.endsWith('.md'));

  const files = filesAbs.map((absFile) => `${BLOG_POSTS_MD_PATH}/${absFile}`);

  // Define the series object here to collect all the series
  const seriesList = {};

  console.log('\n');

  console.log('<<<--------- Finding series --------->>>');

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const fileName = filesAbs[i].split('.')[0];

    // Let's get the contents of the file
    const fileData = await fsp.readFile(filePath, 'utf-8');

    // Get the metadata inside the markdown
    const { attributes } = fm(fileData);

    let { date, title } = attributes;

    date = new Date(date);

    const series = attributes.series;

    if (series) {
      if (!(series in seriesList)) {
        seriesList[series] = [];
      }

      seriesList[series].push({ title, date, id: fileName });
    }
  }

  console.log(seriesList);

  console.log('<<<--------- Series found --------->>>');
  console.log('\n');

  // Let's do it
  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const fileName = filesAbs[i].split('.')[0];

    console.log(filePath);

    // Let's get the contents of the file
    const fileData = await fsp.readFile(filePath, 'utf-8');

    // Get the metadata inside the markdown
    const { attributes, body } = fm(fileData);

    const published = attributes.published == null ? true : attributes.published;

    // Skip everything if not published
    if (!published) continue;

    // Reset the cover image if required
    attributes.cover_image =
      attributes.cover_image || `${RELATIVE_ASSETS_PATH}/media/blog-social-intro.png`;

    // Get the series
    const series = attributes.series;

    // Let's render it
    let html = md.render(body);

    // The dom representation
    let { document } = new JSDOM(html).window;

    // Now get the TOC
    const toc = generateTOC(document);

    // Images
    ({ document } = await imageOptimMarkupPlugin(document));

    // Now work on the headings
    ({ document } = await headingsWithAnchorsPlugin(document, fileName));

    if (series) {
      /** @type {Array}*/
      let seriesPostsList = seriesList[series].sort((p1, p2) => p1.date - p2.date);

      ({ document } = await seriesLinksPlugin(document, seriesPostsList, series, fileName));

      attributes.title = `${attributes.title}`;
    }

    // Emojis
    ({ document } = await convertToTwitterEmojisPlugin(document));

    // Finally
    html = document.body.innerHTML;

    // Calculate reading time
    const reading_time = readingTime(html, { wordsPerMinute: 400 }).minutes;

    attributes.title = twemoji.parse(attributes.title, {
      ext: '.svg',
      folder: 'svg',
    });

    await fsp.writeFile(
      `${ASSETS_ROOT_PATH}/blog/${fileName}.json`,
      JSON.stringify({
        ...attributes,
        body: html,
        id: fileName,
        reading_time,
        toc,
      })
    );

    console.log('\n');
  }
})();

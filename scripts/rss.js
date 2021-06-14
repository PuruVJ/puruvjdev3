import { getBlogData } from './blog-data.js';
import { promises as fsp } from 'fs';

/**
 * @param {Object} param0
 * @param {import('./scripts.js').BlogData[]} param0.blogData
 */
export async function rss({ blogData }) {
  /** @param {string} title */
  const sanitizeTitle = (title) =>
    title.replace(/<img.*?alt="(.*?)"[^\>]+>/g, '$1').replace('&', '&amp;');

  const render = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
  <channel>
    <title>Puru's Blog</title>
    <link>https://puruvj.dev</link>
    <description>Blog posts on Puru's Blog</description>
    <image>
      <url>https://puruvj.dev/icons/logo-512.png</url>
      <title>Puru's Blog</title>
      <link>https://puruvj.dev</link>
    </image>
    ${blogData
      .map(
        ({ title, id, description, date }) => `
          <item>
            <title>${sanitizeTitle(title)} // Puru Vijay</title>
            <link>https://puruvj.dev/blog/${id}</link>
            <description>${description}</description>
            <pubDate>${date.toUTCString()}</pubDate>
          </item>
        `,
      )
      .join('\n')}
  </channel>
  </rss>`;

  // Now write it out to the directory
  await fsp.writeFile('../build/rss.xml', render);
}

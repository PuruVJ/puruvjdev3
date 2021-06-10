import twemoji from 'twemoji';

/**
 * Converts regular emojis to twitter emojis
 * @param {Document} document
 */
export async function convertToTwitterEmojisPlugin(document) {
  document.documentElement.innerHTML = twemoji.parse(document.documentElement.innerHTML, {
    ext: '.svg',
    folder: 'svg',
  });

  return { document };
}

import twemoji from 'twemoji';

/**
 * Converts regular emojis to twitter emojis
 * @param {Document} document
 */
export function twemojiPlugin(document) {
  document.documentElement.innerHTML = twemoji.parse(document.documentElement.innerHTML, {
    ext: '.svg',
    folder: 'svg',
  });

  return document;
}

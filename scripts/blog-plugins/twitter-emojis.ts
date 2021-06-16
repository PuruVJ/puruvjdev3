import twemoji from 'twemoji';

/**
 * Converts regular emojis to twitter emojis
 */
export function twemojiPlugin(document: Document) {
  document.documentElement.innerHTML = twemoji.parse(document.documentElement.innerHTML, {
    ext: '.svg',
    folder: 'svg',
  });

  return document;
}

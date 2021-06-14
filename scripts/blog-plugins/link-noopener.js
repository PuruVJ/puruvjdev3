/**
 * @param {Document} document
 */
export function linkNoOpenerPlugin(document) {
  const anchors = document.querySelectorAll('a');

  for (const anchor of anchors) {
    anchor.target = '_blank';
    anchor.rel = 'noopener';
  }

  return document;
}

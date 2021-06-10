import { RELATIVE_ASSETS_PATH } from './constants.js';

/**
 * @param {import('./scripts.js').ExportedImagesMetaData} list
 * @param {string} format
 */
export function imageMarkup(list, format) {
  return `
  <figure style="width: 100%;--padding-top: ${list.aspectHTW * 100}%;">
    <picture>
      <source
        type="image/${format}"
        media="(min-width: 501px)"
        data-srcset="${list.large.org}"
      ></source>
      <source
        type="image/${format}"
        media="(max-width: 500px)"
        data-srcset="${list.small.org}"
      ></source>
      <img alt="Placeholder"
      data-src="${list.large.org}"
      class="lazyload blog-img" />
    </picture>
  </figure>
  `;
}

/**
 * @param {string} fileName
 */
export function gifMarkup(fileName) {
  const baseForMarkup = `${RELATIVE_ASSETS_PATH}/media/${fileName}`;

  return `
  <div class="gif-vid-container">
    <video autoplay loop muted playsinline>
      <source src="${baseForMarkup}/vidgif.mp4" type="video/mp4">
      Your browser doesn't support HTML5 video playback. <a href="${baseForMarkup}.gif" target="_blank" rel="noopener">See the gif here</a>
    </video>
  </div>
  `;
}

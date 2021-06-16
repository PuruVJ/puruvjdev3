import { optimizeBlogImages } from '../optimize-images';

/**
 * Optimizes images and returns the markup
 */
export async function imageOptimMarkupPlugin(document: Document) {
  // Get all the image tags
  const imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');

  for (let img of imgs) {
    // Lets collect values of `src`
    const src = img.src;

    // Let's make this image useless
    img.src = '';
    img.style.display = 'none';

    console.log(src);

    // Now lets put the picture tag in there
    const divContainer = document.createElement('div');
    divContainer.classList.add('picture-container');

    // Let's add the main stuff to this picture
    // @ts-ignore
    divContainer.innerHTML = await optimizeBlogImages(src);

    // Put it after the img
    img.after(divContainer);
  }

  return document;
}

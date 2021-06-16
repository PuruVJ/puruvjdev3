import slugify from 'slugify';
import { htmlToText } from 'html-to-text';

/**
 * Adds the hash links to the headings
 */
export function headingsWithAnchorsPlugin(document: Document) {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  for (let heading of headings) {
    const headingVal = heading.innerHTML;
    const slug = slugify(htmlToText(headingVal));

    heading.innerHTML = `<a class="heading-link" href="#${slug}">#</a>${headingVal}`;
    heading.id = slug;
  }

  return document;
}

import { htmlToText } from 'html-to-text';

type TOC = {
  indent: number;
  id: string;
  title: string;
  length: number;
};

export function generateTOC(document: Document) {
  // Find out only the h1, h2, h3

  /** @type {HTMLHeadingElement[]} */
  // @ts-ignore
  const headingEls: HTMLHeadingElement[] = [...document.querySelectorAll('h1, h2, h3')];

  const TOCdata: TOC[] = [];

  for (let heading of headingEls) {
    const indent = heading.tagName === 'H1' ? 0 : heading.tagName === 'H2' ? 1 : 2;
    const id = heading.id;
    const title = htmlToText(heading.innerHTML);
    const length = title.length;

    TOCdata.push({ indent, id, title, length });
  }

  return TOCdata;
}

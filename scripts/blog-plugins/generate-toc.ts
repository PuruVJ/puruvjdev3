import { htmlToText } from 'html-to-text';
import twemoji from 'twemoji';

type TOC = {
  indent: number;
  id: string;
  title: string;
  length: number;
};

export function generateTOCPlugin(document: Document) {
  // Find out only the h1, h2, h3
  const headingEls = [...document.querySelectorAll<HTMLHeadingElement>('h1, h2, h3')];

  const TOCdata: TOC[] = [];

  for (let heading of headingEls) {
    const indent = heading.tagName === 'H1' ? 0 : heading.tagName === 'H2' ? 1 : 2;
    const id = heading.id;
    const title = htmlToText(heading.innerHTML).replace('#', '');
    const length = title.length;

    TOCdata.push({
      indent,
      id,
      title: twemoji.parse(title, {
        ext: '.svg',
        folder: 'svg',
      }),
      length,
    });
  }

  return TOCdata;
}

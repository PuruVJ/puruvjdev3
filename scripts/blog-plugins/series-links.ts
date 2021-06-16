/**
 * Find <p>{{ series-links }}</p> and replaces them with relevant markup
 */
export function seriesLinksPlugin(
  document: Document,
  seriesPosts: { id: string; title: string; date: Date }[],
  seriesName: string,
  currentID: string,
) {
  // Find <p> with content {{ series-link }}
  // Find all <p>
  const paragraphs = document.querySelectorAll('p');
  let targetParagraphs: HTMLParagraphElement[] = [];

  for (let p of paragraphs) {
    if (p.innerHTML.includes('{{ series-links }}')) {
      targetParagraphs.push(p);
    }
  }

  for (let p of targetParagraphs) {
    // Create the blockquote
    const blockquote = document.createElement('blockquote');

    const links = seriesPosts
      .map(({ id, title }, i) =>
        id !== currentID
          ? `<a rel="noopener" target="_blank" href="/blog/${id}">Part ${i + 1} - ${title}</a><br>`
          : `<a> Part ${i + 1} - ${title} (You're reading it 😁)</a><br>`,
      )
      .join('');

    blockquote.innerHTML = `
      <p>${seriesName} series:</p>
      <p>
        ${links}
      </p>
    `;

    p.innerHTML = '';
    p.appendChild(blockquote);
    p.classList.add('series-links');
  }

  return document;
}

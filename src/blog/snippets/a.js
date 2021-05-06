/**
 * @param {import('./a').RenamedType} a
 * @param {import('./a').RenamedType} b
 * @returns
 */
function sum(a, b) {
  return a + b;
}

h('div', { class: 'haha' }, h('span', { key: 34 }, h('h1', {}, h('span', {}, 'Whoa'))));

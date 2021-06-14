import { rss } from './rss.js';

function main() {
  Promise.all([rss()]);
}

try {
  main();
} catch (e) {
  console.log(e);
}

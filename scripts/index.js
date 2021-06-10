import { blogMDHtml } from './blog-md-html.js';
import { generateBlogsList } from './blogs-list.js';
import { generateWorksList } from './generate-works-list.js';
import { getPopularBlogPosts } from './get-popular-blogs.js';

async function main() {
  Promise.all([generateWorksList(), generateBlogsList(), getPopularBlogPosts(), blogMDHtml()]);
}

try {
  main();
} catch (e) {
  console.log(e);
}

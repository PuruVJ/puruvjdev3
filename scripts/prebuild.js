import { getBlogData } from './blog-data.js';
import { blogMDHtml } from './blog-md-html.js';
import { generateBlogsList } from './blogs-list.js';
import { generateWorksList } from './generate-works-list.js';
import { getPopularBlogPosts } from './get-popular-blogs.js';

async function main() {
  const data = await getBlogData();

  Promise.all([
    generateWorksList(),
    getPopularBlogPosts(),
    generateBlogsList(data),
    blogMDHtml(data),
  ]);
}

try {
  main();
} catch (e) {
  console.log(e);
}

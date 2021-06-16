import { getBlogData } from './blog-data';
import { blogMDHtml } from './blog-md-html';
import { generateBlogsList } from './blogs-list';
import { generateSitemap } from './generate-sitemap';
import { generateWorksList } from './generate-works-list';
import { getPopularBlogPosts } from './get-popular-blogs';
import { rss } from './rss';

async function main() {
  const data = await getBlogData();

  Promise.all([
    generateWorksList(),
    getPopularBlogPosts(data),
    generateBlogsList(data),
    blogMDHtml(data),
    rss(data),
    generateSitemap(data),
  ]);
}

try {
  main();
} catch (e) {
  console.log(e);
}

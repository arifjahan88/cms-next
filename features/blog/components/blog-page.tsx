import { loadPublicBlogPosts } from '@/lib/public-entities';
import { BlogListing } from '@/features/blog/components/blog-listing';

export async function BlogPage() {
  const posts = await loadPublicBlogPosts();
  return <BlogListing posts={posts} />;
}

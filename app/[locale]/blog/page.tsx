import { getBlogPosts, isContentfulConfigured } from "@/lib/contentful";
import { relatedArticlesData } from "./blogData";
import BlogListingClient, { UnifiedBlogPost } from "./BlogListingClient";

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

export default async function BlogListingPage() {
  let posts: UnifiedBlogPost[] = [];

  if (isContentfulConfigured) {
    const contentfulPosts = await getBlogPosts();
    if (contentfulPosts && contentfulPosts.length > 0) {
      posts = contentfulPosts.map((post: any) => {
        const fields = post.fields;
        return {
          slug: fields.slug,
          title: fields.title,
          excerpt: fields.excerpt,
          category: fields.category,
          date: fields.date ? fields.date.split("T")[0] : "",
          readTime: fields.readTime,
          thumbnail: fields.coverImage?.fields?.file?.url 
            ? `https:${fields.coverImage.fields.file.url}` 
            : "/placeholder.jpg",
          tags: (Array.isArray(fields.tags) 
            ? fields.tags 
            : (typeof fields.tags === "string" ? [fields.tags] : []))
            .flatMap((tag: string) => tag.split(",").map((t: string) => t.trim())),
          isContentful: true,
        };
      });
    }
  }

  // Fallback to static translation-based data if Contentful has no entries
  if (posts.length === 0) {
    posts = relatedArticlesData.map((post) => ({
      slug: post.slug,
      title: post.titleKey,
      excerpt: post.excerptKey,
      category: post.categoryKey,
      date: post.date,
      readTime: post.readTime,
      thumbnail: post.thumbnail,
      tags: post.tags,
      isContentful: false,
    }));
  }

  return <BlogListingClient posts={posts} />;
}

import { blogArticles } from "../blogData";
import { getBlogPostBySlug, isContentfulConfigured } from "../../../lib/contentful";
import BlogArticleClient from "./BlogArticleClient";

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

export async function generateStaticParams() {
    // Generate static params for static fallback routes
    return Object.keys(blogArticles).map((slug) => ({ id: slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    let initialPost = null;
    if (isContentfulConfigured) {
        initialPost = await getBlogPostBySlug(id);
    }
    
    return <BlogArticleClient slug={id} initialPost={initialPost} />;
}

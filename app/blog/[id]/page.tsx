import { blogArticles } from "../blogData";
import BlogArticleClient from "./BlogArticleClient";

export function generateStaticParams() {
    return Object.keys(blogArticles).map((slug) => ({ id: slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <BlogArticleClient slug={id} />;
}

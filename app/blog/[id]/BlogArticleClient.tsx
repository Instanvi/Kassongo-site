"use client";

import { useState } from "react";
import {
    ArrowRight,
    Clock,
    Calendar,
    Tag,
    Lightbulb,
    CheckCircle,
    AlertTriangle,
    ChevronRight,
    Copy,
    Check,
    Printer,
    Mail,
    Bookmark,
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Button } from "../../../components/Button";
import { useTranslation } from "../../../lib/i18n/LanguageContext";
import { blogArticles, relatedArticlesData } from "../blogData";

export default function BlogArticleClient({ slug }: { slug: string }) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const article = blogArticles[slug];

    if (!article) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Header />
                <main className="flex-1 pt-32 pb-20 px-6 text-center">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                        {t("blog.article.notFound.title")}
                    </h1>
                    <p className="text-gray-600 mb-8">
                        {t("blog.article.notFound.desc")}
                    </p>
                    <Button variant="primary" href="/blog">
                        {t("blog.article.notFound.title")}
                    </Button>
                </main>
                <Footer />
            </div>
        );
    }

    const related = relatedArticlesData.filter((p) => article.relatedSlugs.includes(p.slug));

    const handleCopyLink = () => {
        navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderContentBlock = (block: any, index: number) => {
        switch (block.type) {
            case "h2":
                return (
                    <h2 key={index} className="text-2xl md:text-3xl font-display font-bold text-gray-900 mt-12 mb-5">
                        {t(block.key) || block.key}
                    </h2>
                );
            case "h3":
                return (
                    <h3 key={index} className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {t(block.key) || block.key}
                    </h3>
                );
            case "p":
                return (
                    <p key={index} className="text-base text-gray-700 leading-relaxed mb-5">
                        {t(block.key) || block.key}
                    </p>
                );
            case "ul":
                return (
                    <ul key={index} className="space-y-3 mb-6 ml-1">
                        {block.items?.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-base text-gray-700 leading-relaxed">{t(item) || item}</span>
                            </li>
                        ))}
                    </ul>
                );
            case "ol":
                return (
                    <ol key={index} className="space-y-4 mb-6 ml-1">
                        {block.items?.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-7 h-7 bg-green-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {i + 1}
                                </span>
                                <span className="text-base text-gray-700 leading-relaxed pt-0.5">{t(item) || item}</span>
                            </li>
                        ))}
                    </ol>
                );
            case "tip":
                return (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">{t("blog.article.proTip")}</span>
                            <p className="text-sm text-gray-700 leading-relaxed mt-1">{t(block.key) || block.key}</p>
                        </div>
                    </div>
                );
            case "warning":
                return (
                    <div key={index} className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">{t("blog.article.warning")}</span>
                            <p className="text-sm text-gray-700 leading-relaxed mt-1">{t(block.key) || block.key}</p>
                        </div>
                    </div>
                );
            case "checklist":
                return (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                        <ul className="space-y-3">
                            {block.items?.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-700 leading-relaxed">{t(item) || item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "cta":
                return (
                    <div key={index} className="bg-green-900 rounded-2xl p-8 mb-8 text-center">
                        <p className="text-white text-lg font-bold mb-4">{t(block.key) || block.key}</p>
                        <Button variant="secondary" size="lg" href="/contact" className="shadow-soft-lg">
                            <ArrowRight className="w-5 h-5" />
                            {t("blog.article.ctaButton")}
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
            <Header />

            <main className="flex-1 pt-16">
                <article>
                    {/* Breadcrumb */}
                    <div className="bg-gray-50 border-b border-gray-200 py-3 px-6">
                        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-gray-500">
                            <a href="/" className="hover:text-green-600 transition-colors">Home</a>
                            <ChevronRight className="w-3 h-3" />
                            <a href="/blog" className="hover:text-green-600 transition-colors">Blog</a>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-gray-900 font-medium truncate">{article.titleKey}</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative h-64 md:h-96 lg:h-[28rem] bg-gradient-to-br from-green-900 to-green-800 overflow-hidden">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <img
                            src={article.image}
                            alt={article.imageAltKey}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-end">
                            <div className="max-w-4xl mx-auto px-6 pb-8 md:pb-12 w-full">
                                <span className="inline-flex items-center gap-1 bg-yellow-400 text-green-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                                    <Tag className="w-3 h-3" />
                                    {t(article.categoryKey)}
                                </span>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white leading-tight tracking-tight max-w-3xl">
                                    {t(article.titleKey) || article.titleKey}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Meta Bar */}
                    <div className="border-b border-gray-200 py-4 px-6">
                        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center text-white text-xs font-black">
                                        {article.authorKey.charAt(0)}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900 text-xs">{article.authorKey}</span>
                                        <p className="text-[10px] text-gray-500">{article.authorBioKey}</p>
                                    </div>
                                </div>
                                <span className="text-gray-300">|</span>
                                <span className="flex items-center gap-1 text-xs">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {article.date}
                                </span>
                                <span className="flex items-center gap-1 text-xs">
                                    <Clock className="w-3.5 h-3.5" />
                                    {article.readTime}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyLink}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setBookmarked(!bookmarked)}
                                    className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${bookmarked ? "text-green-600" : "text-gray-500"}`}
                                >
                                    <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                                >
                                    <Printer className="w-4 h-4" />
                                </button>
                                <a
                                    href={`mailto:?subject=${encodeURIComponent(article.titleKey)}`}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                                >
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="py-12 px-6">
                        <div className="max-w-4xl mx-auto">
                            <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium border-l-4 border-green-600 pl-6">
                                {t(article.excerptKey) || article.excerptKey}
                            </p>

                            <div className="prose prose-lg max-w-none">
                                {article.content.map((block, index) => renderContentBlock(block, index))}
                            </div>

                            {/* Tags */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-bold uppercase text-gray-500 tracking-wide">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag) => (
                                        <a
                                            key={tag}
                                            href={`/blog?tag=${tag}`}
                                            className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                                        >
                                            #{t(tag) || tag}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                {related.length > 0 && (
                    <section className="py-16 px-6 md:px-12 bg-gray-50 border-t border-gray-200">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {related.map((post) => (
                                    <a
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group bg-white rounded-2xl border border-gray-200 shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col"
                                    >
                                        <div className="h-40 bg-gradient-to-br from-gray-100 to-green-50 flex items-center justify-center relative overflow-hidden">
                                            <img src={post.heroImage} alt={post.titleKey} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[10px] font-bold uppercase text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                                                    {t(post.categoryKey)}
                                                </span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 flex-1">
                                                {t(post.titleKey) || post.titleKey}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                                <span className="text-[10px] text-gray-400">{post.date}</span>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}

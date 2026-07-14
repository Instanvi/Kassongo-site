"use client";

import { useState } from "react";
import { Clock, Calendar, Tag, Search, Filter, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/Button";
import { useTranslation } from "../../lib/i18n/LanguageContext";
import { relatedArticlesData } from "./blogData";

const categories = ["all", "guides", "routes", "customs", "tips", "industry"];

export default function BlogListingPage() {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = relatedArticlesData.filter((post) => {
        const matchesCategory = selectedCategory === "all" || t(post.categoryKey) === selectedCategory;
        const matchesSearch =
            searchQuery === "" ||
            t(post.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
            t(post.excerptKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some((tag) => t(tag).toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
            <Header />

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="relative py-20 px-6 md:px-12 bg-gradient-to-br from-green-900 to-green-800 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/world-map-hubs.svg')] opacity-5"></div>
                    <div className="relative max-w-6xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 leading-tight tracking-tight">
                            {t("blog.hero.title")}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                            {t("blog.hero.subtitle")}
                        </p>
                    </div>
                </section>

                {/* Search and Filter Bar */}
                <section className="sticky top-16 z-30 bg-white border-b border-gray-200 py-4 px-6 md:px-12 shadow-sm">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t("blog.search.placeholder")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all ${
                                        selectedCategory === cat
                                            ? "bg-green-900 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-16 px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {t("blog.noResults.title")}
                                </h3>
                                <p className="text-gray-600 mb-6">Try adjusting your search or filter</p>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("all");
                                    }}
                                >
                                    {t("blog.noResults.button")}
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post) => (
                                    <article
                                        key={post.slug}
                                        className="group bg-white rounded-2xl border border-gray-200 shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col"
                                    >
                                        {/* Thumbnail */}
                                        <a
                                            href={`/blog/${post.slug}`}
                                            className="block h-48 bg-gradient-to-br from-gray-100 to-green-50 relative overflow-hidden"
                                        >
                                            <img
                                                src={post.thumbnail}
                                                alt={post.titleKey}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </a>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            {/* Meta */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="inline-flex items-center gap-1 bg-yellow-400 text-green-900 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                                                    <Tag className="w-3 h-3" />
                                                    {t(post.categoryKey)}
                                                </span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <a href={`/blog/${post.slug}`}>
                                                <h2 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 mb-3">
                                                    {t(post.titleKey) || post.titleKey}
                                                </h2>
                                            </a>

                                            {/* Excerpt */}
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                                                {t(post.excerptKey) || post.excerptKey}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {post.date}
                                                </span>
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1 group/link"
                                                >
                                                    Read More
                                                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

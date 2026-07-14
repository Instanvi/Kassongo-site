"use client";

import { useState } from "react";
import {
    Globe,
    Truck,
    Shield,
    Users,
    Target,
    Zap,
    Award,
    MapPin,
    TrendingUp,
    HeartHandshake,
    ChevronDown,
    ChevronUp,
    Package,
    Warehouse,
    Plane,
    Send,
    Clock,
    CheckCircle,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { useTranslation } from "../../lib/i18n/LanguageContext";

interface ValueItem {
    icon: React.ReactNode;
    titleKey: string;
    descKey: string;
}

interface Milestone {
    year: string;
    titleKey: string;
    descKey: string;
}

interface TeamMember {
    name: string;
    roleKey: string;
    image: string;
}

interface FAQItem {
    key: string;
    questionKey: string;
    answerKey: string;
}

export default function AboutPage() {
    const { t } = useTranslation();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">("mission");

    const values: ValueItem[] = [
        {
            icon: <Shield className="w-8 h-8 text-yellow-400" />,
            titleKey: "about.values.trust.title",
            descKey: "about.values.trust.desc",
        },
        {
            icon: <Zap className="w-8 h-8 text-yellow-400" />,
            titleKey: "about.values.speed.title",
            descKey: "about.values.speed.desc",
        },
        {
            icon: <HeartHandshake className="w-8 h-8 text-yellow-400" />,
            titleKey: "about.values.transparency.title",
            descKey: "about.values.transparency.desc",
        },
        {
            icon: <Globe className="w-8 h-8 text-yellow-400" />,
            titleKey: "about.values.access.title",
            descKey: "about.values.access.desc",
        },
    ];

    const team: TeamMember[] = [
        { name: "Amahnui ST James", roleKey: "about.team.roles.ceo", image: "/team-1.jpg" },
    ];

    const faqs: FAQItem[] = [
        { key: "a1", questionKey: "about.faq.a1.q", answerKey: "about.faq.a1.a" },
        { key: "a2", questionKey: "about.faq.a2.q", answerKey: "about.faq.a2.a" },
        { key: "a3", questionKey: "about.faq.a3.q", answerKey: "about.faq.a3.a" },
        { key: "a4", questionKey: "about.faq.a4.q", answerKey: "about.faq.a4.a" },
        { key: "a5", questionKey: "about.faq.a5.q", answerKey: "about.faq.a5.a" },
    ];

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
            <Header />

            <main className="flex-1 pt-16">
                {/* 1. Hero Section */}
                <section className="relative bg-white py-16 md:py-24 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/5 to-transparent"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Left Content */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-soft">
                                    <Globe className="w-3 h-3 text-yellow-400" />
                                    <span>{t("about.hero.badge")}</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tight text-gray-900">
                                    {t("about.hero.title1")}
                                    <br />
                                    <span className="text-green-800">{t("about.hero.title2")}</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                                    {t("about.hero.subtitle")}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        href="/contact"
                                        className="shadow-soft-lg hover:shadow-soft-xl transition-all"
                                    >
                                        <HeartHandshake className="w-5 h-5" />
                                        {t("about.hero.btnContact")}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        href="#team"
                                        className="shadow-soft hover:shadow-soft-md transition-all"
                                    >
                                        <Users className="w-5 h-5" />
                                        {t("about.hero.btnTeam")}
                                    </Button>
                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="relative">
                                <div className="relative overflow-hidden opacity-90">
                                    <img
                                        src="/about-hero.png"
                                        alt={t("about.hero.imageAlt")}
                                        className="w-full h-auto object-cover"
                                        style={{
                                            maskImage: "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 100%)",
                                            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 100%)",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Stats Bar */}
                <section className="bg-green-900 py-12 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-display font-black text-yellow-400 mb-1">
                                    60+
                                </div>
                                <div className="text-xs font-bold uppercase text-white/70 tracking-wide">
                                    {t("about.stats.hubs")}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-display font-black text-yellow-400 mb-1">
                                    1M+
                                </div>
                                <div className="text-xs font-bold uppercase text-white/70 tracking-wide">
                                    {t("about.stats.members")}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-display font-black text-yellow-400 mb-1">
                                    21+
                                </div>
                                <div className="text-xs font-bold uppercase text-white/70 tracking-wide">
                                    {t("about.stats.carriers")}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-display font-black text-yellow-400 mb-1">
                                    150+
                                </div>
                                <div className="text-xs font-bold uppercase text-white/70 tracking-wide">
                                    {t("about.stats.countries")}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Values */}
                <section className="py-20 px-6 md:px-12 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="min-h-[300px]">
                                <div className="space-y-8">
                                    <div className="text-center max-w-2xl mx-auto">
                                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                                            {t("about.values.title")}
                                        </h2>
                                        <p className="text-base text-gray-600">
                                            {t("about.values.subtitle")}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {values.map((value, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card hover:shadow-card-hover transition-all text-center"
                                            >
                                                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                                                    {value.icon}
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                                    {t(value.titleKey)}
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {t(value.descKey)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                        </div>
                    </div>
                </section>

                {/* 4. How We Operate — 3-Step Process */}
                <section className="py-20 px-6 md:px-12 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
                                {t("about.operate.title")}
                            </h2>
                            <p className="text-base text-gray-600 max-w-2xl mx-auto">
                                {t("about.operate.subtitle")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Step 1 */}
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-card hover:shadow-card-hover transition-all text-center">
                                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
                                    <Package className="w-8 h-8 text-yellow-400" />
                                </div>
                                <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t("about.operate.step1.title")}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {t("about.operate.step1.desc")}
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-card hover:shadow-card-hover transition-all text-center">
                                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
                                    <Warehouse className="w-8 h-8 text-yellow-400" />
                                </div>
                                <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t("about.operate.step2.title")}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {t("about.operate.step2.desc")}
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-card hover:shadow-card-hover transition-all text-center">
                                <div className="w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
                                    <Plane className="w-8 h-8 text-yellow-400" />
                                </div>
                                <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t("about.operate.step3.title")}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {t("about.operate.step3.desc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Global Presence / Hubs Map Section */}
                <section className="py-20 px-6 md:px-12 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
                                {t("about.hubs.title")}
                            </h2>
                            <p className="text-base text-gray-600 max-w-2xl mx-auto">
                                {t("about.hubs.subtitle")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Hub List */}
                            <div className="space-y-4">
                                {[
                                    { flag: "us", nameKey: "about.hubs.us.name", feats: ["about.hubs.us.feat1", "about.hubs.us.feat2"] },
                                    { flag: "gb", nameKey: "about.hubs.uk.name", feats: ["about.hubs.uk.feat1", "about.hubs.uk.feat2"] },
                                    { flag: "cn", nameKey: "about.hubs.china.name", feats: ["about.hubs.china.feat1", "about.hubs.china.feat2"] }
                                ].map((hub, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-2xl p-5 border border-gray-200 flex items-start gap-4 hover:shadow-soft-md transition-all"
                                    >
                                        <span
                                            className={`fi fi-${hub.flag}`}
                                            style={{
                                                width: "2.5rem",
                                                height: "1.875rem",
                                                borderRadius: "4px",
                                                display: "inline-block",
                                                backgroundSize: "cover",
                                                flexShrink: 0,
                                                marginTop: "2px",
                                            }}
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 mb-1">{t(hub.nameKey)}</h4>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                {hub.feats.map((feat, fi) => (
                                                    <span key={fi} className="text-xs text-gray-600 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3 text-green-600" />
                                                        {t(feat)}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Visual */}
                            <div className="relative">
                                <div className="flex items-center justify-center opacity-70">
                                    <img
                                        src="/world-map-hubs.svg"
                                        alt={t("about.hubs.mapAlt")}
                                        className="w-full max-w-md h-auto object-contain opacity-80"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Team Section */}
                <section id="team" className="py-20 px-6 md:px-12 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
                                {t("about.team.title")}
                            </h2>
                            <p className="text-base text-gray-600 max-w-2xl mx-auto">
                                {t("about.team.subtitle")}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            {team.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-card hover:shadow-card-hover transition-all group"
                                >
                                    <div className="aspect-square bg-gradient-to-br from-green-100 to-yellow-50 flex items-center justify-center overflow-hidden">
                                        <div className="w-24 h-24 bg-green-900 rounded-full flex items-center justify-center text-white text-2xl font-black">
                                            {member.name.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                    </div>
                                    <div className="p-5 text-center">
                                        <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                                        <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                                            {t(member.roleKey)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. Why Choose Us / Differentiators */}
                <section className="py-20 px-6 md:px-12 bg-green-900 text-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                                {t("about.why.title")}
                            </h2>
                            <p className="text-base text-gray-200 max-w-2xl mx-auto">
                                {t("about.why.subtitle")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: <Clock className="w-6 h-6" />, titleKey: "about.why.items.speed.title", descKey: "about.why.items.speed.desc" },
                                { icon: <Shield className="w-6 h-6" />, titleKey: "about.why.items.security.title", descKey: "about.why.items.security.desc" },
                                { icon: <Award className="w-6 h-6" />, titleKey: "about.why.items.price.title", descKey: "about.why.items.price.desc" },
                                { icon: <Globe className="w-6 h-6" />, titleKey: "about.why.items.coverage.title", descKey: "about.why.items.coverage.desc" },
                                { icon: <Truck className="w-6 h-6" />, titleKey: "about.why.items.tracking.title", descKey: "about.why.items.tracking.desc" },
                                { icon: <HeartHandshake className="w-6 h-6" />, titleKey: "about.why.items.support.title", descKey: "about.why.items.support.desc" },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-green-950/50 rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all"
                                >
                                    <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center mb-4 text-yellow-400">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{t(item.titleKey)}</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">{t(item.descKey)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. FAQ Accordion */}
                <section className="py-20 px-6 md:px-12 bg-gray-50">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                                {t("about.faq.title")}
                            </h2>
                            <p className="text-base text-gray-600">
                                {t("about.faq.subtitle")}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, index) => (
                                <div
                                    key={faq.key}
                                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-start justify-between gap-4 p-5 text-left"
                                    >
                                        <span className="font-semibold text-gray-900 flex-1">
                                            {t(faq.questionKey)}
                                        </span>
                                        <div className="flex-shrink-0">
                                            {openFaqIndex === index ? (
                                                <ChevronUp className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </button>
                                    {openFaqIndex === index && (
                                        <div className="px-5 pb-5 border-t border-gray-100">
                                            <p className="text-gray-700 leading-relaxed mt-4">
                                                {t(faq.answerKey)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 10. CTA Banner */}
                <section className="py-20 px-6 md:px-12 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                            {t("about.cta.title")}
                        </h2>
                        <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
                            {t("about.cta.subtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                variant="primary"
                                size="lg"
                                href="/contact"
                                className="shadow-soft-lg hover:shadow-soft-xl transition-all"
                            >
                                <Send className="w-5 h-5" />
                                {t("about.cta.btnContact")}
                            </Button>
                            <Button
                                variant="secondary"
                                size="lg"
                                href="/faq"
                                className="shadow-soft hover:shadow-soft-md transition-all"
                            >
                                {t("about.cta.btnFaq")}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
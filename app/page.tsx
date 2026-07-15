import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/home/sections/HeroSection";
import HowItWorksSection from "../components/home/sections/HowItWorksSection";
import SolutionsSection from "../components/home/sections/SolutionsSection";
import BusStationSection from "../components/home/sections/BusStationSection";
import PartnerMarquee from "../components/home/sections/PartnerMarquee";
import ServicesSection from "../components/home/sections/ServicesSection";
import BannerSection from "../components/home/sections/BannerSection";
import TrustStandardsSection from "../components/home/sections/TrustStandardsSection";
import MailboxSection from "../components/home/sections/MailboxSection";
import DownloadSection from "../components/home/sections/DownloadSection";
import SourcingPartnersSection from "../components/home/sections/SourcingPartnersSection";
import CountryFlagsSection from "../components/home/sections/CountryFlagsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-green-100 selection:text-gray-900">
      <Header />

      <main role="main" className="max-w-screen overflow-x-clip pt-16" id="main">
        <HeroSection />
        <HowItWorksSection />
        <SolutionsSection />
        <BusStationSection />
        <PartnerMarquee />
        <ServicesSection />
        <BannerSection />
        <TrustStandardsSection />
        <MailboxSection />
        <DownloadSection />
        <SourcingPartnersSection />
        <CountryFlagsSection />
      </main>

      <Footer />
    </div>
  );
}

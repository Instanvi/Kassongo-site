"use client";

import { useTranslation } from "../../../lib/i18n/LanguageContext";

const logos = [
  { src: "/Amazon_logo.svg.webp", alt: "Amazon", h: "30px" },
  { src: "/brandbird-alibaba-logotype.svg", alt: "Alibaba", h: "28px" },
  { src: "/EBay_logo.svg", alt: "eBay", h: "30px" },
  { src: "/aliexpress-logo-5a8f.webp", alt: "AliExpress", h: "100px" },
  { src: "/shein-1.svg", alt: "SHEIN", h: "24px" },
  { src: "/Walmart_logo_(2008).svg.webp", alt: "Walmart", h: "30px" },
  { src: "/1688.webp", alt: "1688", h: "32px" },
  { src: "/taobao-new-flat-design.svg", alt: "Taobao", h: "32px" },
  { src: "/Jumia-Logo-2012.webp", alt: "Jumia", h: "50px" },
  { src: "/Logo_swappa_footer.svg.webp", alt: "Swappa", h: "50px" },
  { src: "/Lazada.webp", alt: "Lazada", h: "30px" },
  { src: "/Etsy_logo.webp", alt: "Etsy", h: "28px" },
  { src: "/dhgate-seeklogo.svg", alt: "DHgate", h: "30px" },
  { src: "/shopee-seeklogo.svg", alt: "Shopee", h: "80px" },
  { src: "/Wayfair_ida2qwHiJY_0.svg", alt: "Wayfair", h: "28px" },
  { src: "/romwe-logo.svg", alt: "Romwe", h: "28px" },
  { src: "/Urban_Outfitters_idYjkRlX3I_0.svg", alt: "Urban Outfitters", h: "28px" },
  { src: "/Joom_id1r4PPRlw_1.svg", alt: "Joom", h: "50px" },
  { src: "/DPD_id9sTo-S4f_0.svg", alt: "DPD", h: "30px" },
  { src: "/Yodel_logo.webp", alt: "Yodel", h: "28px" },
  { src: "/Zalando-Logo.webp", alt: "Zalando", h: "28px" },
  { src: "/Asos.webp", alt: "Asos", h: "28px" },
  { src: "/Wish_logo.webp", alt: "Wish", h: "28px" },
  { src: "/Wiggle_Logo.webp", alt: "Wiggle", h: "80px" },
  { src: "/Gearbest-Emblem.png", alt: "Gearbest", h: "60px" },
  { src: "/United_Parcel_Service-Logo.wine.svg", alt: "UPS", h: "70px" },
  { src: "/DHL-Logo.wine.svg", alt: "DHL", h: "100px" },
  { src: "/FedEx_Express.webp", alt: "FedEx", h: "30px" },
  { src: "/USPS_-_Color_Logo.svg", alt: "USPS", h: "30px" },
  { src: "/geekbuying.png", alt: "Geekbuying", h: "80px" },
  { src: "/Valeo_Logo.webp", alt: "Valeo", h: "50px" },
  { src: "/H&M-Logo.wine.svg", alt: "H&M", h: "50px" },
  { src: "/Costco-Logo.wine.svg", alt: "Costco", h: "60px" },
];

export default function PartnerMarquee() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-6 border-y border-gray-100 overflow-hidden">
      <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-5">
        {t("home.partners.headline")}
      </p>
      <div className="animate-marquee">
        <div className="flex items-center gap-16 px-8">
          {[...Array(3)].map((_, si) => (
            <div key={si} className="flex items-center gap-16">
              {logos.map((logo) => (
                <div
                  key={`${si}-${logo.alt}`}
                  className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ height: logo.h, width: "auto" }}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

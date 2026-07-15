"use client";

import { useState, useEffect } from "react";

const allLogos = [
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
  { src: "/shopee-seeklogo.svg", alt: "Shopee", h: "40px" },
  { src: "/Wayfair_ida2qwHiJY_0.svg", alt: "Wayfair", h: "28px" },
  { src: "/romwe-logo.svg", alt: "Romwe", h: "28px" },
  { src: "/Urban_Outfitters_idYjkRlX3I_0.svg", alt: "Urban Outfitters", h: "28px" },
  { src: "/Joom_id1r4PPRlw_1.svg", alt: "Joom", h: "28px" },
  { src: "/DPD_id9sTo-S4f_0.svg", alt: "DPD", h: "30px" },
  { src: "/Yodel_logo.webp", alt: "Yodel", h: "28px" },
  { src: "/Zalando-Logo.webp", alt: "Zalando", h: "28px" },
  { src: "/Asos.webp", alt: "Asos", h: "28px" },
  { src: "/Wish_logo.webp", alt: "Wish", h: "28px" },
  { src: "/Wiggle_Logo.webp", alt: "Wiggle", h: "50px" },
  { src: "/Gearbest-Emblem.png", alt: "Gearbest", h: "50px" },
  { src: "/United_Parcel_Service-Logo.wine.svg", alt: "UPS", h: "50px" },
  { src: "/DHL-Logo.wine.svg", alt: "DHL", h: "50px" },
  { src: "/FedEx_Express.webp", alt: "FedEx", h: "28px" },
  { src: "/USPS_-_Color_Logo.svg", alt: "USPS", h: "30px" },
  { src: "/geekbuying.png", alt: "Geekbuying", h: "50px" },
  { src: "/Valeo_Logo.webp", alt: "Valeo", h: "28px" },
  { src: "/H&M-Logo.wine.svg", alt: "H&M", h: "30px" },
  { src: "/Costco-Logo.wine.svg", alt: "Costco", h: "50px" },
];

export default function AnimatedPartnerGrid() {
  const [visibleLogos, setVisibleLogos] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogos((current) => {
        const slotToChange = Math.floor(Math.random() * 10);
        let newLogoIndex;
        do {
          newLogoIndex = Math.floor(Math.random() * allLogos.length);
        } while (current.includes(newLogoIndex));
        const newVisible = [...current];
        newVisible[slotToChange] = newLogoIndex;
        return newVisible;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {visibleLogos.map((logoIndex, slotIndex) => {
        const logo = allLogos[logoIndex];
        return (
          <div
            key={`slot-${slotIndex}-${logoIndex}`}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-soft hover:shadow-soft-md transition-all duration-500 flex items-center justify-center h-20 animate-fade-in"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ height: logo.h, width: "auto" }}
              className="object-contain transition-opacity duration-500"
            />
          </div>
        );
      })}
    </div>
  );
}

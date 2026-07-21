"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  colorBg?: string;
  hoverBorder?: string;
}

export interface NavSection {
  id: string;
  label: string;
  href?: string;
  items?: DropdownItem[];
}

interface StripeNavMenuProps {
  sections: NavSection[];
}

export default function StripeNavMenu({ sections }: StripeNavMenuProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [prevTab, setPrevTab] = useState<string | null>(null);
  const [leftOffset, setLeftOffset] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = sections.findIndex((s) => s.id === activeTab);
  const prevIndex = sections.findIndex((s) => s.id === prevTab);
  const direction = activeIndex >= prevIndex ? 1 : -1;

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (activeTab !== id) {
      setPrevTab(activeTab);
      setActiveTab(id);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPrevTab(activeTab);
      setActiveTab(null);
    }, 200);
  };

  useEffect(() => {
    if (activeTab && buttonRefs.current[activeTab] && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const btnRect = buttonRefs.current[activeTab]!.getBoundingClientRect();
      const center = btnRect.left - navRect.left + btnRect.width / 2;
      setLeftOffset(center);
    }
  }, [activeTab]);

  const activeSection = sections.find((s) => s.id === activeTab && s.items && s.items.length > 0);

  const contentVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -24 : 24,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={navRef}
      className="relative flex items-center gap-1.5"
      onMouseLeave={handleMouseLeave}
    >
      {/* Nav Tab Buttons */}
      {sections.map((section) => {
        const isSelected = activeTab === section.id;
        const hasItems = section.items && section.items.length > 0;

        if (!hasItems && section.href) {
          return (
            <a
              key={section.id}
              ref={(el) => { buttonRefs.current[section.id] = el; }}
              href={section.href}
              onMouseEnter={() => handleMouseEnter(section.id)}
              className="relative px-3.5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors rounded-xl flex items-center gap-1 cursor-pointer"
            >
              {isSelected && (
                <motion.div
                  layoutId="stripe-hover-pill"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/60 rounded-xl -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span>{section.label}</span>
            </a>
          );
        }

        return (
          <button
            key={section.id}
            ref={(el) => { buttonRefs.current[section.id] = el; }}
            type="button"
            onMouseEnter={() => handleMouseEnter(section.id)}
            onClick={() => {
              if (activeTab === section.id) setActiveTab(null);
              else handleMouseEnter(section.id);
            }}
            className={`relative px-3.5 py-2 text-sm font-semibold transition-colors rounded-xl flex items-center gap-1.5 cursor-pointer border-none bg-transparent outline-none ${
              isSelected ? "text-emerald-950 font-bold" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="stripe-hover-pill"
                className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border border-emerald-200/70 rounded-xl -z-10 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span>{section.label}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                isSelected ? "rotate-180 text-emerald-700" : ""
              }`}
            />
          </button>
        );
      })}

      {/* Single Persistent Morphing Dropdown Panel */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, left: leftOffset }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{
              left: { type: "spring", stiffness: 400, damping: 35 },
              opacity: { duration: 0.15 },
              y: { duration: 0.15 },
              scale: { duration: 0.15 },
            }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            className="absolute top-full mt-2.5 z-50 origin-top -translate-x-1/2 pointer-events-auto"
          >
            {/* Floating Card Container with Dynamic Colors */}
            <motion.div
              layout
              transition={{
                layout: { type: "spring", stiffness: 400, damping: 35 },
              }}
              className="relative bg-white/95 backdrop-blur-2xl border border-gray-200/90 rounded-2xl shadow-soft-2xl ring-1 ring-black/5 overflow-hidden p-3 min-w-[320px] max-w-[440px]"
            >
              {/* Top Pointer Arrow */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rotate-45 border-l border-t border-gray-200/90 shadow-xs z-20" />

              {/* Inner Tab Items */}
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={activeSection.id}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="grid gap-1.5"
                >
                  {activeSection.items?.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveTab(null)}
                      className={`group flex items-center gap-3.5 p-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer border border-transparent ${
                        item.hoverBorder || "hover:border-gray-200/60 hover:bg-gray-50/70"
                      }`}
                    >
                      {item.icon && (
                        <div
                          className={`p-2.5 rounded-xl transition-all duration-200 shrink-0 shadow-xs ${
                            item.colorBg || "bg-emerald-100/70 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"
                          }`}
                        >
                          {item.icon}
                        </div>
                      )}
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-950 transition-colors truncate">
                        {item.label}
                      </span>
                    </a>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Fallback DropdownMenu export
export function DropdownMenu({ trigger, items }: any) {
  return (
    <StripeNavMenu
      sections={[
        {
          id: "default",
          label: typeof trigger === "string" ? trigger : "Menu",
          items: items,
        },
      ]}
    />
  );
}
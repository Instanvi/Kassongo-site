"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function DropdownMenu({ trigger, items, align = "left", isOpen, onOpen, onClose }: DropdownMenuProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const justNavigated = useRef(false);

  const scheduleClose = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      onClose();
      setActiveIndex(-1);
    }, 200);
  }, [onClose]);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          onClose();
          setActiveIndex(-1);
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev < items.length - 1 ? prev + 1 : 0;
            itemsRef.current[next]?.focus();
            return next;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev > 0 ? prev - 1 : items.length - 1;
            itemsRef.current[next]?.focus();
            return next;
          });
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          itemsRef.current[0]?.focus();
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(items.length - 1);
          itemsRef.current[items.length - 1]?.focus();
          break;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items.length, onClose]);

  // Handle item click - let browser navigate first, then close dropdown
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't prevent default - let the browser navigate
    // Just mark that we navigated so mouseleave doesn't interfere
    justNavigated.current = true;
    cancelClose();

    // Close dropdown after a small delay to let navigation start
    setTimeout(() => {
      onClose();
      setActiveIndex(-1);
      justNavigated.current = false;
    }, 50);
  };

  // Toggle on trigger click
  const handleTriggerClick = () => {
    if (isOpen) {
      onClose();
      setActiveIndex(-1);
    } else {
      onOpen();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        onMouseEnter={() => { cancelClose(); onOpen(); }}
        onMouseLeave={scheduleClose}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`flex items-center gap-1.5 text-sm font-medium transition-all py-2 px-3 rounded-xl cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 ${
          isOpen ? "text-green-800 bg-green-50/60" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/60"
        }`}
      >
        {trigger}
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel - use visibility instead of pointer-events to avoid blocking clicks */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={() => {
          if (!justNavigated.current) {
            scheduleClose();
          }
        }}
        className={`absolute top-full mt-2 w-64 bg-white rounded-2xl border border-gray-100 shadow-soft-xl z-50 overflow-hidden transition-all duration-200 ease-out origin-top ${
          align === "right" ? "right-0" : "left-0"
        } ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 visible"
            : "opacity-0 -translate-y-2 scale-[0.98] invisible"
        }`}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="p-2">
          {items.map((item, idx) => (
            <a
              key={item.href}
              ref={(el) => { itemsRef.current[idx] = el; }}
              href={item.href}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              onClick={handleItemClick}
              onMouseEnter={() => setActiveIndex(idx)}
              style={{ transitionDelay: isOpen ? `${idx * 30}ms` : "0ms" }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                activeIndex === idx
                  ? "bg-green-50 text-green-900 translate-x-0.5"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              } ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              {item.icon && (
                <span className={`shrink-0 transition-colors duration-150 ${activeIndex === idx ? "text-green-600" : "text-gray-400"}`}>
                  {item.icon}
                </span>
              )}
              <span className="font-semibold truncate">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
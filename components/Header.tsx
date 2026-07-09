"use client";

import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import Button from "./Button";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <Image
              src="/kassongo-logo-sm.png"
              alt="Kassongo"
              width={32}
              height={32}
              className="w-8 h-8 transition-smooth"
            />
            <span className="font-bold text-lg text-gray-900">
              kassongo
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-smooth">
              Services
            </a>
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-smooth">
              About
            </a>
            <a href="#standards" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-smooth">
              How It Works
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="default"
              href="#get-address"
              className="hidden md:inline-flex"
            >
              Shop Now
            </Button>

            <button
              type="button"
              className="hidden md:flex w-9 h-9 items-center justify-center text-gray-600 hover:text-gray-900 transition-smooth"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex w-9 h-9 items-center justify-center text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col gap-1">
              <a
                href="#services"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-smooth"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-smooth"
              >
                About
              </a>
              <a
                href="#standards"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-smooth"
              >
                How It Works
              </a>
              <div className="mt-4 px-4">
                <Button
                  variant="secondary"
                  size="lg"
                  href="#get-address"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full justify-center"
                >
                  Shop Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

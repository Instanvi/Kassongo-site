"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ProhibitedItemsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-16">
        
        {/* Hero Section */}
        <section className="relative bg-white py-16 px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              Prohibited & Restricted Items
            </h1>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Please review this list carefully before shipping. Violations may result in package seizure, account termination, and legal consequences.
            </p>
          </div>
        </section>

        {/* Critical Warning */}
        <section className="py-10 px-6 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Strictly Prohibited</h2>
            <p className="text-gray-100 leading-relaxed">
              Drugs, illegal substances (including marijuana, psilocybin, etc.), and pharmaceutical medications of any kind cannot be shipped or exported under any circumstances. This policy is non-negotiable and violations will result in immediate account termination and reporting to authorities.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            
            {/* Absolutely Prohibited */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Absolutely Prohibited Items</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Drugs & Pharmaceuticals</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>All prescription medications</li>
                    <li>Over-the-counter drugs</li>
                    <li>Marijuana and CBD products</li>
                    <li>Psilocybin and psychedelics</li>
                    <li>Any controlled substances</li>
                    <li>Vitamins and supplements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Weapons & Firearms</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>Firearms and gun replicas</li>
                    <li>Ammunition and explosives</li>
                    <li>Gun parts and accessories</li>
                    <li>Knives and bladed weapons</li>
                    <li>Stun guns and tasers</li>
                    <li>Military/police equipment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Hazardous Materials</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>Flammable liquids and gases</li>
                    <li>Explosives and fireworks</li>
                    <li>Toxic chemicals</li>
                    <li>Radioactive materials</li>
                    <li>Corrosive substances</li>
                    <li>Biological hazards</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Illegal Items</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>Counterfeit goods</li>
                    <li>Pirated media</li>
                    <li>Stolen property</li>
                    <li>Illegal wildlife products</li>
                    <li>Pornographic materials</li>
                    <li>Human remains</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Heavily Restricted */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Heavily Restricted Items</h2>
              <p className="text-gray-700 mb-5 text-sm">
                These items may be shipped with restrictions, special handling, or additional fees. Contact support before shipping.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Combustible Items</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>Paints and paint thinners</li>
                    <li>Oils and lubricants</li>
                    <li>Lighters and matches</li>
                    <li>Perfumes (high alcohol content)</li>
                    <li>Nail polish and remover</li>
                    <li>Hair dye and chemicals</li>
                    <li>Aerosol cans</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Pressurized Items</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>Hair spray and styling products</li>
                    <li>Shaving cream</li>
                    <li>Spray cans of any type</li>
                    <li>Compressed gas cylinders</li>
                    <li>Fire extinguishers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Electronics & Batteries</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>Lithium batteries (loose)</li>
                    <li>Power banks over 100Wh</li>
                    <li>Damaged electronics</li>
                    <li>E-cigarettes and vaping devices</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Alcohol & Tobacco</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>Alcoholic beverages (any quantity)</li>
                    <li>Tobacco products</li>
                    <li>Cigarettes and cigars</li>
                    <li>Nicotine products</li>
                    <li>Vaping liquids</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Country-Specific Restrictions */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Country-Specific Restrictions</h2>

              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Agricultural Products</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Many countries prohibit or restrict agricultural items:
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm ml-4">
                    <li>Plants, seeds, and soil</li>
                    <li>Fresh fruits and vegetables</li>
                    <li>Nuts and grains</li>
                    <li>Animal products and fur</li>
                    <li>Perishable foods</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Currency & Valuables</h3>
                  <ul className="space-y-1 text-gray-700 text-sm ml-4">
                    <li>Cash and currency</li>
                    <li>Money orders and bank drafts</li>
                    <li>Credit/debit cards (including prepaid)</li>
                    <li>Bullion and precious metals</li>
                    <li>Bearer bonds</li>
                    <li>Collectible stamps and coins</li>
                    <li>Lottery tickets</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Jewelry & Precious Stones</h3>
                  <p className="text-gray-700 text-sm">
                    Jewelry is restricted to some countries and only insurable up to $500 maximum. Any shipments exceeding $500 will be uninsured and customer assumes all risk above this limit.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Restrictions */}
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Additional Restrictions & Notes</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Live Animals</h3>
                  <p className="text-gray-700 text-sm">Animals and products made with animal fur are prohibited in most countries.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Perishable Foods</h3>
                  <p className="text-gray-700 text-sm">Foods of any type that can spoil or require refrigeration are prohibited.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pornography</h3>
                  <p className="text-gray-700 text-sm">Pornographic materials are prohibited in most countries.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hazmat Surcharges</h3>
                  <p className="text-gray-700 text-sm">Items deemed as dangerous goods according to IATA regulations may be subject to additional carrier surcharges.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Surveillance Equipment</h3>
                  <p className="text-gray-700 text-sm">Surveillance devices, night vision equipment, and spy gear are prohibited.</p>
                </div>
              </div>
            </div>

            {/* Consequences */}
            <div className="bg-gray-900 text-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Consequences of Shipping Prohibited Items</h2>
              <ul className="space-y-2 text-sm">
                <li>Packages will be refused, returned to sender, or disposed of</li>
                <li>Confiscation by customs or law enforcement authorities</li>
                <li>Customer remains liable for all associated costs and fees</li>
                <li>Immediate account termination</li>
                <li>Reporting to relevant authorities for illegal items</li>
                <li>Legal prosecution under applicable laws</li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Not Sure About an Item?</h2>
              <p className="text-gray-700 mb-4 text-sm">
                If you're unsure whether an item can be shipped, please contact our support team BEFORE sending packages to our warehouse. We're here to help you stay compliant with shipping regulations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition-all text-sm"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:support@kassongo.com"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:border-gray-400 transition-all text-sm"
                >
                  support@kassongo.com
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

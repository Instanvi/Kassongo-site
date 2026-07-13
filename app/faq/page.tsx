"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    category: "Getting Started",
    question: "What is Kassongo Express?",
    answer: "Kassongo Express is a global freight forwarding and package consolidation service that provides you with personalized shipping addresses in major trade hubs worldwide. We receive, store, consolidate, and forward your packages from international suppliers to your doorstep, helping you save money on shipping costs."
  },
  {
    category: "Getting Started",
    question: "How do I sign up?",
    answer: "Signing up is simple! Click the 'Get Started' button on our homepage, fill out the registration form with your details, choose your membership plan, and complete the payment. Once registered, you'll receive your unique shipping addresses for different countries via email within 24 hours."
  },
  {
    category: "Getting Started",
    question: "Do I need to be 18+ to use Kassongo Express?",
    answer: "Yes, you must be at least 18 years old to create an account and use our services. We require valid government-issued ID for verification purposes."
  },
  {
    category: "Getting Started",
    question: "What documents do I need to provide?",
    answer: "You'll need to provide two forms of valid government-issued identification (passport, driver's license, national ID card) and complete our registration form with accurate shipping information. Additional documentation may be required for high-value shipments or customs purposes."
  },

  // Shipping Addresses
  {
    category: "Shipping Addresses",
    question: "How do shipping addresses work?",
    answer: "After registration, you'll receive personalized suite numbers at our warehouse locations in countries like the USA, UK, China, Turkey, and more. Use these addresses when shopping online from any supplier. When your packages arrive at our warehouse, we'll notify you and hold them for consolidation."
  },
  {
    category: "Shipping Addresses",
    question: "Can I use my Kassongo address for any online store?",
    answer: "Yes! You can use your Kassongo addresses to shop from Amazon, eBay, AliExpress, Alibaba, Shein, Temu, and thousands of other online retailers. Just use your personalized suite number as the shipping address during checkout."
  },
  {
    category: "Shipping Addresses",
    question: "How many packages can I send to my Kassongo address?",
    answer: "There's no limit to the number of packages you can send to your Kassongo addresses. However, keep in mind our storage periods: packages must be shipped out within 90 days of receipt to avoid abandonment fees."
  },
  {
    category: "Shipping Addresses",
    question: "Can I ship to another freight forwarder using Kassongo?",
    answer: "No, Kassongo Express does not ship packages to other freight forwarding or reshipping companies. This policy helps us maintain security and service quality."
  },

  // Pricing & Fees
  {
    category: "Pricing & Fees",
    question: "What are your membership plans?",
    answer: "We offer three membership tiers: Free Plan (pay-as-you-go with storage starting day 7), Gold Member (monthly fee with storage starting day 30), and Platinum Member (monthly fee with storage starting day 45 plus additional perks like free consolidation and priority handling)."
  },
  {
    category: "Pricing & Fees",
    question: "How is shipping cost calculated?",
    answer: "Shipping costs are based on the actual weight or volumetric weight (whichever is greater) of your package, the destination country, and the carrier service you choose (economy, standard, or express). You can use our shipping calculator to get an estimate before finalizing your shipment."
  },
  {
    category: "Pricing & Fees",
    question: "Are there storage fees?",
    answer: "Yes, storage fees apply after a grace period based on your membership level: Free Plan (7 days), Gold Member (30 days), Platinum Member (45 days). Packages must be shipped within 90 days of receipt or they will be considered abandoned."
  },
  {
    category: "Pricing & Fees",
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and bank transfers. All payments must be made from an account in the same name as your Kassongo account for security purposes."
  },
  {
    category: "Pricing & Fees",
    question: "Do you charge for package consolidation?",
    answer: "Consolidation fees vary by membership level. Free Plan customers pay per consolidation, Gold Members receive discounted rates, and Platinum Members enjoy free unlimited consolidation."
  },
  {
    category: "Pricing & Fees",
    question: "Are there any hidden fees?",
    answer: "No hidden fees! We're transparent about all costs. You'll see shipping charges, consolidation fees (if applicable), storage fees (if applicable), and any carrier surcharges before you confirm your shipment. Note that customs duties and taxes in your destination country are your responsibility."
  },

  // Package Consolidation
  {
    category: "Package Consolidation",
    question: "What is package consolidation?",
    answer: "Package consolidation is when we combine multiple packages into one shipment. This significantly reduces shipping costs since you pay for one shipment instead of multiple individual packages. We'll remove excess packaging, combine items carefully, and repack everything securely."
  },
  {
    category: "Package Consolidation",
    question: "How long does consolidation take?",
    answer: "Standard consolidation takes 1-3 business days once all packages in your consolidation request have arrived at our warehouse. Platinum members receive priority consolidation, typically completed within 24 hours."
  },
  {
    category: "Package Consolidation",
    question: "Can I remove an item from a consolidation after it's started?",
    answer: "Yes, but additional fees apply and processing time will increase. It's best to finalize your consolidation request carefully before submitting it."
  },
  {
    category: "Package Consolidation",
    question: "Is Kassongo responsible if items go missing during consolidation?",
    answer: "Kassongo is not responsible for missing contents without proof of what was actually received at our warehouse. We recommend adding photos of your items to your shipment request for documentation."
  },
  {
    category: "Package Consolidation",
    question: "Can oversized items be consolidated?",
    answer: "Oversized and palletized packages cannot be consolidated with standard packages. These items must be shipped separately. Contact our support team for special handling of oversized freight."
  },

  // Customs & Duties
  {
    category: "Customs & Duties",
    question: "Who is responsible for customs duties and taxes?",
    answer: "You (the customer) are solely responsible for all customs duties, import taxes, and fees charged by your destination country. These charges are in addition to our shipping fees and are determined by your local customs authorities."
  },
  {
    category: "Customs & Duties",
    question: "How do I declare package value?",
    answer: "You must provide an accurate commercial invoice detailing the description and value of contents for each package. Declaring incorrect values can result in customs delays, penalties, or package seizure. It's your responsibility to provide accurate information."
  },
  {
    category: "Customs & Duties",
    question: "What happens if my package is seized by customs?",
    answer: "Kassongo Express is not responsible for packages seized or returned by customs due to prohibited items, incorrect documentation, or failure to comply with import regulations. You remain liable for all fees, and no refunds are provided for packages rejected by customs."
  },
  {
    category: "Customs & Duties",
    question: "Do I need special documentation for high-value shipments?",
    answer: "Yes, for packages with a total declared value of $2,500 USD or more, you are responsible for completing AES (Automated Export System) documentation. Kassongo does not provide this paperwork or TAX ID numbers."
  },
  {
    category: "Customs & Duties",
    question: "Can Kassongo help with customs clearance?",
    answer: "Yes, by registering with Kassongo, you appoint us as your agent for customs clearance, preparation of shipping documents, and certificates of origin. However, you remain responsible for providing accurate information and complying with all regulations."
  },

  // Prohibited Items
  {
    category: "Prohibited Items",
    question: "What items are prohibited?",
    answer: "Prohibited items include: all pharmaceuticals and drugs, firearms and weapons, explosives and flammable materials, perishable foods, live animals, cash and currency, tobacco and alcohol, counterfeit goods, and any items illegal in origin or destination countries. See our Terms & Conditions for the complete list."
  },
  {
    category: "Prohibited Items",
    question: "Can I ship prescription medications?",
    answer: "No, absolutely not. Cross-border pharmaceuticals of any kind are strictly prohibited, including prescription medications, over-the-counter drugs, vitamins, and supplements."
  },
  {
    category: "Prohibited Items",
    question: "Can I ship perfume or cosmetics?",
    answer: "Perfumes and cosmetics containing alcohol or flammable substances are restricted and may incur additional hazmat fees from carriers. Some perfumes may not be shippable depending on the destination and carrier. Contact us before shipping such items."
  },
  {
    category: "Prohibited Items",
    question: "Can I ship electronics and batteries?",
    answer: "Electronics are generally allowed, but lithium batteries have restrictions. Items with built-in batteries are usually fine, but loose lithium batteries may require special handling or be prohibited on certain carriers. Always declare electronics accurately."
  },
  {
    category: "Prohibited Items",
    question: "What happens if I ship prohibited items?",
    answer: "Packages containing prohibited items will be refused, returned to sender, confiscated by authorities, or disposed of at Kassongo's discretion. You remain liable for all associated costs, and your account may be terminated."
  },

  // Shipping & Delivery
  {
    category: "Shipping & Delivery",
    question: "Which carriers do you use?",
    answer: "We partner with major international carriers including FedEx, DHL, UPS, USPS, and regional carriers. You can choose your preferred carrier based on speed, cost, and service features when submitting your shipment request."
  },
  {
    category: "Shipping & Delivery",
    question: "How long does shipping take?",
    answer: "Delivery times vary by carrier and destination: Economy shipping (10-25 business days), Standard shipping (5-10 business days), Express shipping (2-5 business days). Note that customs clearance can add additional time."
  },
  {
    category: "Shipping & Delivery",
    question: "Which countries do you ship to?",
    answer: "We ship to most countries worldwide except for restricted destinations including: Cuba, Iran, North Korea, Syria, Russia, Belarus, and others subject to international sanctions. See our Terms & Conditions for the complete list."
  },
  {
    category: "Shipping & Delivery",
    question: "Can I track my shipment?",
    answer: "Yes! Once your package ships from our warehouse, you'll receive a tracking number via email. You can track your shipment directly on the carrier's website or through your Kassongo dashboard."
  },
  {
    category: "Shipping & Delivery",
    question: "What if my package is delayed or lost?",
    answer: "Contact us immediately if your package is delayed beyond the estimated delivery window. For lost packages, claims must be filed within 30 days of the shipment date. We'll work with the carrier to locate your package or process your insurance claim."
  },
  {
    category: "Shipping & Delivery",
    question: "Can I change the shipping address after submitting my request?",
    answer: "Address changes may be possible before the package ships from our warehouse. Contact us immediately if you need to change the destination address. Once the package is handed to the carrier, address changes must be arranged directly with the carrier."
  },

  // Insurance & Claims
  {
    category: "Insurance & Claims",
    question: "Is my package automatically insured?",
    answer: "All shipments include basic coverage up to $100 USD. For packages valued over $100, we strongly recommend purchasing additional insurance to cover the full declared value."
  },
  {
    category: "Insurance & Claims",
    question: "How do I file a claim for a lost or damaged package?",
    answer: "Lost packages: File a claim within 30 days of shipment date. Damaged packages: Report damage within 10 days of delivery. You'll need to provide proof of value (invoice or receipt) and photos of damage. Claims are processed within 30 days."
  },
  {
    category: "Insurance & Claims",
    question: "What is the claims payout based on?",
    answer: "Claims are paid at the lower of either the declared customs value or the actual purchase price shown on your invoice. You must provide proof of value. Payouts under $25 are issued as account credits."
  },
  {
    category: "Insurance & Claims",
    question: "What if Kassongo damages my package during consolidation?",
    answer: "Kassongo is not liable for damages to items that were pre-packaged by manufacturers. If damage occurred during our consolidation process, file a claim with supporting evidence. We'll review and process legitimate claims."
  },
  {
    category: "Insurance & Claims",
    question: "Are there fees for filing claims?",
    answer: "Yes, there is a processing fee for claims administered by Kassongo Express. False claims will be charged a minimum of $5.00 to cover investigation expenses."
  },

  // Security & Privacy
  {
    category: "Security & Privacy",
    question: "Can Kassongo open my packages?",
    answer: "Yes, for legal protection of the company and customers, Kassongo reserves the right to open and inspect all items delivered in your name without prior notice. This helps ensure compliance with shipping regulations and identify prohibited items."
  },
  {
    category: "Security & Privacy",
    question: "How is my personal information protected?",
    answer: "We use industry-standard encryption and security measures to protect your personal and payment information. We never share your data with third parties except as required for shipping and customs purposes. See our Privacy Policy for details."
  },
  {
    category: "Security & Privacy",
    question: "What if I suspect unauthorized account access?",
    answer: "Contact us immediately if you suspect unauthorized access to your account. Change your password right away. Until you notify us in writing of a security breach, you remain liable for any unauthorized use of your account."
  },
  {
    category: "Security & Privacy",
    question: "Why do I need to provide ID verification?",
    answer: "ID verification is required to comply with anti-terrorism regulations, prevent fraud, and ensure the security of international shipping. We may request additional documentation if we detect account discrepancies."
  },

  // Account Management
  {
    category: "Account Management",
    question: "Can I have multiple accounts?",
    answer: "No, duplicate accounts are not allowed. This includes creating multiple accounts paid from the same payment method. Violation of this policy may result in account termination."
  },
  {
    category: "Account Management",
    question: "How do I cancel my membership?",
    answer: "You can cancel your membership anytime through your account dashboard. Memberships end on the next renewal date with no backdating. No refunds are provided for early cancellation of monthly subscriptions."
  },
  {
    category: "Account Management",
    question: "What happens to my packages if I cancel?",
    answer: "After cancellation, Kassongo reserves the right to charge standard rates for packages that continue to arrive under your name. Packages may be returned to sender or disposed of. Make sure to ship out all packages before canceling."
  },
  {
    category: "Account Management",
    question: "Can Kassongo terminate my account?",
    answer: "Yes, Kassongo may terminate your account immediately at our discretion if your conduct fails to conform with our Terms and Conditions, including providing false information, shipping prohibited items, or violating our policies."
  },

  // Common Issues
  {
    category: "Common Issues",
    question: "I received the wrong package. What should I do?",
    answer: "Contact us immediately with details and photos. If it's verified that you received an incorrect package, Kassongo will reimburse shipping costs to forward it to the correct recipient. You're obligated to report factual information about what was received."
  },
  {
    category: "Common Issues",
    question: "My package hasn't arrived at the warehouse yet. What should I do?",
    answer: "Check the tracking number provided by the original retailer. If the carrier shows delivery to our warehouse but it's not in your account after 48 hours, contact us with the tracking number and we'll investigate."
  },
  {
    category: "Common Issues",
    question: "Can I refuse or return a package?",
    answer: "If a package hasn't been opened, you may request a return to sender. Return shipping fees apply and are your responsibility. Once consolidation begins or a package is shipped out, returns are not possible."
  },
  {
    category: "Common Issues",
    question: "The declared value on my package is incorrect. Can I change it?",
    answer: "You must declare values accurately before shipping. Contact us immediately if you made an error. Once a package ships, value declarations cannot be changed."
  }
];

const categories = [
  { name: "Getting Started" },
  { name: "Shipping Addresses" },
  { name: "Pricing & Fees" },
  { name: "Package Consolidation" },
  { name: "Customs & Duties" },
  { name: "Prohibited Items" },
  { name: "Shipping & Delivery" },
  { name: "Insurance & Claims" },
  { name: "Security & Privacy" },
  { name: "Account Management" },
  { name: "Common Issues" }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Getting Started");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-16">
        
        {/* Hero Section */}
        <section className="relative bg-white py-16 px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Find answers to common questions about Kassongo Express shipping, consolidation, customs, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 transition-all"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Category Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-1">
                  <h3 className="font-semibold text-sm text-gray-700 mb-3 px-3">Categories</h3>
                  {categories.map((category) => {
                    const count = faqData.filter(faq => faq.category === category.name).length;
                    return (
                      <button
                        key={category.name}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setOpenIndex(null);
                        }}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-left transition-all text-sm ${
                          selectedCategory === category.name
                            ? "bg-green-900 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                          selectedCategory === category.name
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FAQ List */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{selectedCategory}</h2>
                  <p className="text-sm text-gray-500 mt-1">{filteredFAQs.length} questions</p>
                </div>

                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No questions found matching your search.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredFAQs.map((faq, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all"
                      >
                        <button
                          onClick={() => toggleQuestion(index)}
                          className="w-full flex items-start justify-between gap-4 p-5 text-left"
                        >
                          <span className="font-semibold text-gray-900 flex-1">
                            {faq.question}
                          </span>
                          <div className="flex-shrink-0">
                            {openIndex === index ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        {openIndex === index && (
                          <div className="px-5 pb-5 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed mt-4">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Still Have Questions?
            </h2>
            <p className="text-base text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition-all"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@kassongo.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:border-gray-400 transition-all"
              >
                support@kassongo.com
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-16">
        
        {/* Hero Section */}
        <section className="relative bg-white py-8 px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-base text-gray-600">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-10 px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
              <h3 className="font-bold text-gray-900 mb-2">Our Commitment to Your Privacy</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                This privacy policy applies to kassongo.com and the Kassongo Express mobile application, owned and operated by Kassongo Express LLC. This policy describes how we collect and use the personal information you provide and the choices available to you regarding our use of your information.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-10">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information Collection and Use</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect the following personal information from you to provide and improve our freight forwarding services:
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                  <h3 className="font-bold text-gray-900 mb-3">Personal Information We Collect</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li><strong>Contact Information:</strong> name, email address, mailing address, phone number</li>
                    <li><strong>Billing Information:</strong> credit card number, payment method details</li>
                    <li><strong>Unique Identifiers:</strong> username, password, account credentials</li>
                    <li><strong>Shipping Information:</strong> package details, customs declarations, tracking data</li>
                    <li><strong>Identity Verification:</strong> government-issued ID, verification documents</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">How We Use Your Information</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>Provide you an account for accessing our services</li>
                    <li>Fulfill your service orders and shipment requests</li>
                    <li>Send you service notifications, tracking updates, and invoices</li>
                    <li>Respond to customer service requests, questions, and concerns</li>
                    <li>Process customs clearance and shipping documentation</li>
                    <li>Send you service update notifications and marketing communications</li>
                    <li>Comply with legal obligations and prevent fraud</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Marketing Communications & Choice/Opt-Out</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may choose to stop receiving marketing communications at any time by:
                </p>

                <ul className="space-y-2 text-gray-700 mb-4 ml-5">
                  <li>Following the unsubscribe instructions included in marketing emails</li>
                  <li>Disabling marketing notifications in your account settings or mobile application</li>
                  <li>Contacting us at privacy@kassongo.com</li>
                </ul>

                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <strong>Note:</strong> Even if you opt out of marketing communications, we will continue to send you essential service-related notifications such as order confirmations, shipping updates, and account security alerts.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  We will share your personal information with third parties only in the ways described in this privacy policy. <strong>We do not sell your personal information to third parties.</strong>
                </p>

                <div className="space-y-4">
                  <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
                    <h3 className="font-bold text-gray-900 mb-2">Service Providers</h3>
                    <p className="text-sm text-gray-700">
                      We may provide your information to companies that provide services associated with our business activities, such as shipping carriers (FedEx, DHL, USPS), payment processors, and customs brokers. These companies are authorized to use your personal information only as necessary to provide services to us.
                    </p>
                  </div>

                  <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
                    <h3 className="font-bold text-gray-900 mb-2">Legal Requirements</h3>
                    <p className="text-sm text-gray-700 mb-2">We may disclose your personal information:</p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>As required by law, such as to comply with a subpoena or similar legal process</li>
                      <li>When we believe in good faith that disclosure is necessary to protect our rights or your safety</li>
                      <li>To investigate fraud or respond to a government request</li>
                      <li>To comply with customs, tax, and export regulations</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
                    <h3 className="font-bold text-gray-900 mb-2">Business Transfers</h3>
                    <p className="text-sm text-gray-700">
                      If Kassongo Express is involved in a merger, acquisition, or sale of assets, you will be notified via email and/or a prominent notice on our website of any change in ownership or uses of your personal information, as well as any choices you may have.
                    </p>
                  </div>

                  <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
                    <h3 className="font-bold text-gray-900 mb-2">With Your Consent</h3>
                    <p className="text-sm text-gray-700">
                      We may share your information to any other third party with your prior consent to do so.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Login & Session Management</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">Browser & Mobile Application Sessions</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you log in, we use browser or mobile application data caches to store information about your logged-in session so that you can remain logged in and experience faster service delivery.
                </p>

                <h3 className="font-bold text-gray-900 mb-2">Third-Party Login</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you use a third-party login provider such as Google or Apple, we will store information provided by them such as your name and email address in order to set up and maintain your account. We only receive information that you authorize the third-party provider to share with us.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Security</h2>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    When you finalize and pay for a service order, your payment information is submitted <strong>directly to a payment service system</strong> (e.g., PayPal, Stripe) embedded in our website or mobile application, bypassing our servers entirely. This is a security feature.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    No payment method information is stored on our servers except reference information for identifying your payment transaction on invoices.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Tracking Technologies</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">Web Beacons & Pixels</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website and mobile application may contain "beacons" or "pixels" from third-party service providers to help compile aggregated statistics on how Kassongo Express is used by our user base as a whole, as well as to gauge the effectiveness of our customer communications and marketing campaigns.
                </p>

                <h3 className="font-bold text-gray-900 mb-2">Log Files</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We automatically collect and store all communications between our website, mobile application, and servers in log files. This includes information such as:
                </p>
                <ul className="text-gray-700 space-y-2 mb-4 ml-6">
                  <li>Internet Protocol (IP) addresses</li>
                  <li>Date/timestamps of access</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Pages visited and features used</li>
                </ul>
                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <strong>Note:</strong> Passwords are never stored in log files. We use this information to help investigate and resolve technical and service issues to serve you better.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links & Social Media</h2>
                
                <h3 className="font-bold text-gray-900 mb-2">Links to Other Websites</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website and mobile application include links to other websites whose privacy practices may differ from those of Kassongo Express. If you submit personal information to any of those sites, your information is governed by their privacy policies. We encourage you to carefully read the privacy policy of any website you visit.
                </p>

                <h3 className="font-bold text-gray-900 mb-2">Social Media Features and Widgets</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website includes Social Media Features, such as Facebook and Twitter buttons. These Features may collect your IP address, which page you are visiting on our site, and may set a cookie to enable the Feature to function properly. Social Media Features and Widgets are hosted by third parties and your interactions with these Features are governed by the privacy policy of the company providing it.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Security</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  The security of your personal information is important to us. We follow industry standards to protect all information submitted to us, both during transmission and once we receive it.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                  <h3 className="font-bold text-gray-900 mb-3">Security Measures We Implement</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>Encryption using Secure Socket Layer technology (SSL)</li>
                    <li>Secure data storage and access controls</li>
                    <li>Regular security audits and updates</li>
                    <li>Employee training on data protection</li>
                    <li>Multi-factor authentication options</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <strong>Important:</strong> However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, we cannot guarantee its absolute security. If you have any questions about security on our website, mobile application, or servers, please contact us at security@kassongo.com.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights: Accessing, Updating & Correcting Personal Information</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  If your personal information changes, or if you wish to review what information we hold about you, you may:
                </p>

                <ul className="space-y-2 text-gray-700 mb-4 ml-5">
                  <li>Update it by making changes on your account information page</li>
                  <li>Contact us at privacy@kassongo.com</li>
                  <li>Request a copy of your data through your account dashboard</li>
                </ul>

                <p className="text-gray-700 leading-relaxed">
                  We will respond to your request within 30 days.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Retention</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  We will retain information you provided to us for as long as is needed to:
                </p>

                <ul className="text-gray-700 space-y-2 mb-4 ml-6">
                  <li>Provide you services</li>
                  <li>Comply with our legal obligations</li>
                  <li>Resolve disputes</li>
                  <li>Enforce our agreements</li>
                  <li>Meet tax and accounting requirements</li>
                </ul>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-2">Data Deletion Requests</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    You may request us to delete or remove your Personal Data by contacting us at privacy@kassongo.com. Please note that we may need to retain certain information for legal compliance, fraud prevention, or to complete transactions you authorized before submitting your deletion request.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Notification of Privacy Policy Changes</h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this privacy policy to reflect new developments in our practices, technology, legal requirements, or for other reasons. If we make any material changes, we will notify you by:
                </p>

                <ul className="text-gray-700 space-y-2 mb-4 ml-6">
                  <li>Email sent to the email address specified in your account</li>
                  <li>A prominent notice on our website prior to the change becoming effective</li>
                  <li>In-app notification in our mobile application</li>
                </ul>

                <p className="text-gray-700 leading-relaxed">
                  We encourage you to periodically review this page for the latest information on our privacy practices.
                </p>
              </section>

              {/* Contact Section */}
              <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><strong>Email:</strong> privacy@kassongo.com</p>
                  <p><strong>Customer Service:</strong> support@kassongo.com</p>
                  <p><strong>Security Issues:</strong> security@kassongo.com</p>
                  <p><strong>Phone:</strong> +1 (234) 567-8900</p>
                  <p><strong>Mail:</strong> Kassongo Express Privacy Office<br />123 Freight Avenue<br />New York, NY 10001<br />United States</p>
                </div>
              </section>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

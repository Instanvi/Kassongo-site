"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-16">
        
        {/* Hero Section */}
        <section className="relative bg-white py-8 px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-base text-gray-600">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-10 px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Important Notice */}
            <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
              <h3 className="font-bold text-gray-900 mb-2">Important Notice</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                By completing the registration process and using Kassongo Express services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Please read carefully before proceeding.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-10">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The following Terms and Conditions govern your use of Kassongo Express LLC (also referred to herein as "Kassongo Express" or "Kassongo"). Completion of the registration process will constitute your acceptance of the Terms and Conditions provided below. There may be additional terms and conditions provided throughout kassongo.com governing your use of particular functions, features, information, and applications available through the platform.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Prohibited Items</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                  <p className="font-semibold text-gray-900 mb-3">Cross-border pharmaceuticals, drugs, and illegal substances are strictly prohibited.</p>
                  <p className="text-sm text-gray-700">
                    This includes but is not limited to: prescription medications, over-the-counter drugs, marijuana, psilocybin, and any controlled substances.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Power of Attorney & Agency Appointment</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The customer constitutes and appoints Kassongo Express, acting through any of its authorized persons, as true and lawful agent for the receipt and opening of mail, the performance of customs clearance, preparation of shipping documents, with full power of attorney to act to the extent allowed by law for the specific purposes enumerated in this section, including without limitation preparation of certificates of origin, shipping documentation, air/waybills, or any other document required to ship merchandise to the customer.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Marketing Communications</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customer gives full consent to Kassongo Express to email promotional or account-related offers. If you would like to be removed from the mailing list, please contact us at support@kassongo.com.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Account Information & Accuracy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In consideration for using Kassongo Express, you must provide and maintain current, complete, and accurate information about yourself when prompted. In the event that any information provided during registration or in your account settings is inaccurate, Kassongo Express reserves the right to terminate your account immediately and your right to use our services.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The customer acknowledges that they have a duty and are solely liable to provide all information required by applicable laws and regulations, as well as maintaining all records as required under customs or other government agency laws.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Account Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The customer is solely responsible for maintaining the confidentiality of their password and account, as well as for any and all activities that occur under said account. Customer must notify Kassongo Express immediately of any unauthorized use of their account or any other breach of security. Until Kassongo Express is notified in writing of a breach in security, you will remain liable for any unauthorized use of the service through your account.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express shall not be responsible for any damage from an error or omission arising from customers providing false or incorrect information or for failing to provide all necessary information.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Package Shipping & Inspection</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Upon your request, Kassongo Express will ship all packages to the address you registered with us. No packages will be shipped until all shipping charges and storage costs (if any) have been paid in addition to all applicable documentation being approved.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Kassongo Express will not ship your packages to another freight forwarding or reshipping company.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For legal protection of the company and its customers, <strong>Kassongo Express reserves the right to open and inspect all items delivered in your name without prior notice to customers</strong>. Kassongo Express reserves the right to refuse packages due to improper packaging or other factors at its sole discretion.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Carrier Services & Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express is not responsible for the actual shipping carrier service chosen by the customer (FedEx, USPS, DHL, etc.). Customer is responsible for ensuring that packages can be shipped based on size, weight, and volume restrictions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Any problem with a received package must be reported within <strong>10 days of delivery</strong>. Kassongo Express is not responsible for any delays, errors, or losses caused by carriers.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Legal Compliance</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Use of Kassongo Express is subject to all applicable local, state, national, and international laws and regulations. You agree not to:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4 ml-6">
                  <li>Use Kassongo Express for illegal purposes</li>
                  <li>Ship prohibited or restricted materials</li>
                  <li>Interfere with or disrupt networks connected to Kassongo Express</li>
                  <li>Violate regulations, policies, or procedures of Kassongo Express</li>
                  <li>Attempt to gain unauthorized access to systems or networks</li>
                  <li>Harass or interfere with another user's use of Kassongo Express</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Failure to comply with the above may result in cancellation without notice.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Restricted Destinations</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express does not ship to the following countries:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
                    <div>Algeria</div>
                    <div>Cuba</div>
                    <div>Iran</div>
                    <div>Myanmar</div>
                    <div>Nigeria</div>
                    <div>North Korea</div>
                    <div>Sudan</div>
                    <div>Syria</div>
                    <div>Libya</div>
                    <div>Yemen</div>
                    <div>Russia</div>
                    <div>Belarus</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Kassongo Express may add additional countries to this list at its discretion based on international sanctions and regulations.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Customs & Duties</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customer is solely responsible for:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4 ml-6">
                  <li>Providing an invoice detailing the description of contents</li>
                  <li>Declaring the correct value of each package for excise, duty, and tax payments</li>
                  <li>Declaring customs duty in their own country</li>
                  <li>All shipping charges (even if assessed later by carrier)</li>
                  <li>Understanding and complying with import/export regulations</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express does not guarantee delivery of packages that do not comply with import/export regulations of the country to which they are sent. Kassongo Express is not responsible for costs or fees related to the return of a package and does not refund fees associated with returned packages.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  The customer is solely responsible for any penalties issued by customs authorities.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For any package with a total declared value of USD $2,500 or more, the customer is responsible for filling out AES (Automated Export System) documents. Kassongo Express will not and does not provide this paperwork or TAX ID numbers required for import/export.
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Payment Requirements</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customer shall make payments for postage and deposits from their own account(s). The account must be under the same name as the Kassongo Express account. Customer must be over 18 years old to use the service.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express reserves the right to place accounts on security hold due to discrepancies. Customers are required to provide copies of two valid identification documents for verification purposes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Duplicate accounts are not allowed (for example, multiple accounts all paid from the same payment method).
                </p>
              </section>

              {/* Section 13 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. COD & Prohibited Deliveries</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express will not accept:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4 ml-6">
                  <li>Items delivered COD (Cash on Delivery)</li>
                  <li>Prohibited or restricted merchandise</li>
                  <li>Goods that are clearly damaged</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Any such deliveries will be refused and returned to sender. Kassongo Express will not accept delivery to anyone on your behalf unless the delivery is addressed to your personalized mailbox. Kassongo Express is not liable to make any payments to retailers on your behalf.
                </p>
              </section>

              {/* Section 14 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Account Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express may terminate your use of the service at any time, effective immediately, at Kassongo's sole discretion should your conduct fail to conform to these Terms and Conditions. Kassongo Express shall not be liable to you or any third party for termination of your service use.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Upon termination, your right to use Kassongo Express will cease immediately. After cancellation or termination, Kassongo reserves the right to charge you standard rates for mail or packages that still arrive under your name; and/or return the items to sender or dispose of them.
                </p>
              </section>

              {/* Section 15 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Package Consolidation</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express allows for consolidation of packages. However, Kassongo Express is not responsible for missing content of any package due to the consolidation request without proof of what was actually received.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo reserves the right to remove all catalogs and unnecessary packaging materials during consolidation. Requests to remove items from existing consolidations will be subject to additional fees and may take additional time to complete.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Additional charges may apply for hazardous material packages depending on the type and carrier selected. Kassongo has the right to limit consolidations based on weight and number of items. Oversized and palletized packages may not be consolidated.
                </p>
              </section>

              {/* Section 16 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Incorrect Package Delivery</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customer must immediately notify Kassongo Express if an incorrect package is received. Kassongo Express will reimburse the customer for shipping to the correct address.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If we contact a customer regarding receipt of an incorrect package, the customer is obligated to report all factual information as to what was received. In the case that it is verified that a wrong item was received and the customer refuses to forward the item, we reserve the right to close the account.
                </p>
              </section>

              {/* Section 17 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Storage Fees & Package Abandonment</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Packages may be stored in Kassongo warehouses for a maximum of <strong>90 days from receipt</strong>. Storage fees vary by membership level:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li><strong>Free Plan:</strong> Storage fees begin on day 7</li>
                    <li><strong>Gold Member:</strong> Storage fees begin on day 30</li>
                    <li><strong>Platinum Member:</strong> Storage fees begin on day 45</li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Once a package reaches the 90-day storage limit, it will be considered abandoned, and the customer's account will be restricted pending payment of outstanding storage fees. Kassongo reserves the right to dispose of any and all abandoned packages.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Customers remain liable and will be required to pay any outstanding storage fees before being able to ship packages from Kassongo warehouses.
                </p>
              </section>

              {/* Section 18 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Claims for Lost or Damaged Packages</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For claim payouts, the customer will be reimbursed by the lower of either the declared value of contents or the vendor invoice value. Customers are responsible for filling out the correct description of contents and value for customs.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo has the right to issue payment based on its discretion if information is incomplete or missing. All claims must include:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4 ml-6">
                  <li><strong>Lost packages:</strong> Must be reported within 30 days from shipment date</li>
                  <li><strong>Damaged packages:</strong> Must be reported within 10 days after receiving the package</li>
                  <li>Proof of value by invoice or order confirmation</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <strong>Important:</strong> False claims will be charged a minimum of $5.00 as cost for Kassongo's expenses for investigating the claim.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  No claims for lost or missing packages can be submitted to the carrier. There will be an additional processing fee for any claims administered by Kassongo Express. Payments may take up to 30 days to complete once a claim has been finalized. Payouts under $25 will be issued as credits to the customer's account.
                </p>
              </section>

              {/* Section 19 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Declared Value & Insurance</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customers are required to enter a declared value for assessing customs, duties, and taxes charged by government authorities. Customers understand and agree that any insurance payout awarded by providers is based on the declared value entered by the customer, not the actual amount paid.
                </p>
              </section>

              {/* Section 20 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Lien on Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo Express shall have a general lien on any and all property (and documents relating thereto) of the customer in its possession, custody, or control, for all claims for charges, expenses, or advances incurred in connection with any freight forwarding service provided to the customer.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If such claim remains unsatisfied for 90 days, Kassongo Express may sell at public auction or private sale, without further notice to the customer, the goods, wares, and/or merchandise as may be necessary to satisfy such lien.
                </p>
              </section>

              {/* Section 21 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All packages are shipped on a limited liability basis. <strong>In no event shall Kassongo Express's aggregate liability exceed $100 per shipment unless additional insurance is purchased.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In no event shall Kassongo Express be liable to anyone for any indirect, punitive, special, exemplary, incidental, consequential, or other damages of any type or kind (including lost profits) from performance of service.
                </p>
              </section>

              {/* Section 22 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">22. Customer Indemnification</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customer shall indemnify and hold Kassongo Express harmless from any and all claims, including legal fees incurred in defending against said claims, from third parties arising out of the transmission of packages/mail sent by customer through Kassongo Express.
                </p>
              </section>

              {/* Section 23 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">23. Force Majeure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kassongo shall be excused from performance of its obligations, in whole or in part, if failure or inability to perform is caused by Force Majeure, including but not limited to:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4 ml-6">
                  <li>Acts of God, fire, flood, or other natural catastrophes</li>
                  <li>Utility outages (electric, communications, or other)</li>
                  <li>National emergencies, civil disturbances, insurrections, riots, wars</li>
                  <li>Epidemics, pandemics, or public health emergencies</li>
                  <li>Strikes or labor disputes</li>
                  <li>Actions or restrictions of governmental authorities</li>
                  <li>Causes not within the reasonable control of Kassongo Express</li>
                </ul>
              </section>

              {/* Section 24 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">24. Anti-Terrorism Compliance</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customer represents and warrants to Kassongo Express that neither the customer nor any person acting on their behalf is a person or entity described by Section 1 of Executive Order No. 13,224 - Blocking Property and Prohibiting Transactions With Persons Who Commit, Threaten to Commit, or Support Terrorism.
                </p>
              </section>

              {/* Section 25 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">25. Membership & Subscription Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Monthly membership subscriptions renew automatically until the membership is cancelled. When cancelled, the membership will end on the next renewal date. Memberships do not backdate. No refunds are provided for early cancellation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Any coupon codes supplied by Kassongo Express may be subject to minimum or maximum value restrictions and may change without notice.
                </p>
              </section>

              {/* Section 26 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">26. Unclaimed Packages</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Packages delivered by carriers or third parties where suite numbers are not visible or do not match the account name must be claimed within 30 days of delivery. Any packages not claimed within this time frame will be subject to Kassongo Express abandonment regulations.
                </p>
              </section>

              {/* Section 27 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">27. Changes to Terms</h2>
                <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg">
                  <p className="text-gray-900 font-semibold mb-2">
                    Kassongo Express may make future changes or modifications to these Terms and Conditions at any time without notice.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Your subsequent viewing or use of kassongo.com will constitute your agreement to the changes and modifications.
                  </p>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Information</h2>
                <p className="text-gray-700 mb-4 text-sm">
                  If you have any questions about these Terms and Conditions or need clarification on any section, please contact us:
                </p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><strong>Email:</strong> legal@kassongo.com</p>
                  <p><strong>Customer Service:</strong> support@kassongo.com</p>
                  <p><strong>Phone:</strong> +1 (234) 567-8900</p>
                  <p><strong>Mail:</strong> Kassongo Express Legal Department<br />123 Freight Avenue<br />New York, NY 10001<br />United States</p>
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

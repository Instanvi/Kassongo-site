"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTranslation } from "../../lib/i18n/LanguageContext";

export default function TermsAndConditionsPage() {
  const { locale } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-8 px-6 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              {locale === "en" || locale === "uk"
                ? "Terms & Conditions"
                : locale === "zh"
                ? "服务条款"
                : locale === "de"
                ? "Allgemeine Geschaeftsbedingungen"
                : "Conditions générales"}
            </h1>
            <p className="text-base text-gray-600 font-semibold">
              {locale === "en" || locale === "uk"
                ? "Last Updated"
                : locale === "zh"
                ? "最后更新于"
                : locale === "de"
                ? "Zuletzt aktualisiert"
                : "Dernière mise à jour"}
              :{" "}
              {new Date().toLocaleDateString(
                locale === "en" || locale === "uk" ? "en-US" : locale === "zh" ? "zh-CN" : "de-DE",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-10 px-6">
          <div className="max-w-4xl mx-auto">
            {(locale === "en" || locale === "uk") && <EnglishTerms />}
            {locale === "fr" && <FrenchTerms />}
            {locale === "zh" && <ChineseTerms />}
            {locale === "de" && <GermanTerms />}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EnglishTerms() {
  return (
    <>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
        <h3 className="font-bold text-gray-900 mb-2">Important Notice</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          By completing the registration process and using Kassongo Express services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Please read carefully before proceeding.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The following Terms and Conditions govern your use of Kassongo Express LLC (also referred to herein as "Kassongo Express" or "Kassongo"). Completion of the registration process will constitute your acceptance of the Terms and Conditions provided below. There may be additional terms and conditions provided throughout kassongo.com governing your use of particular functions, features, information, and applications available through the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Prohibited Items</h2>
          <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg mb-4">
            <p className="font-semibold text-red-900 mb-3">Cross-border pharmaceuticals, drugs, and illegal substances are strictly prohibited.</p>
            <p className="text-sm text-red-700 leading-relaxed">
              This includes but is not limited to: prescription medications, over-the-counter drugs, marijuana, psilocybin, and any controlled substances. Accounts attempting to ship these items will be closed immediately.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Power of Attorney & Agency Appointment</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The customer constitutes and appoints Kassongo Express, acting through any of its authorized persons, as true and lawful agent for the receipt and opening of mail, the performance of customs clearance, preparation of shipping documents, with full power of attorney to act to the extent allowed by law for the specific purposes enumerated in this section, including without limitation preparation of certificates of origin, shipping documentation, air/waybills, or any other document required to ship merchandise to the customer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Marketing Communications</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Customer gives full consent to Kassongo Express to email promotional or account-related offers. If you would like to be removed from the mailing list, please contact us at support@kassongo.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Account Information & Accuracy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In consideration for using Kassongo Express, you must provide and maintain current, complete, and accurate information about yourself when prompted. In the event that any information provided during registration or in your account settings is inaccurate, Kassongo Express reserves the right to terminate your account immediately and your right to use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Account Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The customer is solely responsible for maintaining the confidentiality of their password and account, as well as for any and all activities that occur under said account. Customer must notify Kassongo Express immediately of any unauthorized use of their account or any other breach of security. Until Kassongo Express is notified in writing of a breach in security, you will remain liable for any unauthorized use of the service through your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Package Shipping & Inspection</h2>
          <p className="text-gray-700 leading-relaxed mb-4 font-semibold text-red-950">
            Kassongo Express will not ship your packages to another freight forwarding or reshipping company.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For legal protection of the company and its customers, Kassongo Express reserves the right to open and inspect all items delivered in your name without prior notice to customers. Kassongo Express reserves the right to refuse packages due to improper packaging or other factors at its sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Carrier Services & Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express is not responsible for the actual shipping carrier service chosen by the customer (FedEx, USPS, DHL, etc.). Any problem with a received package must be reported within 10 days of delivery. Kassongo Express is not responsible for any delays, errors, or losses caused by carriers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Legal Compliance</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Use of Kassongo Express is subject to all applicable local, state, national, and international laws and regulations. You agree not to use Kassongo Express for illegal purposes or to ship prohibited materials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Restricted Destinations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express does not ship to the following countries:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700 font-bold">
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
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Customs & Duties</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The customer is solely responsible for declaring the correct value of each package for excise, duty, and tax payments. The customer is solely responsible for any penalties issued by customs authorities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Payment Requirements</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Customer shall make payments for postage and deposits from their own account(s). The account must be under the same name as the Kassongo Express account. Duplicate accounts are not allowed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. COD & Prohibited Deliveries</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express will not accept COD (Cash on Delivery) shipments or goods that are clearly damaged.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Account Termination</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express may terminate your use of the service at any time, effective immediately, at Kassongo's sole discretion should your conduct fail to conform to these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Package Consolidation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express allows for consolidation of packages. However, Kassongo Express is not responsible for missing content of any package due to the consolidation request without proof of what was actually received.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Incorrect Package Delivery</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Customer must immediately notify Kassongo Express if an incorrect package is received. If a customer refuses to forward an incorrect item, we reserve the right to close the account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Storage Fees & Package Abandonment</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Packages may be stored in Kassongo warehouses for a maximum of 90 days from receipt. Storage fees vary by membership level:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <ul className="space-y-2 text-gray-700 text-sm font-semibold">
              <li>Free Plan: Storage fees begin on day 7</li>
              <li>Gold Member: Storage fees begin on day 30</li>
              <li>Platinum Member: Storage fees begin on day 45</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Claims for Lost or Damaged Packages</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Reimbursement is based on the lower of either the declared value of contents or the vendor invoice value. False claims will be charged a minimum fee of $5.00 to cover investigation costs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Declared Value & Insurance</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Customers understand and agree that any insurance payout awarded by providers is based on the declared value entered by the customer, not the actual amount paid.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Lien on Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express shall have a general lien on any and all property of the customer in its possession for all claims for charges, expenses, or advances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In no event shall Kassongo Express's aggregate liability exceed $100 per shipment unless additional insurance is purchased.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">22. Customer Indemnification</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Customer shall indemnify and hold Kassongo Express harmless from any and all claims from third parties arising out of packages/mail sent by customer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">23. Force Majeure</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo shall be excused from performance of its obligations if failure is caused by acts of God, war, utility outages, strikes, pandemics, or governmental restrictions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">24. Anti-Terrorism Compliance</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Customer warrants that they are not on any international terrorist lists or subject to trade blockades.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">25. Membership & Subscription Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Monthly membership subscriptions renew automatically until cancelled. No refunds are provided for early cancellation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">26. Unclaimed Packages</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Packages delivered without visible suite numbers or matching names must be claimed within 30 days of delivery.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">27. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express may make future changes or modifications to these Terms and Conditions at any time without notice.
          </p>
        </section>
      </div>
    </>
  );
}

function FrenchTerms() {
  return (
    <>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
        <h3 className="font-bold text-gray-900 mb-2">Avis important</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          En complétant le processus d'inscription et en utilisant les services de Kassongo Express, vous reconnaissez avoir lu, compris et accepté d'être lié par ces conditions générales. Veuillez les lire attentivement.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptation des conditions</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Les conditions générales suivantes régissent votre utilisation de Kassongo Express LLC. La finalisation de votre inscription constitue votre acceptation pleine et entière des présentes conditions générales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Objets interdits</h2>
          <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg mb-4">
            <p className="font-semibold text-red-900 mb-3">Les produits pharmaceutiques transfrontaliers, les drogues et les substances illégales sont strictement interdits.</p>
            <p className="text-sm text-red-700 leading-relaxed">
              Cela comprend notamment : les médicaments sur ordonnance, les médicaments en vente libre, le cannabis, la psilocybine et toutes les substances contrôlées. Les comptes tentant d'expédier ces articles seront fermés immédiatement.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Procuration & Désignation d'agent</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le client désigne Kassongo Express comme son agent légal pour la réception et l'ouverture du courrier, le dédouanement et la préparation des documents d'expédition.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Communications marketing</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le client consent à recevoir des e-mails promotionnels de Kassongo Express. Vous pouvez vous désinscrire à tout moment à support@kassongo.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Informations de compte & Exactitude</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vous devez fournir des informations exactes et à jour lors de votre inscription. Kassongo se réserve le droit de fermer votre compte en cas d'informations erronées.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sécurité du compte</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le client est seul responsable de la confidentialité de son mot de passe et de son compte, ainsi que de toutes les activités effectuées sous ce compte.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Expédition & Inspection des colis</h2>
          <p className="text-gray-700 leading-relaxed mb-4 font-semibold text-red-950">
            Kassongo Express n'expédiera pas vos colis à une autre entreprise de réexpédition ou de transport.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo se réserve le droit d'ouvrir et d'inspecter tous les colis livrés à votre nom sans préavis, pour des raisons de sécurité juridique.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Services des transporteurs & Responsabilité</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express n'est pas responsable des services de transport choisis par le client. Tout problème doit être signalé sous 10 jours après la livraison.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Conformité légale</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            L'utilisation de Kassongo Express est soumise aux lois locales, nationales et internationales. L'envoi d'objets illégaux est passible de sanctions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Destinations restreintes</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express ne livre pas dans les pays suivants :
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700 font-bold">
              <div>Algérie</div>
              <div>Cuba</div>
              <div>Iran</div>
              <div>Myanmar</div>
              <div>Nigéria</div>
              <div>Corée du Nord</div>
              <div>Soudan</div>
              <div>Syrie</div>
              <div>Libye</div>
              <div>Yémen</div>
              <div>Russie</div>
              <div>Biélorussie</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Douanes & Droits</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le client est seul responsable de déclarer la valeur exacte de chaque colis. Toute pénalité douanière est à la charge exclusive du client.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Exigences de paiement</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Les paiements doivent être effectués à partir de comptes au même nom que le compte Kassongo Express. Les comptes doublons ne sont pas autorisés.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Envois contre remboursement & Livraisons interdites</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo n'accepte pas les envois contre remboursement (COD) ou les marchandises visiblement endommagées.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Fermeture de compte</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo se réserve le droit de fermer votre compte à tout moment si votre conduite ne respecte pas les présentes conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Package Consolidation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La consolidation est disponible. Kassongo n'est pas responsable des articles manquants sans preuve de ce qui a été reçu à l'entrepôt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Livraison de colis incorrect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le client doit immédiatement signaler la réception d'un colis incorrect. Tout refus de coopérer peut mener à la fermeture du compte.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Frais de stockage & Abandon de colis</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Les colis peuvent être stockés gratuitement pendant une période dépendant de votre abonnement, dans la limite de 90 jours :
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <ul className="space-y-2 text-gray-700 text-sm font-semibold">
              <li>Formule Gratuite : Facturation à partir du 7e jour</li>
              <li>Membre Gold : Facturation à partir du 30e jour</li>
              <li>Membre Platinum : Facturation à partir du 45e jour</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Réclamations pour colis perdus ou endommagés</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le remboursement est basé sur la valeur déclarée ou le prix de la facture d'achat (le plus bas des deux). Une fausse réclamation sera facturée 5 $ USD pour couvrir les frais de dossier.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Valeur déclarée & Assurance</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le remboursement par l'assurance est calculé sur la valeur déclarée par le client lors de la saisie de l'envoi, et non sur le prix d'achat réel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Droit de rétention sur la marchandise</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express dispose d'un droit de rétention général sur toutes les marchandises en sa possession pour garantir le paiement des factures dues.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Limitation de responsabilité</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La responsabilité globale de Kassongo Express est limitée à 100 $ USD par envoi, à moins qu'une assurance supplémentaire n'ait été souscrite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">22. Indemnisation par le client</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le client s'engage à indemniser Kassongo de toute réclamation émanant de tiers liée aux marchandises envoyées par le client.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">23. Force majeure</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo est libéré de ses obligations contractuelles en cas de force majeure : catastrophes naturelles, guerres, grèves, pandémies, etc.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">24. Lutte contre le terrorisme</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le client garantit qu'il ne figure pas sur les listes internationales de terroristes et n'est pas soumis à des sanctions financières ou commerciales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">25. Conditions d'abonnement & D'adhésion</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Les abonnements mensuels se renouvellent automatiquement. Aucun remboursement n'est effectué pour les annulations anticipées.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">26. Colis non réclamés</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Les colis reçus sans numéro de suite ou nom valide doivent être réclamés sous 30 jours, sous peine d'abandon.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">27. Modification des conditions</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo se réserve le droit de modifier les présentes conditions à tout moment et sans préavis.
          </p>
        </section>
      </div>
    </>
  );
}

function ChineseTerms() {
  return (
    <>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
        <h3 className="font-bold text-gray-900 mb-2">重要通知</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          完成注册并使用 Kassongo Express 服务，即代表您承认已阅读、理解并同意受这些服务条款的约束。请在继续操作前仔细阅读。
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 条款接受</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            以下服务条款适用于您对 Kassongo Express LLC 服务的使用。完成注册流程即视为您接受下列条款和条件。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 禁运物品</h2>
          <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg mb-4">
            <p className="font-semibold text-red-900 mb-3">严格禁止跨境邮寄非处方药、处方药及任何毒品违禁品。</p>
            <p className="text-sm text-red-700 leading-relaxed">
              这包括但不限于：处方药、感冒药等非处方药、大麻、精神类管制药物。任何试图邮寄此类物品的账户将被立即永久关闭。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 委托授权书与代理人指定</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            客户指定 Kassongo Express 作为其合法代理人，用于包裹/邮件的代收、开箱检查、协助报关清关及制作航空运单等清关文件。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 市场推广通讯</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            客户同意 Kassongo Express 通过邮件发送促销信息。您可随时通过 support@kassongo.com 申请退订。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 账户信息的真实性</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            您必须保证注册信息的真实、准确和完整。如信息存在虚假或失效，Kassongo 保留立即注销您账户的权利。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 账户安全</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            客户应对其账户和密码的保密性负全责。如发现账户被盗用，应立即联系客服。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 包裹运送与开箱检查</h2>
          <p className="text-gray-700 leading-relaxed mb-4 font-semibold text-red-950">
            Kassongo Express 不会将您的包裹转运给其他货运代理或海外转运公司。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            为保障合规与安全，Kassongo Express 保留开箱查验货物的权利，无需提前通知客户。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 承运商服务与免责</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo 不对客户自选的物流承运商（如 FedEx, DHL）的过失 or 延误负责。包裹异常须在签收 10 天内反馈。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. 法律合规</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            严禁将 Kassongo 用于非法目的，禁止运输任何违法违禁物资。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. 受限目的地国家</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express 不提供转运至以下受制裁或受限国家的物流服务：
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700 font-bold">
              <div>阿尔及利亚</div>
              <div>古巴</div>
              <div>伊朗</div>
              <div>缅甸</div>
              <div>尼日利亚</div>
              <div>朝鲜</div>
              <div>苏丹</div>
              <div>叙利亚</div>
              <div>利比亚</div>
              <div>也门</div>
              <div>俄罗斯</div>
              <div>白俄罗斯</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. 海关清关与关税</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            客户有义务对包裹进行准确诚实的申报，并承担一切关税和增值税。由于虚报产生的罚款由客户承担。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. 支付要求</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            运费账单的付款账户名必须与注册会员名保持一致。禁止注册多个关联账户进行恶意操作。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. 货到付款与拒收件</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo 仓库拒绝签收任何到付（COD）包裹，或具有明显严重破损的货物。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. 账户终止</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            如果客户违反本条款中的任何规定，Kassongo 有权随时中断并永久终止为您提供服务。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">15. 包裹合箱服务</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们提供多包裹合并重新装箱。没有原始仓库入库清单等书面货值证明，我们不对合箱后物品缺失的声称负责。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">16. 异常派件处理</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            如错收他人包裹应立即联系我们进行退还。对于恶意据为己有者，我们将注销其账户并移交法办。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">17. 仓储费用与无主包裹判定</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            包裹在仓库的免费保管时长因会员等级而异，最长可保管 90 天：
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <ul className="space-y-2 text-gray-700 text-sm font-semibold">
              <li>普通会员：第 7 天起计收超期仓储费</li>
              <li>黄金会员：第 30 天起计收超期仓储费</li>
              <li>白金会员：第 45 天起计收超期仓储费</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed">
            超过 90 天未提交发货的包裹将被判定为无主弃件，Kassongo 拥有处置权。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">18. 包裹丢失及损坏理赔</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            赔付金额根据海关申报货值或采购发票原价中的较低者来执行。如提交虚假理赔申请，将收取 5 美元的惩罚性手续费。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">19. 申报价值与保险</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            购买商业保险的赔偿额度以客户填报的申报价值为上限，不以实际购买价格为标准。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">20. 留置权说明</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express 对您未支付运费或欠费的包裹享有通用留置权，有权扣留或依法变卖以冲抵欠款。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">21. 责任限额</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            除客户自行购买了商业足额险外，Kassongo 的最大赔付责任限额为每单 100 美元。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">22. 客户赔偿承诺</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            客户须免除并赔偿 Kassongo 因承运客户的包裹而引起的任何第三方索赔或诉讼成本。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">23. 不可抗力免责</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            由于台风、地震等自然灾害、战争、罢工、疫情或政府禁令导致的延误，Kassongo 予以免责。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">24. 反恐合规</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            客户保证自己及其交易对象不在任何国际反恐或金融制裁禁运黑名单上。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">25. 会员计划与订阅条款</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            月度会员资格到期自动续费。对于中途提前注销会员的账户，已扣收的月费概不退还。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">26. 未认领包裹</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            入库时无正确套件号或无收件人信息的模糊包裹，须在 30 天内申请认领，超期视为弃件。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">27. 条款变更</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express 保留随时修改这些条款的权利。继续浏览或使用本网站即表示您同意条款的变更。
          </p>
        </section>
      </div>
    </>
  );
}

function GermanTerms() {
  return (
    <>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
        <h3 className="font-bold text-gray-900 mb-2">Wichtiger Hinweis</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Mit dem Abschluss der Registrierung und der Nutzung der Dienste von Kassongo Express bestoetigen Sie, dass Sie diese Allgemeinen Geschaeftsbedingungen gelesen und verstanden haben und an diese gebunden sind. Bitte lesen Sie diese vor der Nutzung aufmerksam durch.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Akzeptanz der Bedingungen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die folgenden Allgemeinen Geschaeftsbedingungen regeln Ihre Nutzung von Kassongo Express LLC. Die Registrierung stellt Ihre Zustimmung zu den unten aufgefuehrten Bedingungen dar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Verbotene Gegenstaende</h2>
          <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg mb-4">
            <p className="font-semibold text-red-900 mb-3">Grenzoeberschreitende Arzneimittel, Drogen und illegale Substanzen sind strengstens verboten.</p>
            <p className="text-sm text-red-700 leading-relaxed">
              Dies umfasst unter anderem: verschreibungspflichtige Medikamente, rezeptfreie Arzneimittel, Cannabis, Psilocybin und saemtliche regulierte Substanzen. Konten, die versuchen, solche Gegenstaende zu versenden, werden unverzueglich geschlossen.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Vollmacht und Ernennung der Spedition</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Der Kunde bestellt Kassongo Express zu seinem rechtlichen Vertreter für den Empfang und das Oeffnen der Post, die Zollabfertigung und die Vorbereitung aller Transportdokumente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Marketing-Kommunikation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Der Kunde stimmt dem Erhalt von Marketing-E-Mails von Kassongo Express zu. Die Abmeldung ist jederzeit unter support@kassongo.com moeglich.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Richtigkeit der Kontoinformationen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sie müssen bei der Anmeldung vollstaendige und korrekte Angaben machen. Kassongo behaelt sich das Recht vor, Ihr Konto bei falschen Angaben mit sofortiger Wirkung zu sperren.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Kontosicherheit</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Der Kunde traegt die alleinige Verantwortung für die Geheimhaltung seines Passworts sowie für saemtliche Aktivitaeten unter seinem Mitgliedskonto.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Paketversand und Inspektion</h2>
          <p className="text-gray-700 leading-relaxed mb-4 font-semibold text-red-950">
            Kassongo Express versendet Ihre Pakete nicht an andere Speditionen oder Weiterleitungsunternehmen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Aus rechtlichen Gruenden behaelt sich Kassongo Express das Recht vor, alle an Ihren Namen adressierten Pakete ohne vorherige Ankuendigung zu oeffnen und zu inspizieren.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Transportdienste und Haftung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express haftet nicht für den vom Kunden gewaehlten Frachtfuehrer. Eventuelle Reklamationen muessen innerhalb von 10 Tagen nach Lieferung gemeldet werden.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Gesetzeskonformitaet</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Nutzung von Kassongo Express unterliegt den geltenden Gesetzen. Der Versand illegaler Gueter führt zur Sperrung des Kontos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Ausgeschlossene Destinationen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express versendet nicht in die folgenden Laender:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700 font-bold">
              <div>Algerien</div>
              <div>Kuba</div>
              <div>Iran</div>
              <div>Myanmar</div>
              <div>Nigeria</div>
              <div>Nordkorea</div>
              <div>Sudan</div>
              <div>Syrien</div>
              <div>Libyen</div>
              <div>Jemen</div>
              <div>Russland</div>
              <div>Belarus</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Zoll und Abgaben</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Der Kunde ist allein für die wahrheitsgemaesse Wertangabe der Pakete verantwortlich. Saemtliche Zollstrafen gehen zu Lasten des Kunden.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Zahlungsbedingungen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Zahlungen für Versandgebuehren müssen von Konten getaetigt werden, die auf denselben Namen wie das Kassongo-Konto laufen. Zweitkonten sind unzulaessig.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Nachnahme und beschädigte Sendungen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nachnahmesendungen sowie offensichtlich stark beschaedigte Ware werden vom Lager nicht angenommen und an den Absender zurueckgeschickt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Kontokuendigung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo behaelt sich das Recht vor, Ihren Zugang zu den Diensten jederzeit zu kuendigen, falls Sie gegen diese Vereinbarungen verstoessen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Paketkonsolidierung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Konsolidierung von Paketen wird angeboten. Ohne detaillierten Nachweis des urspruenglichen Wareneingangs haftet Kassongo nicht fuer Fehlmengen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Fehlerhafte Paketzustellung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Der Empfang eines falschen Pakets muss unverzueglich gemeldet werden. Bei ungerechtfertigtem Einbehalt fremder Ware wird das Konto gesperrt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Lagergebuehren und Eigentumsaufgabe</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pakete koennen maximal 90 Tage ab Wareneingang gelagert werden. Kostenfreie Fristen variieren je nach Tarif:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <ul className="space-y-2 text-gray-700 text-sm font-semibold">
              <li>Kostenloser Tarif: Gebühren fallen ab Tag 7 an</li>
              <li>Gold-Mitglieder: Gebühren fallen ab Tag 30 an</li>
              <li>Platinum-Mitglieder: Gebühren fallen ab Tag 45 an</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Pakete, die nach 90 Tagen nicht abgerufen wurden, gelten als aufgegeben. Kassongo darf diese entsorgen oder verwerten.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Reklamationen bei Verlust oder Beschaedigung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Erstattung erfolgt zum niedrigeren Wert aus deklariertem Zollwert und Kaufrechnung. Bei unberechtigten Anspruechen faellt eine Gebühr von 5.00 USD an.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Deklarierter Wert und Versicherung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jegliche Versicherungsleistungen richten sich nach dem vom Kunden bei der Erstellung des Versandauftrags angegebenen Wert, nicht nach dem tatsaechlichen Kaufpreis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Pfandrecht an Waren</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express steht wegen aller Forderungen aus Speditionsvertraegen ein Pfandrecht an den in seinem Besitz befindlichen Guetern des Kunden zu.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Haftungsbeschraenkung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Haftung von Kassongo Express betraegt maximal 100 USD pro Sendung, sofern keine zusaetzliche Transportversicherung abgeschlossen wurde.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">22. Freistellung durch den Kunden</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Der Kunde stellt Kassongo Express von saemtlichen Anspruechen Dritter frei, die sich aus den vom Kunden versendeten Waren ergeben.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">23. Hoehere Gewalt</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo ist von seinen Leistungspflichten befreit, wenn die Nichterfuellung auf hoehere Gewalt wie Naturkatastrophen, Streiks oder behoerdliche Verbote zurueckzufuehren ist.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">24. Antiterrorkonformitaet</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Der Kunde sichert zu, nicht auf internationalen Sanktionslisten oder Terrorfahndungslisten gefuehrt zu werden.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">25. Mitgliedschaften und Abonnements</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Monatsabonnements verlaengern sich automatisch bis zur Kuendigung. Keine Erstattung bei vorzeitiger Kuendigung waehrend der Abrechnungsperiode.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">26. Unbeanspruchte Pakete</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Eingehende Sendungen ohne zuordenbare Suite-Nummer müssen innerhalb von 30 Tagen reklamiert werden, andernfalls gelten sie als herrenlos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">27. Aenderungen der Bedingungen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express behaelt sich das Recht vor, diese AGB jederzeit und ohne vorherige Ankuendigung anzupassen.
          </p>
        </section>
      </div>
    </>
  );
}

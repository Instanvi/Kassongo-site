"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTranslation } from "../../lib/i18n/LanguageContext";

export default function PrivacyPolicyPage() {
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
                ? "Privacy Policy"
                : locale === "zh"
                ? "隐私政策"
                : locale === "de"
                ? "Datenschutzerklaerung"
                : "Politique de confidentialité"}
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
            {(locale === "en" || locale === "uk") && <EnglishPrivacy />}
            {locale === "fr" && <FrenchPrivacy />}
            {locale === "zh" && <ChinesePrivacy />}
            {locale === "de" && <GermanPrivacy />}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EnglishPrivacy() {
  return (
    <>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
        <h3 className="font-bold text-gray-900 mb-2">Our Commitment to Your Privacy</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          This privacy policy applies to kassongo.com and the Kassongo Express mobile application, owned and operated by Kassongo Express LLC. This policy describes how we collect and use the personal information you provide and the choices available to you regarding our use of your information.
        </p>
      </div>

      <div className="space-y-10">
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

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Marketing Communications & Choice/Opt-Out</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You may choose to stop receiving marketing communications at any time by following the unsubscribe instructions included in marketing emails, disabling marketing notifications in your account settings, or contacting us at privacy@kassongo.com.
          </p>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <strong>Note:</strong> Even if you opt out of marketing communications, we will continue to send you essential service-related notifications such as order confirmations, shipping updates, and account security alerts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We will share your personal information with third parties only in the ways described in this privacy policy. <strong>We do not sell your personal information to third parties.</strong> We share data with shipping carriers, payment processors, and customs brokers solely to fulfill your service requests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Login & Session Management</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you log in, we use browser or mobile application data caches to store information about your logged-in session so that you can remain logged in and experience faster service delivery.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you finalize and pay for a service order, your payment information is submitted directly to a payment service system (e.g., PayPal, Stripe) embedded in our website or mobile application, bypassing our servers entirely. No payment method information is stored on our servers except reference information for identifying your payment transaction on invoices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Tracking Technologies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use log files, cookies, web beacons, and pixels to compile aggregated statistics on how Kassongo Express is used, to resolve technical issues, and to secure our systems. Passwords are never stored in log files.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links & Social Media</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our website and mobile application include links to other websites whose privacy practices may differ from ours. Your interactions with those sites and social media widgets are governed by the privacy policies of the companies providing them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The security of your personal information is important to us. We follow industry standards to protect all information submitted to us, both during transmission and once we receive it, including encryption using SSL technology. No method of transmission or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights: Accessing, Updating & Correcting Personal Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You can review, update, or request deletion of your personal data by accessing your account dashboard or contacting us at privacy@kassongo.com. We will respond to your request within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Retention</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We will retain the information you provide for as long as needed to provide you services, comply with our legal obligations, resolve disputes, and enforce our agreements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Notification of Privacy Policy Changes</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this privacy policy to reflect changes to our information practices. If we make any material changes, we will notify you by email or by means of a notice on this website prior to the change becoming effective.
          </p>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Information</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>Email:</strong> privacy@kassongo.com</p>
            <p><strong>Customer Service:</strong> support@kassongo.com</p>
            <p><strong>Phone:</strong> +1 (234) 567-8900</p>
            <p><strong>Mail:</strong> Kassongo Express Privacy Office, 123 Freight Avenue, New York, NY 10001, United States</p>
          </div>
        </section>
      </div>
    </>
  );
}

function FrenchPrivacy() {
  return (
    <>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
        <h3 className="font-bold text-gray-900 mb-2">Notre engagement envers votre vie privée</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Cette politique de confidentialité s'applique à kassongo.com et à l'application mobile Kassongo Express, détenus et exploités par Kassongo Express LLC. Cette politique décrit la manière dont nous collectons, utilisons et protégeons les informations personnelles que vous nous fournissez.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte et utilisation des informations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nous collectons les informations personnelles suivantes afin de vous fournir nos services de transport et de réexpédition :
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Informations personnelles que nous collectons</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Coordonnées :</strong> nom, adresse e-mail, adresse postale, numéro de téléphone</li>
              <li><strong>Informations de facturation :</strong> numéro de carte bancaire, détails du mode de paiement</li>
              <li><strong>Identifiants uniques :</strong> nom d'utilisateur, mot de passe, informations d'identification</li>
              <li><strong>Informations d'expédition :</strong> détails des colis, déclarations en douane, données de suivi</li>
              <li><strong>Vérification d'identité :</strong> pièce d'identité officielle, documents justificatifs</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-900 mb-3">Comment nous utilisons vos informations</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Créer et gérer votre account pour accéder à nos services</li>
              <li>Traiter et expédier vos commandes et demandes d'expédition</li>
              <li>Vous envoyer des notifications de service, des suivis de colis et des factures</li>
              <li>Répondre à vos questions et demandes de support client</li>
              <li>Gérer le dédouanement et préparer les documents douaniers</li>
              <li>Vous envoyer des communications marketing et des alertes de service</li>
              <li>Respecter nos obligations légales et prévenir la fraude</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Communications marketing & désinscription</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vous pouvez choisir de ne plus recevoir de communications promotionnelles en suivant les instructions de désabonnement contenues dans les e-mails, en modifiant vos paramètres de compte ou en écrivant à privacy@kassongo.com.
          </p>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <strong>Remarque :</strong> Même si vous refusez les e-mails marketing, nous continuerons à vous envoyer les messages indispensables liés au service (confirmations de commande, statuts d'envoi et alertes de sécurité).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Partage des informations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nous partageons vos informations avec des tiers uniquement pour exécuter vos demandes d'expédition (transporteurs, processeurs de paiement, courtiers en douane). <strong>We do not sell your personal data to third parties.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Connexion & Session</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lorsque vous vous connectez, nous utilisons des cookies et des caches de données locaux pour stocker les informations de votre session active afin de fluidifier votre navigation et d'accélérer l'accès aux services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sécurité des paiements</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vos informations de paiement sont soumises directement à un système sécurisé tiers (ex. Stripe, PayPal). Aucune donnée de carte bancaire n'est stockée sur nos serveurs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Technologies de suivi</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nous utilisons des fichiers journaux (logs), cookies et balises pour analyser l'utilisation du site, résoudre les bugs techniques et assurer la sécurité du réseau. Les mots de passe ne sont jamais inscrits dans les journaux.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Liens tiers & Réseaux sociaux</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nos pages contiennent des liens vers d'autres sites. Vos interactions avec ces services tiers sont régies par les politiques de confidentialité respectives de ces entreprises.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Sécurité</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La sécurité de vos informations est primordiale. Nous mettons en œuvre des protocoles SSL et des normes de sécurité pour protéger les données transmises. Cependant, aucun stockage électronique n'est infaillible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Vos droits : Accès, modification et suppression</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vous pouvez à tout moment consulter, modifier ou demander la suppression de vos données personnelles via votre tableau de bord ou en contactant privacy@kassongo.com. Nous vous répondrons sous 30 jours.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Conservation des données</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nous conservons vos données aussi longtemps que nécessaire pour vous fournir nos services et pour nous conformer à nos obligations légales et fiscales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications de la politique de confidentialité</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express peut modifier cette politique. En cas de modification majeure, nous vous en informerons par e-mail ou via un avis visible sur notre site Web.
          </p>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Informations de contact</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>E-mail :</strong> privacy@kassongo.com</p>
            <p><strong>Service client :</strong> support@kassongo.com</p>
            <p><strong>Téléphone :</strong> +1 (234) 567-8900</p>
            <p><strong>Adresse :</strong> Kassongo Express Privacy Office, 123 Freight Avenue, New York, NY 10001, États-Unis</p>
          </div>
        </section>
      </div>
    </>
  );
}

function ChinesePrivacy() {
  return (
    <>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
        <h3 className="font-bold text-gray-900 mb-2">我们对您隐私的承诺</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          本隐私政策适用于由 Kassongo Express LLC 拥有和运营的 kassongo.com 网站及 Kassongo Express 移动应用程序。本政策详细说明了我们如何收集、使用和保护您提供的个人信息。
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 信息收集与使用</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            为了提供和优化我们的货运代理及包裹转运服务，我们收集以下类型的个人信息：
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-gray-900 mb-3">我们收集的个人信息</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>联络信息：</strong>姓名、电子邮箱地址、收货/邮寄地址、电话号码</li>
              <li><strong>账单信息：</strong>信用卡号、支付方式细节</li>
              <li><strong>唯一标识符：</strong>用户名、密码、账户凭证</li>
              <li><strong>货运信息：</strong>包裹详情、海关申报内容、物流追踪数据</li>
              <li><strong>身份验证信息：</strong>政府颁发的身份证件、身份核验材料</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-900 mb-3">我们如何使用您的信息</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>为您开设用于访问服务的账户</li>
              <li>履行您的转运订单及发货请求</li>
              <li>向您发送服务通知、物流状态更新和发票</li>
              <li>回应客户服务请求、咨询及售后保障</li>
              <li>办理海关清关与出入境报关单证</li>
              <li>向您发送产品服务更新及市场营销通讯</li>
              <li>遵守国家法律合规要求，防止账户欺诈</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 营销通讯与退订选择</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            您可以通过营销邮件底部的退订链接、关闭账户设置中的推送通知，或者给 privacy@kassongo.com 发送邮件来随时选择停止接收促销及营销信息。
          </p>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <strong>注意：</strong>即使您选择退订营销邮件，我们仍会继续发送与服务直接相关的必要通知，如订单确认、货运更新及账户安全警报。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 信息共享</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们仅会按照本隐私政策规定的方式与第三方共享您的数据（如承运商、支付通道、报关行），以满足您的运输需求。<strong>我们绝不会向任何第三方出售您的个人信息。</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 登录与会话管理</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当您登录账户时，我们使用浏览器或移动应用的本地数据缓存来存储您的登录状态，以便于提供快捷免登录会话并提升网页响应速度。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 支付安全保障</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当您完成订单付款时，您的支付信息会直接提交给嵌入我们网站或移动应用的独立第三方安全支付系统（如 Stripe 或 PayPal），绝不经过我们的服务器。我们的服务器不会存储任何信用卡卡号，仅保留用于对账和开票的支付交易流水号。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 物流追踪与日志技术</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们利用系统日志文件、Cookie 及像素标签来统计用户使用情况，排查系统故障，提升整体网络安全。登录密码绝不会记录在日志中。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 第三方链接与社交组件</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本站包含指向外部网站或社交平台分享组件的链接。您在这些外部网站上的行为受对应第三方公司隐私政策的约束，请仔细阅读。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 数据安全措施</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们极其重视您的个人数据安全。我们在数据传输和存储过程中采用业界认可的 SSL 加密及访问权限控制等标准。但鉴于网络传输的固有特性，没有任何一种电子存储方案是 100% 绝对安全的。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. 用户权利：查阅、修改及删除您的个人数据</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            您有权随时登录您的个人账户页面修改、更正或申请删除您的数据。您也可以向 privacy@kassongo.com 发送请求。我们将在 30 日内答复并协助办理。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. 数据保管时效</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们在为您提供服务、履行合规法定义务、解决法律争议以及执行服务协议所需的必要期限内，保留您的个人信息。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. 隐私政策的变更声明</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express 可能会适时更新本隐私政策。若发生重大条款变更，我们会在变更生效前通过网站公告或邮件方式通知您。
          </p>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">联络信息</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>电子邮箱：</strong> privacy@kassongo.com</p>
            <p><strong>客服邮箱：</strong> support@kassongo.com</p>
            <p><strong>通信地址：</strong> Kassongo Express Privacy Office, 123 Freight Avenue, New York, NY 10001, United States</p>
          </div>
        </section>
      </div>
    </>
  );
}

function GermanPrivacy() {
  return (
    <>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-5 rounded-r-lg mb-10">
        <h3 className="font-bold text-gray-900 mb-2">Unser Engagement fuer Ihren Datenschutz</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Diese Datenschutzerklaerung gilt fuer kassongo.com und die mobile Anwendung Kassongo Express, die sich im Besitz von Kassongo Express LLC befinden und von dieser betrieben werden. Diese Erklaerung beschreibt, wie wir personenbezogene Daten erfassen, nutzen und schuetzen.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Datenerfassung und Verwendung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wir erfassen die folgenden personenbezogenen Daten von Ihnen, um unsere Speditionsdienstleistungen zu erbringen und zu verbessern:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Von uns erfasste personenbezogene Daten</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Kontaktinformationen:</strong> Name, E-Mail-Adresse, Postanschrift, Telefonnummer</li>
              <li><strong>Zahlungsinformationen:</strong> Kreditkartennummer, Zahlungsdetails (Verarbeitung ueber Drittanbieter)</li>
              <li><strong>Eindeutige Identifikatoren:</strong> Benutzername, Passwort, Zugangsdaten</li>
              <li><strong>Versandinformationen:</strong> Paketdetails, Zollerklaerungen, Tracking-Daten</li>
              <li><strong>Identitaetsverifizierung:</strong> Regierungsdokumente zur Identitaetspruefung</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-900 mb-3">Wie wir Ihre Daten verwenden</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Bereitstellung Ihres Kontos fuer den Zugriff auf unsere Dienste</li>
              <li>Ausfuehrung Ihrer Dienstleistungsauftraege und Versandanfragen</li>
              <li>Zusendung von Servicebenachrichtigungen, Sendungsverfolgungen und Rechnungen</li>
              <li>Beantwortung von Kundenservice-Anfragen, Fragen und Anliegen</li>
              <li>Zollabfertigung und Speditionsdokumentation</li>
              <li>Zusendung von Serviceaktualisierungen und Marketingmitteilungen</li>
              <li>Einhaltung gesetzlicher Verpflichtungen und Betrugspraevention</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Marketing-Kommunikation und Abmeldung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sie koennen den Empfang von Marketing-E-Mails jederzeit beenden, indem Sie den Abmeldehinweisen in den E-Mails folgen, Marketingbenachrichtigungen in Ihren Kontoeinstellungen deaktivieren oder uns unter privacy@kassongo.com kontaktieren.
          </p>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <strong>Hinweis:</strong> Auch wenn Sie sich von der Marketing-Kommunikation abmelden, senden wir Ihnen weiterhin wichtige servicebezogene Benachrichtigungen wie Bestellbestaetigungen, Versand-Updates und Sicherheitswarnungen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Weitergabe von Informationen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wir geben Ihre personenbezogenen Daten nur an Dritte weiter, um Ihre Versandanfragen zu erfuellen (z.B. Transportunternehmen, Zahlungsabwickler, Zollmakler). <strong>Wir verkaufen Ihre personenbezogenen Daten nicht an Dritte.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Login und Sitzungsverwaltung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wenn Sie sich anmelden, verwenden wir Browser- oder Anwendungsdaten-Caches, um Informationen ueber Ihre Sitzung zu speichern, damit Sie angemeldet bleiben und eine schnellere Servicebereitstellung erhalten.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Zahlungssicherheit</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wenn Sie einen Dienstleistungsauftrag bezahlen, werden Ihre Zahlungsinformationen direkt an ein sicheres Zahlungssystem (z.B. PayPal, Stripe) uebermittelt, das in unsere Website oder App eingebunden ist. Es werden keine Zahlungsinformationen auf unseren Servern gespeichert.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Tracking-Technologien</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wir verwenden Logdateien, Cookies, Web-Beacons und Pixel, um Statistiken ueber die Nutzung von Kassongo Express zu erstellen, technische Probleme zu beheben und unsere Systeme zu sichern. Passwoerter werden niemals in Logdateien erfasst.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Links zu Drittanbietern und Social Media</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unsere Website und mobile Anwendung enthalten Links zu anderen Websites, deren Datenschutzpraktiken sich von unseren unterscheiden koennen. Ihre Interaktionen mit diesen Angeboten unterliegen den Datenschutzbestimmungen der jeweiligen Anbieter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Datensicherheit</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Sicherheit Ihrer personenbezogenen Daten ist uns wichtig. Wir folgen Branchenstandards zum Schutz der an uns uebermittelten Informationen, einschliesslich der SSL-Verschluesselung. Keine Uebertragungsmethode ueber das Internet ist zu 100 Prozent sicher, daher koennen wir keine absolute Sicherheit garantieren.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Ihre Rechte: Auskunft, Aktualisierung und Korrektur</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sie koennen Ihre personenbezogenen Daten jederzeit in Ihrem Dashboard einsehen, korrigieren oder deren Loeschung beantragen. Alternativ koennen Sie uns unter privacy@kassongo.com kontaktieren. Wir werden innerhalb von 30 Tagen auf Ihre Anfrage reagieren.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Datenspeicherung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wir speichern Ihre Daten so lange, wie es fuer die Erbringung der Dienstleistungen, die Einhaltung unserer gesetzlichen Verpflichtungen, die Beilegung von Streitigkeiten und die Durchsetzung unserer Vereinbarungen erforderlich ist.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Aenderungen der Datenschutzerklaerung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kassongo Express kann diese Datenschutzerklaerung anpassen. Bei wesentlichen Aenderungen benachrichtigen wir Sie per E-Mail oder ueber einen Hinweis auf unserer Website vor Inkrafttreten der Aenderungen.
          </p>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Kontaktinformationen</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>E-Mail:</strong> privacy@kassongo.com</p>
            <p><strong>Kundenservice:</strong> support@kassongo.com</p>
            <p><strong>Telefon:</strong> +1 (234) 567-8900</p>
            <p><strong>Adresse:</strong> Kassongo Express Privacy Office, 123 Freight Avenue, New York, NY 10001, Vereinigte Staaten</p>
          </div>
        </section>
      </div>
    </>
  );
}

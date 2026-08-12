import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactFormEmail from "../../../emails/ContactFormEmail";
import NewsletterSubscriptionEmail from "../../../emails/NewsletterSubscriptionEmail";
import CapitalApplicationEmail from "../../../emails/CapitalApplicationEmail";
import PartnerApplicationEmail from "../../../emails/PartnerApplicationEmail";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: "Missing required fields: type and data" },
        { status: 400 }
      );
    }

    let emailComponent;
    let subject = "";

    switch (type) {
      case "contact":
        subject = `New Contact Form Submission from ${data.name}`;
        emailComponent = ContactFormEmail({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        });
        break;

      case "newsletter":
        subject = `New Newsletter Subscription: ${data.contact}`;
        emailComponent = NewsletterSubscriptionEmail({
          contact: data.contact,
          type: data.type,
        });
        break;

      case "capital-application":
        subject = `New Capital Application from ${data.businessName}`;
        emailComponent = CapitalApplicationEmail({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          country: data.country,
          businessName: data.businessName,
          businessType: data.businessType,
          yearEstablished: data.yearEstablished,
          taxId: data.taxId,
          website: data.website,
          financingType: data.financingType,
          requestedAmount: data.requestedAmount,
          term: data.term,
          purpose: data.purpose,
          monthlyRevenue: data.monthlyRevenue,
          hasCollateral: data.hasCollateral,
          comments: data.comments,
          hasBusinessLicense: data.hasBusinessLicense,
          hasFinancialStatements: data.hasFinancialStatements,
          hasTradingHistory: data.hasTradingHistory,
        });
        break;

      case "partner-application":
        subject = `New Partner Application from ${data.companyName}`;
        emailComponent = PartnerApplicationEmail({
          firstName: data.firstName,
          lastName: data.lastName,
          companyEmail: data.companyEmail,
          companyName: data.companyName,
          website: data.website,
          country: data.country,
          partnerType: data.partnerType,
          usaShippingPercent: data.usaShippingPercent,
          referralSource: data.referralSource,
          message: data.message,
        });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }


    const { data: emailData, error } = await resend.emails.send({
      from: "Kassongo Mail <noreply@instanvi.com>",
      to: ["hi@instanvi.com"], 
      subject: subject,
      react: emailComponent,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        emailId: emailData?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

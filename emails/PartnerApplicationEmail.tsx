import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

interface PartnerApplicationEmailProps {
  firstName: string;
  lastName: string;
  companyEmail: string;
  companyName: string;
  website?: string;
  country: string;
  partnerType: string;
  usaShippingPercent: string;
  referralSource: string;
  message: string;
}

function formatPartnerType(type: string): string {
  const types: Record<string, string> = {
    aggregator: "Aggregator",
    shipper: "Shipper",
    carrier: "Carrier",
    "3pl": "3PL / Fulfillment",
    technology: "Technology Partner",
    other: "Other",
  };
  return types[type] || type;
}

function formatShippingPercent(percent: string): string {
  const ranges: Record<string, string> = {
    "0-25": "0-25%",
    "26-50": "26-50%",
    "51-75": "51-75%",
    "76-100": "76-100%",
    na: "Not Applicable",
  };
  return ranges[percent] || percent;
}

function formatReferralSource(source: string): string {
  const sources: Record<string, string> = {
    search: "Search Engine",
    social: "Social Media",
    referral: "Referral",
    event: "Event",
    email: "Email Marketing",
    other: "Other",
  };
  return sources[source] || source;
}

export default function PartnerApplicationEmail({
  firstName,
  lastName,
  companyEmail,
  companyName,
  website,
  country,
  partnerType,
  usaShippingPercent,
  referralSource,
  message,
}: PartnerApplicationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Partner Application</Heading>
            <Text style={headerSubtitle}>
              New partnership inquiry from Kassongo website
            </Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hello Kassongo Partnerships Team,</Text>
            <Text style={paragraph}>
              A new partner application has been submitted through the Plugins page. Please review the details below:
            </Text>

            {/* Contact Information */}
            <Section style={sectionBlock}>
              <Heading style={sectionHeading}>Contact Information</Heading>
              <Section style={infoBox}>
                <InfoRow label="Name" value={`${firstName} ${lastName}`} />
                <InfoRow label="Email" value={companyEmail} />
                <InfoRow label="Company" value={companyName} />
                {website && <InfoRow label="Website" value={website} />}
                <InfoRow label="Country" value={country} />
              </Section>
            </Section>

            {/* Partnership Details */}
            <Section style={sectionBlock}>
              <Heading style={sectionHeading}>Partnership Details</Heading>
              <Section style={infoBox}>
                <InfoRow label="Partner Type" value={formatPartnerType(partnerType)} />
                <InfoRow
                  label="USA Shipping Volume"
                  value={formatShippingPercent(usaShippingPercent)}
                />
                <InfoRow label="How They Found Us" value={formatReferralSource(referralSource)} />
              </Section>
            </Section>

            {/* Message */}
            <Section style={sectionBlock}>
              <Heading style={sectionHeading}>Message</Heading>
              <Section style={messageBox}>
                <Text style={messageText}>{message}</Text>
              </Section>
            </Section>

            <Hr style={divider} />

            <Text style={footer}>
              Please evaluate this partnership opportunity and respond within 3-5 business days.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              {new Date().getFullYear()} Kassongo. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <Text style={infoLabel}>{label}:</Text>
      <Text style={infoValue}>{value}</Text>
    </>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#14532d",
  padding: "32px 24px",
  textAlign: "center" as const,
};

const headerTitle = {
  color: "#fef08a",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
  padding: "0",
};

const headerSubtitle = {
  color: "#dcfce7",
  fontSize: "14px",
  margin: "0",
  fontWeight: "500",
};

const content = {
  padding: "32px 40px",
};

const greeting = {
  fontSize: "16px",
  lineHeight: "26px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "12px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#555",
  marginBottom: "24px",
};

const sectionBlock = {
  marginBottom: "28px",
};

const sectionHeading = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#14532d",
  marginBottom: "16px",
  marginTop: "0",
};

const infoBox = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
};

const infoLabel = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#15803d",
  marginBottom: "4px",
  marginTop: "12px",
};

const infoValue = {
  fontSize: "14px",
  color: "#333",
  marginTop: "0",
  marginBottom: "0",
};

const messageBox = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
};

const messageText = {
  fontSize: "14px",
  color: "#333",
  lineHeight: "22px",
  whiteSpace: "pre-wrap" as const,
  margin: "0",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const footer = {
  fontSize: "13px",
  color: "#6b7280",
  fontStyle: "italic" as const,
};

const footerSection = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  textAlign: "center" as const,
  borderTop: "1px solid #e5e7eb",
};

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0",
};

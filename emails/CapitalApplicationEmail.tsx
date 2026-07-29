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

interface CapitalApplicationEmailProps {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  // Business Details
  businessName: string;
  businessType: string;
  yearEstablished: string;
  taxId?: string;
  website?: string;
  // Financing Details
  financingType: string;
  requestedAmount: string;
  term: string;
  purpose: string;
  monthlyRevenue: string;
  hasCollateral?: string;
  comments?: string;
  // Documents
  hasBusinessLicense: boolean;
  hasFinancialStatements: boolean;
  hasTradingHistory: boolean;
}

// Helper functions to format values
function formatFinancingType(type: string): string {
  const types: Record<string, string> = {
    inventory: "Inventory Financing (Murabaha)",
    logistics: "Logistics Financing (Qard Hassan)",
    lease: "Equipment Lease (Ijarah)",
  };
  return types[type] || type;
}

function formatBusinessType(type: string): string {
  const types: Record<string, string> = {
    sole_proprietor: "Sole Proprietor",
    llc: "LLC",
    corporation: "Corporation",
    partnership: "Partnership",
    other: "Other",
  };
  return types[type] || type;
}

function formatRevenueRange(range: string): string {
  const ranges: Record<string, string> = {
    "0-10k": "$0 - $10,000",
    "10k-50k": "$10,000 - $50,000",
    "50k-100k": "$50,000 - $100,000",
    "100k-500k": "$100,000 - $500,000",
    "500k+": "$500,000+",
  };
  return ranges[range] || range;
}

export default function CapitalApplicationEmail({
  firstName,
  lastName,
  email,
  phone,
  country,
  businessName,
  businessType,
  yearEstablished,
  taxId,
  website,
  financingType,
  requestedAmount,
  term,
  purpose,
  monthlyRevenue,
  hasCollateral,
  comments,
  hasBusinessLicense,
  hasFinancialStatements,
  hasTradingHistory,
}: CapitalApplicationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Capital Application</Heading>
            <Text style={headerSubtitle}>
              New financing request from Kassongo website
            </Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hello Kassongo Capital Team,</Text>
            <Text style={paragraph}>
              A new financing application has been submitted. Please review the details below:
            </Text>

            {/* Personal Information */}
            <Section style={sectionBlock}>
              <Heading style={sectionHeading}>Personal Information</Heading>
              <Section style={infoBox}>
                <InfoRow label="Full Name" value={`${firstName} ${lastName}`} />
                <InfoRow label="Email" value={email} />
                <InfoRow label="Phone" value={phone} />
                <InfoRow label="Country" value={country} />
              </Section>
            </Section>

            {/* Business Details */}
            <Section style={sectionBlock}>
              <Heading style={sectionHeading}>Business Details</Heading>
              <Section style={infoBox}>
                <InfoRow label="Business Name" value={businessName} />
                <InfoRow label="Business Type" value={formatBusinessType(businessType)} />
                <InfoRow label="Year Established" value={yearEstablished} />
                {taxId && <InfoRow label="Tax ID" value={taxId} />}
                {website && <InfoRow label="Website" value={website} />}
              </Section>
            </Section>

            {/* Financing Details */}
            <Section style={sectionBlock}>
              <Heading style={sectionHeading}>Financing Details</Heading>
              <Section style={infoBox}>
                <InfoRow label="Financing Type" value={formatFinancingType(financingType)} />
                <InfoRow label="Requested Amount" value={`$${requestedAmount}`} />
                <InfoRow label="Term" value={`${term} Days`} />
                <InfoRow label="Monthly Revenue" value={formatRevenueRange(monthlyRevenue)} />
                {hasCollateral && (
                  <InfoRow
                    label="Has Collateral"
                    value={hasCollateral === "yes" ? "Yes" : "No"}
                  />
                )}
              </Section>
              <Text style={purposeLabel}>Purpose of Financing:</Text>
              <Text style={purposeValue}>{purpose}</Text>
              {comments && (
                <>
                  <Text style={purposeLabel}>Additional Comments:</Text>
                  <Text style={purposeValue}>{comments}</Text>
                </>
              )}
            </Section>

            {/* Documents */}
            <Section style={sectionBlock}>
              <Heading style={sectionHeading}>Documents Submitted</Heading>
              <Section style={infoBox}>
                <InfoRow
                  label="Business License"
                  value={hasBusinessLicense ? "Submitted" : "Not Submitted"}
                />
                <InfoRow
                  label="Financial Statements"
                  value={hasFinancialStatements ? "Submitted" : "Not Submitted"}
                />
                <InfoRow
                  label="Trading History"
                  value={hasTradingHistory ? "Submitted" : "Not Submitted"}
                />
              </Section>
            </Section>

            <Hr style={divider} />

            <Text style={footer}>
              Please review this application and contact the applicant within 48 hours.
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

const purposeLabel = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#15803d",
  marginTop: "16px",
  marginBottom: "8px",
};

const purposeValue = {
  fontSize: "14px",
  color: "#333",
  lineHeight: "22px",
  whiteSpace: "pre-wrap" as const,
  marginTop: "0",
  marginBottom: "0",
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

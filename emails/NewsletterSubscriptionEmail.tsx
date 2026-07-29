import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";

interface NewsletterSubscriptionEmailProps {
  contact: string;
  type: "email" | "phone";
}

export default function NewsletterSubscriptionEmail({
  contact,
  type,
}: NewsletterSubscriptionEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Newsletter Subscription</Heading>
            <Text style={headerSubtitle}>New subscriber from Kassongo website</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hello Kassongo Marketing Team,</Text>
            <Text style={paragraph}>
              A new user has subscribed to the Kassongo newsletter. Please review the details below:
            </Text>

            {/* Subscription Details */}
            <Section style={sectionBlock}>
              <Heading style={sectionHeading}>Subscription Details</Heading>
              <Section style={infoBox}>
                <InfoRow
                  label={type === "email" ? "Email Address" : "Phone Number"}
                  value={contact}
                />
                <InfoRow
                  label="Subscription Type"
                  value={type === "email" ? "Email Newsletter" : "SMS Updates"}
                />
                <InfoRow
                  label="Subscribed On"
                  value={new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              </Section>
            </Section>

            <Text style={footer}>
              Please add this subscriber to your mailing list and send a welcome message.
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

const footer = {
  fontSize: "13px",
  color: "#6b7280",
  fontStyle: "italic" as const,
  marginTop: "20px",
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

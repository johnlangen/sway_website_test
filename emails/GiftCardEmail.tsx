import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Img,
} from "@react-email/components";

export default function GiftCardEmail({
  code,
  amount,
  location,
  design,
  recipientName,
  title,
  message,
}: {
  code: string;
  amount: number;
  location: string;
  design: string;
  recipientName?: string;
  title?: string;
  message?: string;
}) {

  
  const designMap: Record<string, string> = {
    design1: "http://localhost:3000/assets/gc_design_1.png",
    design2: "https://swaywellnessspa.com/assets/gc_design_2.png",
    design3: "https://swaywellnessspa.com/assets/gc_design_3.png",
    design4: "https://swaywellnessspa.com/assets/gc_design_4.png",
  };
  
  const designImageUrl = designMap[design] || designMap["design1"];

  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f7f7f7",
          padding: "24px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #eee",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {/* Card Image */}
          <Img
            src={designImageUrl}
            alt="Gift Card Design"
            width="100%"
            style={{
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          />

          <Section style={{ marginBottom: "16px" }}>
            <Text
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              {title || "Your Sway Wellness Spa Gift Card"}
            </Text>

            {recipientName && (
              <Text style={{ textAlign: "center", fontSize: "16px" }}>
                For: <strong>{recipientName}</strong>
              </Text>
            )}

            {message && (
              <Text
                style={{
                  marginTop: "16px",
                  fontStyle: "italic",
                  textAlign: "center",
                  color: "#444",
                }}
              >
                “{message}”
              </Text>
            )}
          </Section>

          {/* Gift Card Box */}
          <Section
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "2px solid #1E4D2B",
              borderRadius: "12px",
              backgroundColor: "#fdfdfd",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontSize: "36px",
                fontWeight: "800",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              {code}
            </Text>

            <Text style={{ fontSize: "18px", marginBottom: "4px" }}>
              Amount: <strong>${amount}</strong>
            </Text>

            <Text style={{ fontSize: "16px", color: "#555" }}>
              Location: {location}
            </Text>
          </Section>

          <Text
            style={{
              marginTop: "28px",
              fontSize: "14px",
              textAlign: "center",
              color: "#666",
            }}
          >
            Present this code at checkout to redeem your gift card.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

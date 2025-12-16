import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Section,
  } from "@react-email/components";
  
  export default function BonusCardEmail({
    bonusCode,
    amount,
    location,
  }: {
    bonusCode: string;
    amount: number;
    location: string;
  }) {
    return (
      <Html>
        <Head />
        <Body style={{ fontFamily: "Arial, sans-serif", background: "#fafafa" }}>
          <Container
            style={{
              padding: "24px",
              background: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #eee",
            }}
          >
            <Section>
              <Text style={{ fontSize: "22px", fontWeight: "600" }}>
                Your Bonus $25 Gift Card
              </Text>
  
              <Text style={{ fontSize: "36px", fontWeight: "700", marginTop: 20 }}>
                {bonusCode}
              </Text>
  
              <Text style={{ fontSize: 18 }}>Amount: ${amount}</Text>
              <Text>Location: {location}</Text>
  
              <Text style={{ marginTop: 32, color: "#555" }}>
                This bonus card was included as part of your holiday promotion.
                Present this code at checkout.
                ---
                **Bonus Terms and Conditions:**  
                Valid only on purchases of $100 or more. Not redeemable for cash.  
                May not be combined with membership or any other offer.  
                Terms and conditions may change at any time.  
                Expires February 28, 2026.

              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
  
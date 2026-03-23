let cachedToken: {
    token: string;
    expiresAt: number;
  } | null = null;
  
  export async function getMindbodyStaffToken() {
    if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
      return cachedToken.token;
    }
  
    const res = await fetch(
      "https://api.mindbodyonline.com/public/v6/usertoken/issue",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": process.env.MINDBODY_API_KEY!,
          SiteId: process.env.MINDBODY_SITE_ID!,
        },
        body: JSON.stringify({
          Username: process.env.MINDBODY_STAFF_USER!,
          Password: process.env.MINDBODY_STAFF_PASS!,
        }),
      }
    );
  
    if (!res.ok) {
      cachedToken = null;
      console.error("Mindbody staff token fetch failed:", res.status, await res.text().catch(() => ""));
      throw new Error("Online booking is temporarily unavailable. Please call us at (303) 476-6150 to book your appointment.");
    }
  
    const data = await res.json();
  
    cachedToken = {
      token: data.AccessToken,
      expiresAt: new Date(data.Expires).getTime(),
    };
  
    return cachedToken.token;
  }
  
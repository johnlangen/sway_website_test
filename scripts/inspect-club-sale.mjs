// Read-only: inspect one club sale + its client to tell online/API sales from
// front-desk sales. Usage: node scripts/inspect-club-sale.mjs <siteId> <saleId> <clientId>
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const [siteId, saleId, clientId] = process.argv.slice(2);

const tr = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Api-Key": env.MINDBODY_API_KEY, SiteId: siteId },
  body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER2, Password: env.MINDBODY_STAFF_PASS2 }),
});
const token = (await tr.json()).AccessToken;
const H = { Accept: "application/json", "Api-Key": env.MINDBODY_API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` };

const su = new URL("https://api.mindbodyonline.com/public/v6/sale/sales");
su.searchParams.append("SaleId", saleId);
const sale = ((await (await fetch(su, { headers: H })).json())?.Sales ?? [])[0];
if (sale) {
  console.log("SALE", JSON.stringify({
    Id: sale.Id,
    SaleDateTime: sale.SaleDateTime,
    SalesRepId: sale.SalesRepId ?? null,
    LocationId: sale.LocationId,
    Payments: (sale.Payments ?? []).map((p) => ({ Type: p.Type, Amount: p.Amount, LastFour: p.LastFour })),
    Items: (sale.PurchasedItems ?? []).map((i) => ({ Desc: i.Description, Total: i.TotalAmount })),
  }, null, 2));
}

const cu = new URL("https://api.mindbodyonline.com/public/v6/client/clients");
cu.searchParams.set("request.clientIds", clientId);
const client = ((await (await fetch(cu, { headers: H })).json())?.Clients ?? [])[0];
if (client) {
  console.log("CLIENT", JSON.stringify({
    Id: client.Id,
    Name: `${client.FirstName} ${client.LastName}`,
    Email: client.Email,
    CreationDate: client.CreationDate,
    Status: client.Status,
  }, null, 2));
}

// Their contracts (should show the new Premier Remedy Lounge Membership)
const ccu = new URL("https://api.mindbodyonline.com/public/v6/client/clientcontracts");
ccu.searchParams.set("request.clientId", clientId);
const contracts = (await (await fetch(ccu, { headers: H })).json())?.Contracts ?? [];
console.log("CONTRACTS", JSON.stringify(contracts.map((c) => ({
  Name: c.ContractName ?? c.Name,
  AgreementDate: c.AgreementDate,
  StartDate: c.StartDate,
  IsActive: c.IsActive,
})), null, 2));

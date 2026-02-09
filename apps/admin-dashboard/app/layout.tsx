import "./globals.css";

export const metadata = {
  title: "PideDirecto | Admin Dashboard",
  description: "Operational command center for multi-tenant marketplaces."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

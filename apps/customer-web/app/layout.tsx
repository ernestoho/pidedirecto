import "./globals.css";

export const metadata = {
  title: "PideDirecto | Customer Web",
  description: "Customer storefront PWA for browsing restaurants and ordering."
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

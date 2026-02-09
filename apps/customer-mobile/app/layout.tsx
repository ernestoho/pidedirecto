import "./globals.css";

export const metadata = {
  title: "PideDirecto | Customer Mobile",
  description: "Mobile-first customer PWA experience."
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

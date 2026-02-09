import "./globals.css";

export const metadata = {
  title: "PideDirecto | Rider App",
  description: "Rider dispatch and delivery tracking experience."
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

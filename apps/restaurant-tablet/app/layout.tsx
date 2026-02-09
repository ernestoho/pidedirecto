import "./globals.css";

export const metadata = {
  title: "PideDirecto | Restaurant Tablet",
  description: "Restaurant order management and kitchen coordination."
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

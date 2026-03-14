import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  title: 'PetConnect',
  description: 'Conectando mascotas y veterinarios',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}

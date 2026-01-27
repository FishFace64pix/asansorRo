// Rebuild trigger
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AsansorTech România - Distribuitor Ascensoare',
  description: 'Lider în distribuția și instalarea de ascensoare în România, cu peste 15 ani de experiență. Instalare, mentenanță și modernizare ascensoare.',
  keywords: 'ascensoare, instalare ascensoare, mentenanță ascensoare, modernizare ascensoare, România',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${inter.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

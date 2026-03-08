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
  title: 'AsansorTech România - Instalare, Mentenanță și Modernizare Ascensoare',
  description: 'Lider în distribuția și instalarea de ascensoare în România. Oferim servicii profesionale de mentenanță lifturi, modernizare și instalare ascensoare în București, Cluj, Timișoara și în toată țara. Suport 24/7.',
  keywords: 'ascensoare, lifturi, instalare ascensoare romania, mentenanta lifturi bucuresti, modernizare ascensoare, service lifturi, pret ascensoare, lift persoane, lift marfa',
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

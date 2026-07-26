// app/layout.tsx
import React from 'react';
import './globals.css';
import { Metadata } from 'next';
import { AuthProvider } from '../components/AuthProvider';

export const metadata: Metadata = {
  title: {
    default: 'MedEdu Morocco — Plateforme Médicale Marocaine N°1',
    template: '%s | MedEdu Morocco'
  },
  description: 'La plateforme d\'apprentissage médicale la plus complète du Maroc. Cours S1-S12, Atlas Anatomique 3D WebGL, Annales des 6 Facultés de Médecine (FMPR, FMPC, FMPF, FMPM, FMPO, FMPT), QCMs interactifs, Cas Cliniques et IA FLAKKAI multilingue (Darija, Français, Arabe, Anglais).',
  keywords: ['médecine maroc', 'annales faculté médecine', 'QCM médecine', 'FMPR', 'FMPC', 'FMPF', 'résidanat maroc', 'anatomie 3D', 'cours médecine maroc'],
  authors: [{ name: 'MedEdu Morocco' }],
  openGraph: {
    title: 'MedEdu Morocco — Plateforme Médicale N°1 au Maroc',
    description: 'Cours complets S1-S12, Anatomie 3D WebGL, Annales de toutes les facultés de médecine du Maroc, QCMs et IA FLAKKAI.',
    type: 'website',
    locale: 'fr_MA',
    siteName: 'MedEdu Morocco',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedEdu Morocco',
    description: 'La plateforme médicale marocaine complète',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#0f172a] text-slate-100 min-h-screen antialiased selection:bg-teal-500 selection:text-slate-950 font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

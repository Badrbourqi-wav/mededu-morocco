// app/layout.tsx
import React from 'react';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MedEdu Morocco - Réforme des Études Médicales (PFE)',
  description: 'Plateforme officielle d apprentissage et de préparation au PFE pour les 12 semestres de médecine au Maroc.',
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
        {children}
      </body>
    </html>
  );
}

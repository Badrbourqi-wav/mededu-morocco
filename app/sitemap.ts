import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://mededu.me', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://mededu.me/dashboard', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://mededu.me/practice/random', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    // Add module pages for S1-S12
    ...Array.from({length: 12}, (_, i) => ({
      url: `https://mededu.me/modules/${i+1}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))
  ];
}

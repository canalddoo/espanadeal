import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://espanadeal.es';

  // 1. Tes pages statiques principales (basées sur tes dossiers)
  const staticPages = [
    '',          // Accueil
    '/panier',   // Ta page panier
    '/contact',  // Ta page contact
    '/vedette',  // Ta page vedette
    '/produits',  // Ta page vedette
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    // 2. Tes pages dynamiques pour chaque produit
    // On appelle ton API locale pour lister les produits
    const response = await fetch(`${baseUrl}/api/products`); // Ajuste l'URL de l'API si elle est différente
    const products = await response.json();

    const productPages = products.map((product: any) => ({
      url: `${baseUrl}/produits/${product.id}`, // Utilise le dossier /produits/
      lastModified: new Date(product.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...productPages];
  } catch (error) {
    // Si l'API des produits échoue, on renvoie au moins tes pages principales
    return staticPages;
  }
}
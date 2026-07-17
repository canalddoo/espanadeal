"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// Selección de los mejores productos reales de tu lista PRODUCTS_DATA
const FEATURED_PRODUCTS = [
  { 
    id: 10, 
    name: "Apple iPhone 16 (128 GB) - Cian + Funda Transparente con MagSafe", 
    price: 806, 
    category: "Dispositivos electrónicos", 
    image: "/img/iPhone16.jpg", 
    tag: "Favorito" 
  },
  { 
    id: 17, 
    name: "Sony, Consola PlayStation 5 Edición Estándar 1 TB con lector Blu-ray 4K, SSD Ultrarrápido, Audio 3D, Ray Tracing, 1 Mando DualSense con Retroalimentación Háptica", 
    price: 509.99, 
    category: "Dispositivos electrónicos", 
    image: "/img/SonyConsolePlayStation5.jpg", 
    tag: "Más Vendido" 
  },
  { 
    id: 24, 
    name: "Skechers Uno-Night Shades, Zapatillas", 
    price: 52.99, 
    category: "Deporte / Fitness", 
    image: "/img/SkechersUno-NightShades.jpg", 
    tag: "Popular" 
  },
  { 
    id: 32, 
    name: "JEANNE ARTHES - Perfume para Hombre Sexy Boy Intense - Eau de Parfum - Frasco Vaporizador de 100 ml", 
    price: 5.12, 
    category: "Belleza y cuidado personal", 
    image: "/img/JEANNEARTHES.jpg", 
    tag: "Tendencia" 
  },
  { 
    id: 36, 
    name: "Ninja Foodi FlexDrawer Freidora de Aire, Dual Zone Con Separador Extraíble", 
    price: 156, 
    category: "Cocina", 
    image: "/img/NinjaFoodiFlexDrawerAir.jpg", 
    tag: "Mejor Valoración" 
  },
  { 
    id: 42, 
    name: "URLIFE Bicicleta Eléctrica para Adultos, Neumáticos Anchos de 16\"", 
    price: 1299, 
    category: "Deporte / Fitness", 
    image: "/img/URLIFEVeloelectrique.jpg", 
    tag: "Oferta Especial" 
  },
  // Nouveaux produits ajoutés en plus :
  { 
    id: 39, 
    name: "iPhone 17 Pro Max", 
    price: 1199, 
    category: "Dispositivos electrónicos", 
    image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/09/apple-iphone-17-pro-max-frandroid-2025-768x768.png?webp=1&key=edb35fd1", 
    tag: "Nueva Generación" 
  },
  { 
    id: 13, 
    name: "Apple AirPods Pro 3 Auriculares Inalámbricos, Cancelación Activa de Ruido", 
    price: 150, 
    category: "Dispositivos electrónicos", 
    image: "/img/AppleAirPodsPro3.jpg", 
    tag: "Recomendado" 
  },
  { 
    id: 31, 
    name: "CeraVe Crema Hidratante para Rostro y Cuerpo, Hidratación 48H, Tecnología MVE + 3 Ceramidas + Ácido Hialurónico", 
    price: 16.25, 
    category: "Belleza y cuidado personal", 
    image: "/img/CeraVeBaume.jpg", 
    tag: "Top Calidad" 
  },
  { 
    id: 37, 
    name: "ECOVACS T50 Omni GEN2 Robot Aspirador con Estación, Potencia de 21000 Pa, Cepillo lateral y mopa", 
    price: 270, 
    category: "Hogar", 
    image: "/img/ECOVACST50OmniGEN2Aspirateur.jpg", 
    tag: "Alta Tecnología" 
  }
];
export default function FeaturedPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (product: typeof FEATURED_PRODUCTS[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  return (
    <div className="home-page-container">
      {/* Encabezado estilizado para la sección Destacados */}
      <div className="featured-hero">
        <span className="featured-subtitle">Exclusividades Espanadeal</span>
        <h1>Los Mejores Productos del Momento</h1>
        <p>Descubra nuestra selección exclusiva de productos más votados por nuestros clientes por su calidad y fiabilidad.</p>
      </div>

      {/* Grilla de productos */}
      <div className="products-grid">
        {FEATURED_PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            
            <div className="product-image-wrapper">
              {/* Badge Dinámico en la imagen */}
              <span className="featured-badge">{product.tag}</span>
              
              <img 
                src={product.image} 
                alt={product.name}
                className="product-img"
                loading="lazy"
              />
            </div>

            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price.toLocaleString()} €</p>
              
              <div className="product-card-actions">
                <button 
                  onClick={() => addToCart(product)} 
                  className="btn-add-cart"
                  title="Añadir al carrito"
                  type="button"
                >
                  <i className="fas fa-shopping-basket"></i> +
                </button>
                <button 
                  onClick={() => handleBuyNow(product)} 
                  className="btn-buy-now"
                  type="button"
                >
                  Comprar ahora
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
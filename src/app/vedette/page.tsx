"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// Selección de los mejores productos reales de tu lista PRODUCTS_DATA
const FEATURED_PRODUCTS = [
  // --- DISPOSITIVOS ELECTRÓNICOS Y GAMING ---
  { 
    id: 10, 
    name: "Apple iPhone 16 (128 GB) (Reacondicionado) - Cian + Funda Transparente con MagSafe", 
    price: 669.99, 
    category: "Dispositivos electrónicos", 
    image: "/img/iPhone16.jpg", 
    tag: "Favorito" 
  },
  { 
    id: 9, 
    name: "iPhone 15 Pro Max (Reacondicionado)", 
    price: 519.99, 
    category: "Dispositivos electrónicos", 
    image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-pro-max-768x768.png?webp=1&key=6d7ed62f", 
    tag: "Novedad" 
  },
  { 
    id: 4, 
    name: "iPhone 13 (Reacondicionado)", 
    price: 299.99, 
    category: "Dispositivos electrónicos", 
    image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-frandroid-2021-768x768.png?webp=1&key=a6b052d7", 
    tag: "Calidad / Precio" 
  },
  { 
    id: 17, 
    name: "Sony, Consola PlayStation 5 Edición Estándar 1 TB con lector Blu-ray 4K, SSD Ultrarrápido, Audio 3D", 
    price: 479.99, 
    category: "Dispositivos electrónicos", 
    image: "/img/SonyConsolePlayStation5.jpg", 
    tag: "Más Vendido" 
  },
  { 
    id: 19, 
    name: "Nintendo Switch (OLED) Consola de Juegos Portátil de 17,8 cm, 64 GB, Pantalla Táctil, WiFi, Blanco", 
    price: 199, 
    category: "Dispositivos electrónicos", 
    image: "/img/NintendoSwitch.jpg", 
    tag: "Popular" 
  },
  { 
    id: 13, 
    name: "Apple AirPods Pro 3 Auriculares Inalámbricos, Cancelación Activa de Ruido", 
    price: 149, 
    category: "Dispositivos electrónicos", 
    image: "/img/AppleAirPodsPro3.jpg", 
    tag: "Recomendado" 
  },
  { 
    id: 14, 
    name: "Sony WH-1000XM5SA Edición Especial con estuche blando, Cancelación Activa de Ruido, Bluetooth", 
    price: 209, 
    category: "Dispositivos electrónicos", 
    image: "/img/SonyWH-1000XM5SA.jpg", 
    tag: "Audio Premium" 
  },

  // --- DEPORTE & FITNESS ---
  { 
    id: 42, 
    name: "URLIFE Bicicleta Eléctrica para Adultos, Neumáticos Anchos de 16\"", 
    price: 1199, 
    category: "Deporte / Fitness", 
    image: "/img/URLIFEVeloelectrique.jpg", 
    tag: "Oferta Especial" 
  },
  { 
    id: 24, 
    name: "Skechers Uno-Night Shades, Zapatillas", 
    price: 54.99, 
    category: "Deporte / Fitness", 
    image: "/img/SkechersUno-NightShades.jpg", 
    tag: "Tendencia Moda" 
  },
  { 
    id: 27, 
    name: "Kit de Mancuernas Ajustables (20kg)", 
    price: 45, 
    category: "Deporte / Fitness", 
    image: "/img/Halteres-reglables.jpg", 
    tag: "Esencial Fitness" 
  },

  // --- COCINA & HOGAR ---
  { 
    id: 36, 
    name: "Ninja Foodi FlexDrawer Freidora de Aire, Dual Zone Con Separador Extraíble", 
    price: 149, 
    category: "Cocina", 
    image: "/img/NinjaFoodiFlexDrawerAir.jpg", 
    tag: "Mejor Valoración" 
  },
  { 
    id: 37, 
    name: "ECOVACS T50 Omni GEN2 Robot Aspirador con Estación, Potencia de 21000 Pa", 
    price: 269, 
    category: "Hogar", 
    image: "/img/ECOVACST50OmniGEN2Aspirateur.jpg", 
    tag: "Alta Tecnología" 
  },
  { 
    id: 57, 
    name: "DREAME H15 Pro CarpetFlex aspiradora inalámbrica con mopa, aspiradora húmeda y seca", 
    price: 359, 
    category: "Hogar", 
    image: "/img/DREAMEH15Pro.jpg", 
    tag: "Top Limpieza" 
  },

  // --- BELLEZA Y CUIDADO PERSONAL ---
  { 
    id: 31, 
    name: "CeraVe Crema Hidratante para Rostro y Cuerpo, Hidratación 48H", 
    price: 16.99, 
    category: "Belleza y cuidado personal", 
    image: "/img/CeraVeBaume.jpg", 
    tag: "Top Calidad" 
  },
  { 
    id: 32, 
    name: "JEANNE ARTHES - Perfume para Hombre Sexy Boy Intense - Eau de Parfum - 100 ml", 
    price: 5.99, 
    category: "Belleza y cuidado personal", 
    image: "/img/JEANNEARTHES.jpg", 
    tag: "Tendencia" 
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
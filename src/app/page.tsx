"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import { Suspense, useState, useEffect } from "react";


const PRODUCTS_DATA = [
  // ==========================================
  // DISPOSITIVOS ELECTRÓNICOS (15 Produits)
  // ==========================================
  { id: 1, name: "iPhone 11", price: 76.95, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/www.frandroid.com/wp-content/uploads/2019/08/apple-iphone-11-frandroid-2019.png?webp=1&resize=580,580&key=fcb2a39b" },
  { id: 2, name: "iPhone 12", price: 155, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2020/10/iphone-12-frandroid-2020-768x768.png?webp=1&resize=580,580&key=1b5d60de" },
  { id: 3, name: "iPhone 12 Pro", price: 479, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2020/10/iphone-12-max-frandroid-2020-768x768.png?webp=1&resize=580,580&key=85d800ac" },
  { id: 4, name: "iPhone 13", price: 499, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-frandroid-2021-768x768.png?webp=1&resize=580,580&key=a6b052d7" },
  { id: 5, name: "iPhone 13 Pro Max", price: 349, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-pro-max-frandroid-2021-768x768.png?webp=1&key=33af98cc" },
  { id: 7, name: "iPhone 14 Pro", price: 699, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2022/09/iphone-14-pro-max-officiel-frandroid-2022-768x768.png?webp=1&key=1e26da76" },
  { id: 8, name: "iPhone 15", price: 749, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-768x768.png?webp=1&key=62513184" },
  { id: 9, name: "iPhone 15 Pro Max", price: 620, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-pro-max-768x768.png?webp=1&key=6d7ed62f" },
  { id: 10, name: "Apple iPhone 16 (128 GB) - Cian + Funda Transparente con MagSafe", price: 806, category: "Dispositivos electrónicos", image: "/img/iPhone16.jpg" },
  { id: 11, name: "iPhone 16 Pro Max", price: 817.40, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2024/08/apple-iphone-16-pro-max-frandroid-2024-hd-768x768.png?webp=1&key=ce4d50e3" },
  { id: 12, name: "iPhone 17 Pro", price: 1099, category: "Dispositivos electrónicos", image: "https://www.apple.com/v/iphone-17-pro/d/images/overview/contrast/iphone_17_pro__dwccrdina7qu_large.jpg" },
  { id: 39, name: "iPhone 17 Pro Max", price: 1199, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/09/apple-iphone-17-pro-max-frandroid-2025-768x768.png?webp=1&key=edb35fd1" },
  { id: 13, name: "Apple AirPods Pro 3 Auriculares Inalámbricos, Cancelación Activa de Ruido", price: 150, category: "Dispositivos electrónicos", image: "/img/AppleAirPodsPro3.jpg" },
  { id: 14, name: "Sony WH-1000XM5SA Edición Especial con estuche blando, Cancelación Activa de Ruido, Bluetooth", price: 209, category: "Dispositivos electrónicos", image: "/img/SonyWH-1000XM5SA.jpg" },
  { id: 17, name: "Sony, Consola PlayStation 5 Edición Estándar 1 TB con lector Blu-ray 4K, SSD Ultrarrápido, Audio 3D", price: 509.99, category: "Dispositivos electrónicos", image: "/img/SonyConsolePlayStation5.jpg" },

  // ==========================================
  // SPORT / FITNESS (8 Produits)
  // ==========================================
  { id: 20, name: "PUMA Tazon 6 Fracture FM, Zapatillas para Hombre", price: 34.99, category: "Deporte / Fitness", image: "/img/PUMATazon6FractureFM.jpg" },
  { id: 21, name: "Puma Smash V2 L Zapatillas Unisex", price: 24.99, category: "Deporte / Fitness", image: "/img/PumaSmashV2LBasketsMixte.jpg" },
  { id: 22, name: "Adidas Unisex Zapatillas VS Pace 2.0", price: 32, category: "Deporte / Fitness", image: "/img/adidasUnisexChaussure.jpg" },
  { id: 23, name: "Skechers Uno Stand on Air Zapatillas", price: 48, category: "Deporte / Fitness", image: "/img/SkechersUnoStandonAir.jpg" },
  { id: 24, name: "Skechers Uno-Night Shades, Zapatillas", price: 52.99, category: "Deporte / Fitness", image: "/img/SkechersUno-NightShades.jpg" },
  { id: 42, name: "URLIFE Bicicleta Eléctrica para Adultos, Neumáticos Anchos de 16\"", price: 1299, category: "Deporte / Fitness", image: "/img/URLIFEVeloelectrique.jpg" },
  { id: 49, name: "FabricBike Aero - Bicicleta de Piñón Fijo, Fixie Completa de Una Sola Velocidad, Cuadro de Aluminio", price: 599.99, category: "Sport/ Fitness", image: "/img/FabricBikeAero.jpg" },
  { id: 51, name: "UrbanLuxe Colchoneta de Gimnasia Inflable Air Tumble Track para Volteretas y Acrobacias", price: 90, category: "Deporte / Fitness", image: "/img/TapisdeGymnastique.jpg" },

  // ==========================================
  // BEAUTÉ ET SOIN (3 Produits)
  // ==========================================
  { id: 30, name: "MIXA - Sérum Booster de Hidratación Intensa 24H - Rellena e Ilumina", price: 6.99, category: "Beauté et soin", image: "/img/MIXASérumBooste.jpg" },
  { id: 31, name: "CeraVe Crema Hidratante para Rostro y Cuerpo, Hidratación 48H, Tecnología MVE + 3 Ceramidas", price: 16.25, category: "Belleza y cuidado", image: "/img/CeraVeBaume.jpg" },
  { id: 32, name: "JEANNE ARTHES - Perfume para Hombre Sexy Boy Intense - Eau de Parfum - Frasco de 100 ml", price: 5.12, category: "Belleza y cuidado", image: "/img/JEANNEARTHES.jpg" },



{ id: 58, name: "Electric Treadmills for Home Exercising, 0.6-10MPH Portable Treadmills for Home Small Spaces, 3.5HP Mini Treadmills with Handles", price: 120, category: "Dispositivos electrónicos", image: "/img/ElectricTreadmills.jpg" },
  { id: 59, name: "MOZA R3 Racing Wheel and Pedals Bundle for PC, 3.9Nm Direct Drive WheelBase,11-inch ES Lite Steering Wheel,Pedals and Desk Clamp High-Performance Game", price: 210.99, category: "Dispositivos electrónicos", image: "/img/MOZAR3Racing.jpg" },
  { id: 60, name: "DREAME H15 Pro CarpetFlex aspiradora inalámbrica con mopa, aspiradora húmeda y seca con cepillos duales para pisos duros y alfombras, sin enredos", price: 349, category: "Dispositivos electrónicos", image: "/img/DREAMEH15Pro.jpg" },

  // ==========================================
  // CUISINE & MAISON (3 Produits)
  // ==========================================
  { id: 36, name: "Ninja Foodi FlexDrawer Freidora de Aire, Dual Zone Con Separador Extraíble", price: 156, category: "Cuisine", image: "/img/NinjaFoodiFlexDrawerAir.jpg" },
  { id: 37, name: "ECOVACS T50 Omni GEN2 Robot Aspirador con Estación, Potencia de 21000 Pa, Cepillo lateral y mopa", price: 270, category: "Hogar", image: "/img/ECOVACST50OmniGEN2Aspirateur.jpg" },
  { id: 48, name: "GASLAND GIH604BF Placa Mixta de Gas e Inducción 60 cm, Gas 5200 W con quemador wok, Cristal negro", price: 350, category: "Cocina", image: "/img/GASLANDGIH604BF.jpg" }
];

export function HomePageContent() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Recuperación de los filtros desde la URL
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryQuery = searchParams.get("cat") || "";

  // =========================================================================
  // AJOUT ICI : État et effet pour mélanger les produits aléatoirement
  // =========================================================================
  const [shuffledProducts, setShuffledProducts] = useState<typeof PRODUCTS_DATA>([]);

  useEffect(() => {
    // Cet appel s'exécute automatiquement dès qu'un utilisateur charge le site
    fetch("/api/visits", { method: "POST" })
      .then((res) => {
        if (!res.ok) console.error("Erreur d'enregistrement de la visite");
      })
      .catch((err) => console.error("Erreur réseau pour l'API visite :", err));
  }, []); // Le tableau vide [] fait en sorte que ça ne se déclenche qu'UNE fois par visite
  // =======

  useEffect(() => {
    // Algorithme de mélange de Fisher-Yates
    const mixProducts = [...PRODUCTS_DATA];
    for (let i = mixProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixProducts[i], mixProducts[j]] = [mixProducts[j], mixProducts[i]];
    }
    setShuffledProducts(mixProducts);
  }, []); // S'exécute une seule fois à l'arrivée sur le site
  // =========================================================================

  // 2. Traducción de los slugs de URL
  const categoryMapping: { [key: string]: string } = {
    electronique: "Dispositivos electrónicos",
    beaute: "Belleza y cuidado personal",
    maison: "Hogar",
    cuisine: "Cocina",
    sport: "Deporte / Fitness"
  };
  const targetCategory = categoryMapping[categoryQuery] || "";

  // 3. Filtrado dinámico (Modifié pour utiliser "shuffledProducts" au lieu de "PRODUCTS_DATA")
  const filteredProducts = shuffledProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    
    const cleanProductCat = product.category.replace(/\s+/g, '').toLowerCase();
    const cleanTargetCat = targetCategory.replace(/\s+/g, '').toLowerCase();
    
    const matchesCategory = targetCategory ? cleanProductCat === cleanTargetCat : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleBuyNow = (product: typeof PRODUCTS_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  return (
    <main>
      {/* El Hero y las ventajas solo se muestran si el usuario no está filtrando */}
      {!searchQuery && !categoryQuery && (
        <div>
          <Hero />
            
          <div className="features-section">
            <div className="features-container">
              
              {/* Tarjeta 1: Calidad */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-shipping">
                  <i className="fas fa-award"></i>
                </div>
                <h3>Calidad Garantizada</h3>
                <p>Productos 100% auténticos y seleccionados con total cuidado</p>
              </div>

              {/* Tarjeta 2: Pago */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-security">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Pago Seguro</h3>
                <p>Transacciones 100% protegidas y cifradas de forma segura</p>
              </div>

              {/* Tarjeta 3: Soporte */}
              <div className="feature-card"> 
                <div className="feature-icon-wrapper icon-support">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Soporte 24/7</h3>
                <p>Asistencia disponible y atenta en cualquier momento</p>
              </div>

              {/* Tarjeta 4: Retirada */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-guarantee">
                  <i className="fas fa-store"></i>
                </div>
                <h3>Recogida Rápida</h3>
                <p>Recoja sus artículos directamente en tienda y ahorre tiempo</p>
              </div>

            </div>
          </div>
        </div>
      )}

      <div className="home-page-container">
        <div className="featured-hero">
          <span className="featured-subtitle">Ofertas Exclusivas Espanadeal</span>
          <h1>
            {searchQuery || categoryQuery 
              ? `Resultados de su búsqueda (${filteredProducts.length})` 
              : "Descubra nuestros artículos destacados del momento"}
          </h1>
          
          {/* Botón para restablecer los filtros */}
          {(searchQuery || categoryQuery) && (
            <button 
              onClick={() => router.push("/")}
              style={{ marginTop: "15px", padding: "8px 16px", backgroundColor: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
            >
              Ver todos los productos
            </button>
          )}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
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
                      Tramitar pedido
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#636366" }}>
            <i className="fas fa-search" style={{ fontSize: "30px", marginBottom: "15px", display: "block" }}></i>
            Ningún producto coincide con sus criterios de búsqueda.
          </div>
        )}
      </div>

         {filteredProducts.length > 0 && (
  <div style={{ textAlign: "center", marginTop: "40px" }}>
    <button 
      onClick={() => router.push("/produits")}
      className="btn-see-more"
      type="button"
    >
      Ver más <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
    </button>
  </div>
)}

    </main>
  );
}

// Next.js requiere envolver useSearchParams en Suspense durante la compilación en producción
export default function HomePage() {
  return (
    <Suspense fallback={<div style={{textAlign:"center", }}>Cargando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
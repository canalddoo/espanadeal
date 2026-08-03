"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import { Suspense, useState, useEffect } from "react";
import ContactPage from "./contact/page";


const PRODUCTS_DATA = [
  
  
  { id: 3, name: "iPhone 12 Pro (Reacondicionado)", price: 199.99, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2020/10/iphone-12-max-frandroid-2020-768x768.png?webp=1&resize=580,580&key=85d800ac" },
  { id: 4, name: "iPhone 13 (Reacondicionado)", price: 299.99, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-frandroid-2021-768x768.png?webp=1&resize=580,580&key=a6b052d7" },
  { id: 5, name: "iPhone 13 Pro Max (Reacondicionado)", price: 329.99, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-pro-max-frandroid-2021-768x768.png?webp=1&key=33af98cc" },
  { id: 7, name: "iPhone 14 Pro (Reacondicionado)", price: 419.99, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2022/09/iphone-14-pro-max-officiel-frandroid-2022-768x768.png?webp=1&key=1e26da76" },
  { id: 8, name: "iPhone 15 (Reacondicionado)", price: 459.99, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-768x768.png?webp=1&key=62513184" },
  { id: 9, name: "iPhone 15 Pro Max (Reacondicionado)", price: 519.99, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-pro-max-768x768.png?webp=1&key=6d7ed62f" },
  { id: 10, name: "Apple iPhone 16 (128 GB) (Reacondicionado) - Cian + Funda Transparente con MagSafe", price: 669.99, category: "Dispositivos electrónicos", image: "/img/iPhone16.jpg" },
  { id: 11, name: "iPhone 16 Pro Max (Reacondicionado)", price: 689.99, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2024/08/apple-iphone-16-pro-max-frandroid-2024-hd-768x768.png?webp=1&key=ce4d50e3" },
  
  { id: 13, name: "Apple AirPods Pro 3 Auriculares Inalámbricos, Cancelación Activa de Ruido", price: 149, category: "Dispositivos electrónicos", image: "/img/AppleAirPodsPro3.jpg" },
  { id: 14, name: "Sony WH-1000XM5SA Edición Especial con estuche blando, Cancelación Activa de Ruido, Bluetooth, calidad de llamada clara", price: 209, category: "Dispositivos electrónicos", image: "/img/SonyWH-1000XM5SA.jpg" },
  { id: 15, name: "Apple Watch Series 9 (GPS + Cellular, 45 MM) Caja de Aluminio Blanco Estrella con Correa Deportiva Blanco Estrella, M/L (Reacondicionado)", price: 369, category: "Dispositivos electrónicos", image: "/img/AppleWatchSeries9.jpg" },
  { id: 16, name: "CUKTECH Cargador USB C 100W, 3 Puertos GaN III Tech y PPS PD3.0 Cargador Rápido, Cargador 100W USB C Rápido", price: 34.99, category: "Dispositivos electrónicos", image: "/img/CUKTECHChargeurUSBC.jpg" },
 { id: 46, name: "Soundcore Space One Auricules de Diadema Bluetooth Inalámbricos con Cancelación Activa de Ruido Adaptativa de Anker", price: 19.99, category: "Dispositivos electrónicos", image: "/img/SoundcoreSpaceOneCasque.jpg" },
  { id: 47, name: "COROS Pace 4 Reloj Deportivo Ultraligero con Sensor de Frecuencia Cardíaca", price: 319, category: "Dispositivos electrónicos", image: "/img/COROSPace4Montre.jpg" },
  { id: 61, name: "Cámara de videoconferencia todo en uno de 360° KanDao Meeting Pro, HD 1080p con micrófonos omnidireccionales, enfoque y zoom automáticos", price: 619, category: "Dispositivos electrónicos", image: "/img/KanDaoMeeting.jpg" },
  { id: 63, name: "DJI Osmo Pocket 4 Essential Bundle, cámara de vlogging de bolsillo con gimbal | Sensor CMOS de 1 pulgada y 4K/240 fps, estabilización de 3 ejes", price: 469, category: "Dispositivos electrónicos", image: "/img/BundleEssentielDJIOsmoPocket4.jpg" },
  { id: 17, name: "Sony, Consola PlayStation 5 Edición Estándar 1 TB con lector Blu-ray 4K, SSD Ultrarrápido, Audio 3D", price: 479.99, category: "Dispositivos electrónicos", image: "/img/SonyConsolePlayStation5.jpg" },
  { id: 18, name: "Playstation Sony, Reproductor a Distancia Portal 5, Pantalla LCD Full HD de 8\", Juegos en Streaming vía Wi-Fi", price: 209, category: "Dispositivos electrónicos", image: "/img/PlaystationSonyLecteur.jpg" },
  { id: 19, name: "Nintendo Switch (OLED) Consola de Juegos Portátil de 17,8 cm, 64 GB, Pantalla Táctil, WiFi, Blanco", price: 199, category: "Dispositivos electrónicos", image: "/img/NintendoSwitch.jpg" },

  // ==========================================
  // DEPORTE / FITNESS (14 Productos)
  // ==========================================
  { id: 23, name: "Skechers Uno Stand on Air Zapatillas", price: 49, category: "Deporte / Fitness", image: "/img/SkechersUnoStandonAir.jpg" },
  { id: 24, name: "Skechers Uno-Night Shades, Zapatillas", price: 54.99, category: "Deporte / Fitness", image: "/img/SkechersUno-NightShades.jpg" },
  { id: 27, name: "Kit de Mancuernas Ajustables (20kg)", price: 45, category: "Deporte / Fitness", image: "/img/Halteres-reglables.jpg" },
  { id: 42, name: "URLIFE Bicicleta Eléctrica para Adultos, Neumáticos Anchos de 16\"", price: 1199, category: "Deporte / Fitness", image: "/img/URLIFEVeloelectrique.jpg" },
  { id: 43, name: "ZIPRO Bicicleta Estática para Adulto con Resistencia Magnética de 8 Niveles, Pantalla LCD", price: 109, category: "Deporte / Fitness", image: "/img/ZIPROVelo.jpg" },
  { id: 49, name: "FabricBike Aero - Bicicleta de Piñón Fijo, Fixie Completa de Una Sola Velocidad, Cuadro de Aluminio", price: 549.99, category: "Deporte / Fitness", image: "/img/FabricBikeAero.jpg" },
  { id: 50, name: "Dskeuzeew Bicicleta Estática Profesional para Gimnasio con Pantalla LCD y Portavasos", price: 239, category: "Deporte / Fitness", image: "/img/DskeuzeewVélo.jpg" },
  { id: 52, name: "PROIRON Tapis de Yoga Epais 10MM/15MM,Antidérapant Tapis d'exercice Fitness", price: 22.99, category: "Deporte / Fitness", image: "/img/PROIRONTapis.jpg" },
  { id: 53, name: "Amazon Basics Slam Medicine Balls for Exercise", price: 18.99, category: "Deporte / Fitness", image: "/img/AmazonBasics.jpg" },
  { id: 54, name: "QIANBAIYI Support d'haltères, à 3 positions, peu encombrant, pour la salle de gym à la maison et la salle de sport, organisateur pour haltères", price: 85, category: "Deporte / Fitness", image: "/img/QIANBAIYISupport.jpg" },

  // BELLEZA Y CUIDADO PERSONAL (3 Productos)
  // ==========================================
  { id: 30, name: "MIXA - Sérum Booster de Hidratación Intensa 24H - Rellena e Ilumina", price: 7.99, category: "Belleza y cuidado personal", image: "/img/MIXASérumBooste.jpg" },
  { id: 31, name: "CeraVe Crema Hidratante para Rostro y Cuerpo, Hidratación 48H", price: 16.99, category: "Belleza y cuidado personal", image: "/img/CeraVeBaume.jpg" },
  { id: 32, name: "JEANNE ARTHES - Perfume para Hombre Sexy Boy Intense - Eau de Parfum - 100 ml", price: 5.99, category: "Belleza y cuidado personal", image: "/img/JEANNEARTHES.jpg" },

 { id: 48, name: "GASLAND GIH604BF Placa Mixta de Gas e Inducción 60 cm, Gas 5200 W con quemador wok", price: 339, category: "Cocina", image: "/img/GASLANDGIH604BF.jpg" },
  { id: 55, name: "Bissell PowerClean FurGuard 280W Aspiradora inalámbrica que se mantiene en pie con cepillo autolimpiante, succión fuerte, battery extraíble", price: 219.99, category: "Hogar", image: "/img/BissellPowerClean.jpg" },
  { id: 57, name: "DREAME H15 Pro CarpetFlex aspiradora inalámbrica con mopa, aspiradora húmeda y seca con cepillos duales para pisos duros y alfombras", price: 359, category: "Hogar", image: "/img/DREAMEH15Pro.jpg" }


];

export function HomePageContent() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Recuperación de los filtros desde la URL
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryQuery = searchParams.get("cat") || "";

 
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


<ContactPage />

    </main>
  );
}


export default function HomePage() {
  return (
    <Suspense fallback={<div style={{textAlign:"center", }}>Cargando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
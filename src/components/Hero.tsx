"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES_DATA = [
  {
    id: 1,
    title: "Dispositivos Electrónicos: iPhone, PS5 y Accesorios High-Tech",
    subtitle: "Tecnología y Gaming",
    description: "Equípate con lo mejor de la tecnología. Encuentra el iPhone, la PlayStation 5, la Nintendo Switch y nuestros auriculares Bluetooth con entrega rápida en España.",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1000&auto=format&fit=crop&q=80",
    btnText: "Ver High-Tech",
    link: "/productos?cat=electronique"
  },
  { 
    id: 2,
    title: "Deporte y Fitness: Alcanza tus objetivos en casa",
    subtitle: "Rendimiento y Salud",
    description: "Quema calorías con nuestras bicicletas de spinning, bicicletas eléctricas, mancuernas, relojes inteligentes y un equipamiento completo de gimnasio en casa.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80",
    btnText: "Descubrir el universo Deporte",
    link: "/productos?cat=sport"
  },
  {
    id: 3,
    title: "Moda y Sneakers: Camina con estilo todos los días",
    subtitle: "Tendencias Urbanas",
    description: "Marca la diferencia con nuestra selección exclusiva de Sneakers Nike, Jordan y New Balance auténticas y cómodas.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80",
    btnText: "Comprar mis Sneakers",
    link: "/productos?cat=mode"
  },
  {
    id: 4,
    title: "Belleza y Hogar: Cuida de ti y de tu entorno",
    subtitle: "Bienestar y Confort",
    description: "Mejora tu rutina con nuestros perfumes y productos de skincare / capilares, mientras simplificas tu día a día con la freidora de aire y nuestros robots aspiradores.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1000&auto=format&fit=crop&q=80",
    btnText: "Explorar la selección",
    link: "/productos?cat=beaute"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section-container">
      
      {/* SLIDER DINÁMICO */}
      <div className="hero-slider-left">
        {SLIDES_DATA.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "slide-active" : ""}`}
          >
            <img src={slide.image} alt={slide.title} className="slide-bg-img" />
            <div className="slide-overlay"></div>

            <div className="slide-content">
              <span className="slide-tag">{slide.subtitle}</span>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-desc">{slide.description}</p>
              <Link href={slide.link} className="btn-hero-action">
                {slide.btnText}
              </Link>
            </div>
          </div>
        ))}

        <div className="slider-dots">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot-indicator ${index === currentSlide ? "dot-active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* BANNERS ESTÁTICOS */}
      <div className="hero-banners-right">
  
        {/* Banner Superior */}
        <div className="right-banner-card text-light">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80" 
            alt="Sneakers de Tendencia" 
            className="banner-bg-img" 
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag text-red">Moda</span>
            <h3>Sneakers de Tendencia: Nike, Jordan y New Balance</h3>
            <p>Encuentra los mejores estilos de zapatillas en Espana Deal.</p>
            <Link href="/productos?cat=mode" className="btn-banner-small">
              Comprar
            </Link>
          </div>
        </div>

        {/* Banner Inferior */}
        <div className="right-banner-card text-light">
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" 
            alt="Auriculares y Relojes Inteligentes" 
            className="banner-bg-img" 
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag text-green">High-Tech</span>
            <h3>Smart Accessories & Audio</h3>
            <p>Disfruta de la mejor calidad de sonido y conectividad al mejor precio.</p>
            <Link href="/productos?cat=electronique" className="btn-banner-small">
              Comprar
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
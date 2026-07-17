"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");          // ESTATO PARA EL TEXTO DE BÚSQUEDA
  const [searchCat, setSearchCat] = useState("");          // ESTATO PARA LA CATEGORÍA SELECCIONADA
  const { cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = `/?search=${encodeURIComponent(searchTxt.trim())}`;
    if (searchCat) {
      url += `&cat=${searchCat}`;
    }
    setIsMenuOpen(false); // Cierra la barra lateral móvil por si acaso
    router.push(url);     // Envía al usuario a la URL filtrada
  };

  return (
    <header className="header-container">
      {/* --- NIVEL 1: BARRA PRINCIPAL --- */}
      <div className="main-navbar">
        {/* Botón Burger (Móvil) */}
        <button 
          className="burger-menu" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Zona del Logo */}
        <div className="nav-logo">
          <Link href="/">
            <img
              src="/img/logo.png" 
              alt="Logo" 
            />
          </Link>
        </div>

        {/* Barra de Búsqueda (Solo Desktop en este nivel) */}
        <div className="nav-search-container desktop-search">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="search-input"
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            />
            <div className="search-select-wrapper">
              <select 
                className="search-category"
                value={searchCat}
                onChange={(e) => setSearchCat(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                <option value="electronique">Dispositivos electrónicos</option>
                <option value="beaute">Belleza y cuidado personal</option>
                <option value="maison">Hogar</option>
                <option value="sport">Deporte / Fitness</option>
              </select>
            </div>
            <button type="submit" className="search-button" aria-label="Buscar">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
 
        {/* Acciones Iconos */}
        <div className="nav-actions">
          <Link href="/contact" className="action-icon fav-desktop" aria-label="Contacto">
            <i className="far fa-envelope"></i>
          </Link>
          <Link href="/panier" className="action-icon cart-icon-wrapper" aria-label="Carrito">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* --- NIVEL 2: BARRE DE NAVEGACIÓN INFERIOR (Solo Desktop) --- */}
      <div className="bottom-navbar">
        <div className="bottom-navbar-container">
          <ul className="nav-links">
            <li>
              <Link href="/" className={pathname === "/" ? "active-link" : ""}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/produits" className={pathname === "/produits" ? "active-link" : ""}>
                Todos nuestros productos
              </Link>
            </li>
            <li>
              <Link href="/vedette" className={`link-featured ${pathname === "/vedette" ? "active-link" : ""}`}>
                Producto Destacado <i className="fas fa-fire icon-fire"></i>
              </Link>
            </li>
            <li>
              <Link href="/contact" className={pathname === "/contact" ? "active-link" : ""}>
                Contacto
              </Link>
            </li>
          </ul>

          {/* Número de teléfono a la derecha */}
          <div className="nav-phone">
            <a href="tel:+34666754415">+34 666 754 415</a>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda para móvil debajo de la barra principal */}
      <div className="mobile-search-wrapper imagine-im">
        <form onSubmit={handleSearchSubmit} className="search-form mobile-search-form">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            className="search-input" 
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <button type="submit" className="search-button mobile-btn-blue" aria-label="Buscar">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      {/* --- MENU RESPONSIVE MOBILE SIDEBAR (Desliza desde la izquierda) --- */}
      <div className={`mobile-sidebar-overlay ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
        <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
          
          {/* Encabezado del menú móvil */}
          <div className="sidebar-header">
            <button className="close-sidebar" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Cuerpo del menú móvil */}
          <div className="sidebar-body">
            
            {/* Barra de búsqueda móvil dentro del menú */}
            <div className="mobile-search-wrapper">
              <form onSubmit={handleSearchSubmit} className="search-form mobile-search-form">
                <input 
                  type="text" 
                  placeholder="Buscar productos..." 
                  className="search-input"
                  value={searchTxt}
                  onChange={(e) => setSearchTxt(e.target.value)}
                />
                <button type="submit" className="search-button mobile-btn-blue" aria-label="Buscar">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>

            {/* Enlaces clásicos */}
            <ul className="sidebar-nav-links">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/produits">Todos nuestros productos</Link></li>
              <li><Link href="/vedette" className="link-featured">Producto Destacado <i className="fas fa-fire icon-fire"></i></Link></li>
              <li><Link href="/contact">Contacto</Link></li>
            </ul>
            
            <div className="sidebar-divider"></div>

            <div className="sidebar-section-title">
              <span>Filtrar por categoría</span>
              <Link href="/produits" className="see-all-link">Ver todo</Link>
            </div>

            <ul className="sidebar-categories-list">
              <li>
                <Link href="/?search=&cat=electronique">
                  <i className="fas fa-laptop"></i> Dispositivos electrónicos
                </Link>
              </li>
              <li>
                <Link href="/?search=&cat=beaute">
                  <i className="fas fa-pump-soap"></i> Belleza y cuidado personal
                </Link>
              </li>
              <li>
                <Link href="/?search=&cat=maison">
                  <i className="fas fa-couch"></i> Hogar
                </Link>
              </li>
              <li>
                <Link href="/?search=&cat=sport">
                  <i className="fas fa-basketball-ball"></i> Deporte / Fitness
                </Link>
              </li>
            </ul>

            <div className="sidebar-divider"></div>
          </div>

        </div>
      </div>
    </header>
  );
}
"use client";
 
import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { PRODUCTS_DATA } from "@/lib/products";




export default function ProductsPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  // Estados para ordenar y filtrar
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");

  const handleBuyNow = (product: typeof PRODUCTS_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  // Lista de categorías únicas dinámicas en español
  const categories = ["Todos", "Dispositivos electrónicos", "Deporte / Fitness", "Belleza y cuidado personal", "Cocina", "Hogar"];

  // Filtrar y ordenar la lista de productos de manera eficiente
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // 1. Filtrado por categoría
    if (categoryFilter !== "Todos") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // 2. Ordenación de los elementos
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [categoryFilter, sortBy]);

  return (
    <div className="home-page-container">
      <h1 className="section-title">Todos nuestros productos</h1>

      {/* Barra de control: Filtros y Ordenación */}
      <div className="catalog-controls">
        <div className="control-group">
          <label htmlFor="category-select">Categoría:</label>
          <select 
            id="category-select"
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-select">Ordenar por:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: de menor a mayor</option>
            <option value="price-desc">Precio: de mayor a menor</option>
            <option value="alpha">Orden alfabético</option>
          </select>
        </div>
      </div>

      {/* Grilla de productos */}
      <div className="products-grid">
        {filteredAndSortedProducts.map((product) => (
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

      {/* Mensaje si ningún producto coincide con el filtro aplicado */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="no-products-found">
          <i className="fas fa-search"></i>
          <p>No hay artículos disponibles en esta categoría actualmente.</p>
        </div>
      )}

 
   
    </div>
  );
}
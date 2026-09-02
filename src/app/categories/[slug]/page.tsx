"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { CATEGORIES, getProductsByCategory } from "@/lib/categories";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const router = useRouter();

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  const handleBuyNow = (product: any) => {
    addToCart(product);
    router.push("/panier");
  };

  return (
    <div className="home-page-container">
      {/* En-tête de la catégorie */}
      <div className="category-header" style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 className="section-title">
          <i className={`fas ${category.icon}`} style={{ marginRight: "10px" }}></i>
          {category.name}
        </h1>
        <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          {category.description}
        </p>
      </div>

      {/* Navigation rapide entre catégories */}
      <div className="category-pills" style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              backgroundColor: cat.slug === slug ? "#0070f3" : "#f0f0f0",
              color: cat.slug === slug ? "#fff" : "#333",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "500",
              transition: "all 0.2s"
            }}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Grille de produits */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/produits/${product.id}`} className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
                loading="lazy"
              />
            </Link>

            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3 className="product-name">
                <Link href={`/produits/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {product.name}
                </Link>
              </h3>
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

      {products.length === 0 && (
        <div className="no-products-found" style={{ textAlign: "center", padding: "3rem" }}>
          <i className="fas fa-box-open" style={{ fontSize: "3rem", color: "#ccc" }}></i>
          <p>No hay productos disponibles en esta categoría actualmente.</p>
        </div>
      )}
    </div>
  );
}
import { PRODUCTS_DATA } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductActions from "./ProductActions";
import "./product.css";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const product = PRODUCTS_DATA.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    notFound();
  }


  return (
    <main className="product-detail">

      <div className="product-detail-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>


      <div className="product-detail-info">

        <span className="product-detail-cat">
          {product.category}
        </span>


        <h1>
          {product.name}
        </h1>


        <p className="product-detail-price">
          {product.price.toLocaleString()} €
        </p>


        <p className="product-detail-description">
          Producto disponible en Espanadeal.
          Envío rápido y compra segura.
        </p>


        <ProductActions product={product} />

      </div>

    </main>
  );
}
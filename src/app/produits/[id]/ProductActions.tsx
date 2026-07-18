"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { PRODUCTS_DATA } from "@/lib/products";


export default function ProductActions({
  product,
}: {
  product: typeof PRODUCTS_DATA[0];
}) {

  const { addToCart } = useCart();
  const router = useRouter();


  const handleBuyNow = () => {
    addToCart(product);
    router.push("/panier");
  };


  return (

    <div className="product-detail-actions">


      <button
        className="btn-add-cart"
        type="button"
        onClick={() => addToCart(product)}
      >
        <i className="fas fa-shopping-basket"></i> +
        Añadir al carrito
      </button>



      <button
        className="btn-buy-now"
        type="button"
        onClick={handleBuyNow}
      >
        Tramitar pedido
      </button>


    </div>

  );
}
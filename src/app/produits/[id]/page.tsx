import { PRODUCTS_DATA } from "@/lib/products";
import { notFound } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {

  const product = PRODUCTS_DATA.find(
    (p) => p.id === Number(params.id)
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto p-6">

      <img
        src={product.image}
        alt={product.name}
        className="w-96"
      />

      <h1 className="text-3xl font-bold mt-5">
        {product.name}
      </h1>

      <p className="text-xl mt-3">
        {product.price} €
      </p>

      <p className="mt-5">
        Categoría : {product.category}
      </p>

      <button className="mt-5 bg-black text-white px-5 py-3 rounded">
        Comprar
      </button>

    </main>
  );
}
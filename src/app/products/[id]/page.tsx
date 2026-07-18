import { PRODUCTS_DATA } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ProductPage({
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

      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>


        <div>

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>


          <p className="text-gray-600 mb-4">
            {product.category}
          </p>


          <p className="text-2xl font-bold mb-6">
            {product.price.toFixed(2)} €
          </p>


          <button className="bg-black text-white px-6 py-3 rounded">
            Acheter maintenant
          </button>


          <p className="mt-6">
            Produit disponible sur Espanadeal.
            Livraison rapide en Espagne.
          </p>


        </div>

      </div>

    </main>
  );
}
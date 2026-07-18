import { PRODUCTS_DATA } from "@/lib/products";

function cdata(value: string) {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function getBrand(name: string) {
  const brands = [
    "Apple",
    "Sony",
    "JBL",
    "Nintendo",
    "PlayStation",
    "Puma",
    "Adidas",
    "Skechers",
    "CeraVe",
    "MIXA",
    "Ninja",
    "DJI",
    "Ecovacs",
    "Dreame",
  ];

  const found = brands.find((brand) =>
    name.toLowerCase().includes(brand.toLowerCase())
  );

  return found || "Espanadeal";
}


function getCategory(name: string) {
  const n = name.toLowerCase();

  if (
    n.includes("iphone") ||
    n.includes("smartphone") ||
    n.includes("teléfono")
  ) {
    return "267";
  }

  if (
    n.includes("airpods") ||
    n.includes("auriculares") ||
    n.includes("casque")
  ) {
    return "232";
  }

  if (
    n.includes("zapatillas") ||
    n.includes("zapatos") ||
    n.includes("baskets")
  ) {
    return "187";
  }

  if (
    n.includes("bicicleta") ||
    n.includes("fitness") ||
    n.includes("mancuerna")
  ) {
    return "499";
  }

  if (
    n.includes("playstation") ||
    n.includes("nintendo") ||
    n.includes("gaming")
  ) {
    return "639";
  }

  return "632";
}


export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>

<title>Espanadeal</title>
<link>https://espanadeal.es</link>
<description>Catalogue produits Espanadeal</description>


${PRODUCTS_DATA.map((product) => {

  const image = product.image.startsWith("http")
    ? product.image
    : `https://espanadeal.es${product.image}`;


  return `
<item>

<g:id>${product.id}</g:id>

<title>
${cdata(product.name)}
</title>

<description>
${cdata(
  `${product.name}. Disponible sur Espanadeal avec livraison rapide.`
)}
</description>


<link>
${cdata(`https://espanadeal.es/products/${product.id}`)}
</link>


<g:image_link>
${cdata(image)}
</g:image_link>


<g:brand>
${cdata(getBrand(product.name))}
</g:brand>


<g:google_product_category>
${getCategory(product.name)}
</g:google_product_category>


<g:product_type>
${cdata(getCategory(product.name))}
</g:product_type>


<g:price>
${Number(product.price).toFixed(2)} EUR
</g:price>


<g:availability>
in_stock
</g:availability>


<g:condition>
new
</g:condition>


<g:identifier_exists>
no
</g:identifier_exists>


</item>`;
}).join("")}


</channel>
</rss>`;


return new Response(xml, {
  headers: {
    "Content-Type": "application/xml; charset=UTF-8",
  },
});

}
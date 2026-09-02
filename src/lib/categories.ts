import { PRODUCTS_DATA } from "@/lib/products";

export interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    name: "Todos",
    slug: "todos",
    icon: "fa-th-large",
    description: "Explora todos los productos disponibles en nuestro catálogo."
  },
  {
    name: "Dispositivos electrónicos",
    slug: "dispositivos-electronicos",
    icon: "fa-laptop",
    description: "Lo último en smartphones, consolas de videojuegos, audio y tecnología."
  },
  {
    name: "Deporte / Fitness",
    slug: "deporte-fitness",
    icon: "fa-running",
    description: "Equipamiento deportivo, zapatillas, bicicletas y accesorios fitness."
  },
  {
    name: "Belleza y cuidado personal",
    slug: "belleza-y-cuidado-personal",
    icon: "fa-pump-soap",
    description: "Perfumes, cuidado de la piel y cosmética de las mejores marcas."
  },
  {
    name: "Cocina",
    slug: "cocina",
    icon: "fa-utensils",
    description: "Electrodomésticos, freidoras de aire y soluciones para tu cocina."
  },
  {
    name: "Hogar",
    slug: "hogar",
    icon: "fa-home",
    description: "Aspiradores robot, limpieza avanzada y tecnología para tu casa."
  }
];

export function getProductsByCategory(slug: string) {
  if (slug === "todos") {
    return PRODUCTS_DATA;
  }
  
  const category = CATEGORIES.find((cat) => cat.slug === slug);
  if (!category) return [];

  return PRODUCTS_DATA.filter((product) => product.category === category.name);
}
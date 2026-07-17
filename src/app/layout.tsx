import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://espanadeal.es"),

  

  title: {
    default: "Espanadeal | Tienda Online en España",
    template: "%s | Espanadeal",
  },
  verification: {
    google: "02EsY9lsHx9uIWWofpJSWyW4yn0bAPTutopuIkN2QNo",
  },

  description:
    "Compra productos de calidad al mejor precio en Espanadeal. Descubre ofertas exclusivas, envíos rápidos y una experiencia de compra segura en España.",

  keywords: [
    "Espanadeal",
    "tienda online",
    "compras online",
    "ofertas España",
    "productos España",
    "ecommerce",
    "electrónica",
    "hogar",
    "moda",
    "accesorios",
    "envío rápido",
  ],


  authors: [
    {
      name: "Espanadeal",
      url: "https://espanadeal.es",
    },
  ],

  creator: "Espanadeal",

  publisher: "Espanadeal",

  category: "E-commerce",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Espanadeal | Tienda Online",
    description:
      "Compra productos de calidad al mejor precio. Descubre las mejores ofertas en Espanadeal.",
    url: "https://espanadeal.es",
    siteName: "Espanadeal",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/img/log.png",
        width: 512,
        height: 512,
        alt: "Espanadeal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Espanadeal | Tienda Online",
    description:
      "Compra productos de calidad al mejor precio en Espanadeal.",
    images: ["/img/log.png"],
  },

  icons: {
    icon: "/img/log.png",
    shortcut: "/img/log.png",
    apple: "/img/log.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />



        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Imports Stripe requis
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/StripeCheckoutForm";

// Initialisation de Stripe avec ta clé publique (hors du composant pour éviter les rechargements)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CartPage() {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart() as any;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Étape 1 : Commande reçue
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Étape 2 : Choix du paiement
  const [currentOrderRef, setCurrentOrderRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const router = useRouter();

  // États pour Stripe et les méthodes de paiement
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bankInfo, setBankInfo] = useState({ beneficiary: "Cargando...", iban: "Cargando...", bic: "Cargando..." });
  const [showEmailPromptPopup, setShowEmailPromptPopup] = useState(false);

  const totalPrice = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  // Charger les données bancaires au cas où le client choisit le virement
  useEffect(() => {
    fetch("/api/bank-details")
      .then((res) => res.json())
      .then((data) => {
        if (data.beneficiary) setBankInfo(data);
      })
      .catch(console.error);
  }, []);

  const handleCheckout = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const orderRef = Math.floor(100000 + Math.random() * 900000).toString();
    setCurrentOrderRef(orderRef);

    const newOrder = {
      id: orderRef,
      date: new Date().toLocaleString("es-ES"),
      items: cart,
      total: totalPrice
    };

    try {
      // 1. Envoi de la commande à l'admin (Sauvegarde dans Turso)
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        // 2. Demander un ticket de paiement (Client Secret) à notre route API Stripe
        const stripeRes = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart, orderId: orderRef }),
        });
        const stripeData = await stripeRes.json();
        
        if (stripeData.clientSecret) {
          setClientSecret(stripeData.clientSecret);
        }

        // Étape 3 : Afficher le premier popup de succès
        setShowSuccessPopup(true);
      } else {
        alert("Hubo un error al procesar el pedido en el servidor.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Inténtelo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedToPaymentType = () => {
    setShowSuccessPopup(false);
    setShowPaymentModal(true); // Ouvre le grand modal de sélection de paiement
  };

 const handlePaymentSuccess = () => {
  // Ouvre le popup d'envoi d'e-mail et ferme le modal de sélection de paiement
  setShowPaymentModal(false);
  setShowEmailPromptPopup(true);
};

  const handleFinalizeOrder = () => {
    setShowPaymentModal(false);
    if (typeof clearCart === "function") {
      clearCart();
    }
    router.push("/");
  };

  if (cart.length === 0 && !showPaymentModal && !showSuccessPopup) {
    return (
      <div className="cart-empty-container">
        <i className="fas fa-shopping-bag empty-icon"></i>
        <h2>Su carrito está vacío</h2>
        <p>Parece que aún no ha añadido ningún producto.</p>
        <Link href="/" className="btn-back-home">Continuar comprando</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="page-title">Mi Carrito ({cart.length})</h1>
      <div className="cart-content-wrapper">
        {/* Liste des produits */}
        <div className="cart-items-list">
          {cart.map((item: any) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-img-wrapper">
                <img src={item.image} alt={item.name} className="cart-item-img" />
              </div>
              <div className="cart-item-details">
                <span className="cart-item-cat">{item.category}</span>
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-unit-price">Precio unitario: {item.price} €</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} type="button">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} type="button">+</button>
              </div>
              <div className="cart-item-actions">
                <p className="cart-item-subtotal">{(item.price * item.quantity).toLocaleString()} €</p>
                <button onClick={() => removeFromCart(item.id)} className="btn-remove-item" type="button">
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Panneau de résumé de commande */}
        <div className="cart-summary-card">
          <h3>Resumen del pedido</h3>
          <div className="summary-row"><span>Subtotal</span><span>{totalPrice.toLocaleString()} €</span></div>
          <div className="summary-row"><span>Envío</span><span className="free-shipping">Gratis</span></div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row"><span>Total</span><span>{totalPrice.toLocaleString()} €</span></div>
          <button className="btn-checkout" onClick={handleCheckout} disabled={isSubmitting} type="button">
            {isSubmitting ? "Procesando..." : "Tramitar pedido"}
          </button>
        </div>
      </div>

      {/* 1. POPUP DE SUCCÈS (COMMANDE ENREGISTRÉE) */}
      {showSuccessPopup && (
        <div className="payment-modal-overlay" style={{ zIndex: 9999 }}>
          <div className="payment-modal-card" style={{ textAlign: "center", padding: "40px 30px" }}>
            <div style={{ fontSize: "50px", color: "#2ecc71", marginBottom: "20px" }}>
              <i className="fas fa-check-circle animate-bounce"></i>
            </div>
            <h2 style={{ fontSize: "24px", color: "#2c3e50", marginBottom: "10px" }}>¡Pedido Enviado con Éxito!</h2>
            <p style={{ color: "#7f8c8d", marginBottom: "25px", fontSize: "16px" }}>
              Su pedido <strong>#{currentOrderRef}</strong> ha sido guardado correctamente.
            </p>
            <button 
              onClick={handleProceedToPaymentType}
              className="btn-modal-confirm"
              style={{ background: "#2ecc71", border: "none", width: "100%" }}
              type="button"
            >
              Proceder al pago <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
            </button>
          </div>
        </div>
      )}

      {/* 2. LE GRAND MODAL DE PAIEMENT (STRIPE OU VIREMENT) */}
      {showPaymentModal && (
        <div className="payment-modal-overlay" style={{ zIndex: 9998 }}>
    <div className="payment-modal-card" style={{ maxWidth: "450px", padding: "20px" }}> {/* max-width réduit à 450px et padding à 20px */}
      <div className="payment-modal-header" style={{ marginBottom: "15px", textAlign: "center" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "6px" }}>Método de Pago</h2> {/* Titre plus petit (20px au lieu de la taille par défaut) */}
        <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.4" }}>
          Seleccione cómo desea pagar su pedido <strong>#{currentOrderRef}</strong> por un total de <strong>{totalPrice.toLocaleString()} €</strong>.
        </p> {/* Texte explicatif réduit à 14px */}
      </div>

      {/* Onglets de sélection réduits */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}> {/* Espacement réduit à 8px */}
        <button 
          onClick={() => setPaymentMethod("card")}
          style={{ 
            flex: 1, 
            padding: "8px 10px", // Padding réduit (plus compact)
            fontSize: "14px", // Police réduite à 14px
            borderRadius: "6px", 
            border: "2px solid", 
            borderColor: paymentMethod === "card" ? "#0070f3" : "#ccc", 
            background: paymentMethod === "card" ? "#f0f7ff" : "#fff", 
            cursor: "pointer", 
            fontWeight: "bold" 
          }}
          type="button"
        >
          <i className="far fa-credit-card"></i> Tarjeta
        </button>
        <button 
          onClick={() => setPaymentMethod("bank")}
          style={{ 
            flex: 1, 
            padding: "8px 10px", // Padding réduit
            fontSize: "14px", // Police réduite à 14px
            borderRadius: "6px", 
            border: "2px solid", 
            borderColor: paymentMethod === "bank" ? "#0070f3" : "#ccc", 
            background: paymentMethod === "bank" ? "#f0f7ff" : "#fff", 
            cursor: "pointer", 
            fontWeight: "bold" 
          }}
          type="button"
        >
          <i className="fas fa-university"></i> Transferencia
        </button>
      </div>

            {/* CONTENU OPTION 1 : FORMULAIRE STRIPE */}
            {paymentMethod === "card" && clientSecret && (
              <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", border: "1px solid #eee" }}>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeCheckoutForm orderId={currentOrderRef} onSuccess={handlePaymentSuccess} />
                </Elements>
              </div>
            )}

            {/* CONTENU OPTION 2 : VIREMENT BANCAIRE (DYNAMIQUE) */}
            {paymentMethod === "bank" && (
              <div>
                <div className="payment-modal-details" style={{ marginTop: "10px" }}>
                  <strong className="payment-method-title">Pago por transferencia bancaria</strong>
                  <p><strong>Beneficiario:</strong> {bankInfo.beneficiary}</p>
                  <p><strong>IBAN:</strong> {bankInfo.iban}</p>
                  <p><strong>SWIFT/BIC:</strong> {bankInfo.bic}</p>
                  <p className="payment-reference-row"><strong>Referencia:</strong> Pedido #{currentOrderRef}</p>
                </div>
                <div className="payment-modal-notice" style={{ margin: "15px 0" }}>
                  <i className="fas fa-info-circle"></i> 
                  Después de realizar el pago, debe enviar el recibo por correo electrónico a <strong>contact@espanadeal.es</strong>.
                </div>
                <button onClick={handleFinalizeOrder} className="btn-modal-confirm" style={{ width: "100%" }} type="button">
                  Entendido y Confirmar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. POPUP DE CONFIRMATION ET D'ENVOI D'E-MAIL APRÈS PAIEMENT */}
{showEmailPromptPopup && (
  <div className="payment-modal-overlay" style={{ zIndex: 9999 }}>
    <div className="payment-modal-card" style={{ textAlign: "center", padding: "40px 30px", maxWidth: "450px" }}>
      <div style={{ fontSize: "50px", color: "#0070f3", marginBottom: "20px" }}>
        <i className="fas fa-envelope-open-text"></i>
      </div>
      <h2 style={{ fontSize: "22px", color: "#1a1a1a", marginBottom: "12px" }}>¡Pago Recibido con Éxito!</h2>
      <p style={{ color: "#666", marginBottom: "25px", fontSize: "15px", lineHeight: "1.5" }}>
        Para agilizar el procesamiento y envío de su pedido <strong>#{currentOrderRef}</strong>, haga clic en le botón de abajo para enviarnos una confirmación a <strong>contact@espanadeal.es</strong>.
      </p>
      
      {/* Bouton Noir d'envoi de mail pré-rempli */}
      <a 
        href={`mailto:contact@espanadeal.es?subject=Confirmación de Pago - Pedido %23${currentOrderRef}&body=Hola Espanadeal,%0D%0A%0D%0AHe realizado correctamente el pago con tarjeta para mi pedido %23${currentOrderRef}.%0D%0A%0D%0AUn saludo.`}
        className="btn-see-more"
        style={{ 
          display: "inline-flex", 
          width: "100%", 
          marginBottom: "12px", 
          textDecoration: "none",
          boxSizing: "border-box"
        }}
      >
        Enviar Correo de Confirmación <i className="fas fa-paper-plane" style={{ marginLeft: "10px" }}></i>
      </a>

      {/* Lien secondaire discret pour finaliser sans envoyer */}
      <button
        onClick={handleFinalizeOrder}
        style={{
          background: "none",
          border: "none",
          color: "#0070f3",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          textDecoration: "underline"
        }}
        type="button"
      >
        Volver a la tienda
      </button>
    </div>
  </div>
)}
    </div>
  );
}


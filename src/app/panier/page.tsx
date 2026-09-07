"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Imports Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/StripeCheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CartPage() {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart() as any;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentOrderRef, setCurrentOrderRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // États du formulaire client
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");

  // États Stripe et Banque
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bankInfo, setBankInfo] = useState({
    beneficiary: "Cargando...",
    iban: "Cargando...",
    bic: "Cargando...",
  });
  const [showEmailPromptPopup, setShowEmailPromptPopup] = useState(false);

  const totalPrice = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    fetch("/api/bank-details")
      .then((res) => res.json())
      .then((data) => {
        if (data.beneficiary) setBankInfo(data);
      })
      .catch(console.error);
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !address || !city || !contact) {
      alert("Por favor, complete todos los datos de envío.");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const orderRef = Math.floor(100000 + Math.random() * 900000).toString();
    setCurrentOrderRef(orderRef);

    const newOrder = {
      id: orderRef,
      date: new Date().toLocaleString("es-ES"),
      items: cart,
      total: totalPrice,
      customerName,
      address,
      city,
      contact,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const stripeRes = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart, orderId: orderRef }),
        });
        const stripeData = await stripeRes.json();

        if (stripeData.clientSecret) {
          setClientSecret(stripeData.clientSecret);
        }

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
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
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
        <Link href="/" className="btn-back-home">
          Continuar comprando
        </Link>
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
                <p className="cart-item-unit-price">
                  Precio unitario: {item.price} €
                </p>
              </div>
              <div className="cart-item-quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  type="button"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </div>
              <div className="cart-item-actions">
                <p className="cart-item-subtotal">
                  {(item.price * item.quantity).toLocaleString()} €
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove-item"
                  type="button"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Panneau latéral : Résumé & Formulaire de livraison */}
        <div className="cart-summary-card">
          <h3>Resumen del pedido</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{totalPrice.toLocaleString()} €</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="free-shipping">Gratis</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>{totalPrice.toLocaleString()} €</span>
          </div>

          {/* Formulaire Informations Client */}
          <form onSubmit={handleCheckout} style={{ marginTop: "20px" }}>
            <h4 style={{ fontSize: "16px", marginBottom: "12px", color: "#2c3e50" }}>
              Datos de entrega
            </h4>

            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Nombre completo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Dirección de entrega"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="WhatsApp o Email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              className="btn-checkout"
              disabled={isSubmitting}
              type="submit"
              style={{ width: "100%" }}
            >
              {isSubmitting ? "Procesando..." : "Tramitar pedido"}
            </button>
          </form>
        </div>
      </div>

      {/* 1. POPUP DE SUCCÈS */}
      {showSuccessPopup && (
        <div className="payment-modal-overlay" style={{ zIndex: 9999 }}>
          <div
            className="payment-modal-card"
            style={{ textAlign: "center", padding: "40px 30px" }}
          >
            <div
              style={{
                fontSize: "50px",
                color: "#2ecc71",
                marginBottom: "20px",
              }}
            >
              <i className="fas fa-check-circle animate-bounce"></i>
            </div>
            <h2
              style={{
                fontSize: "24px",
                color: "#2c3e50",
                marginBottom: "10px",
              }}
            >
              ¡Pedido Enviado con Éxito!
            </h2>
            <p
              style={{
                color: "#7f8c8d",
                marginBottom: "25px",
                fontSize: "16px",
              }}
            >
              Su pedido <strong>#{currentOrderRef}</strong> ha sido guardado
              correctamente.
            </p>
            <button
              onClick={handleProceedToPaymentType}
              className="btn-modal-confirm"
              style={{ background: "#2ecc71", border: "none", width: "100%" }}
              type="button"
            >
              Proceder al pago{" "}
              <i
                className="fas fa-arrow-right"
                style={{ marginLeft: "8px" }}
              ></i>
            </button>
          </div>
        </div>
      )}

      {/* 2. MODAL DE PAIEMENT */}
      {showPaymentModal && (
        <div className="payment-modal-overlay" style={{ zIndex: 9998 }}>
          <div
            className="payment-modal-card"
            style={{ maxWidth: "450px", padding: "20px" }}
          >
            <div
              className="payment-modal-header"
              style={{ marginBottom: "15px", textAlign: "center" }}
            >
              <h2 style={{ fontSize: "20px", marginBottom: "6px" }}>
                Método de Pago
              </h2>
              <p
                style={{ fontSize: "14px", color: "#666", lineHeight: "1.4" }}
              >
                Seleccione cómo desea pagar su pedido{" "}
                <strong>#{currentOrderRef}</strong> por un total de{" "}
                <strong>{totalPrice.toLocaleString()} €</strong>.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
              <button
                onClick={() => setPaymentMethod("card")}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "2px solid",
                  borderColor: paymentMethod === "card" ? "#0070f3" : "#ccc",
                  background: paymentMethod === "card" ? "#f0f7ff" : "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                type="button"
              >
                <i className="far fa-credit-card"></i> Tarjeta
              </button>
              <button
                onClick={() => setPaymentMethod("bank")}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "2px solid",
                  borderColor: paymentMethod === "bank" ? "#0070f3" : "#ccc",
                  background: paymentMethod === "bank" ? "#f0f7ff" : "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                type="button"
              >
                <i className="fas fa-university"></i> Transferencia
              </button>
            </div>

            {paymentMethod === "card" && clientSecret && (
              <div
                style={{
                  background: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                }}
              >
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeCheckoutForm
                    orderId={currentOrderRef}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div>
                <div
                  className="payment-modal-details"
                  style={{ marginTop: "10px" }}
                >
                  <strong className="payment-method-title">
                    Pago por transferencia bancaria
                  </strong>
                  <p>
                    <strong>Beneficiario:</strong> {bankInfo.beneficiary}
                  </p>
                  <p>
                    <strong>IBAN:</strong> {bankInfo.iban}
                  </p>
                  <p>
                    <strong>SWIFT/BIC:</strong> {bankInfo.bic}
                  </p>
                  <p className="payment-reference-row">
                    <strong>Referencia:</strong> Pedido #{currentOrderRef}
                  </p>
                </div>
                <div
                  className="payment-modal-notice"
                  style={{ margin: "15px 0" }}
                >
                  <i className="fas fa-info-circle"></i> Después de realizar el
                  pago, debe enviar el recibo por correo electrónico a{" "}
                  <strong>contact@espanadeal.es</strong>.
                </div>
                <button
                  onClick={handleFinalizeOrder}
                  className="btn-modal-confirm"
                  style={{ width: "100%" }}
                  type="button"
                >
                  Entendido y Confirmar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. POPUP ENVOI EMAIL */}
      {showEmailPromptPopup && (
        <div className="payment-modal-overlay" style={{ zIndex: 9999 }}>
          <div
            className="payment-modal-card"
            style={{
              textAlign: "center",
              padding: "40px 30px",
              maxWidth: "450px",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                color: "#0070f3",
                marginBottom: "20px",
              }}
            >
              <i className="fas fa-envelope-open-text"></i>
            </div>
            <h2
              style={{
                fontSize: "22px",
                color: "#1a1a1a",
                marginBottom: "12px",
              }}
            >
              ¡Pago Recibido con Éxito!
            </h2>
            <p
              style={{
                color: "#666",
                marginBottom: "25px",
                fontSize: "15px",
                lineHeight: "1.5",
              }}
            >
              Para agilizar el procesamiento y envío de su pedido{" "}
              <strong>#{currentOrderRef}</strong>, haga clic en le botón de abajo
              para enviarnos una confirmación a{" "}
              <strong>contact@espanadeal.es</strong>.
            </p>

            <a
              href={`mailto:contact@espanadeal.es?subject=Confirmación de Pago - Pedido %23${currentOrderRef}&body=Hola Espanadeal,%0D%0A%0D%0AHe realizado correctamente el pago con tarjeta para mi pedido %23${currentOrderRef}.%0D%0A%0D%0AUn saludo.`}
              className="btn-see-more"
              style={{
                display: "inline-flex",
                width: "100%",
                marginBottom: "12px",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              Enviar Correo de Confirmación{" "}
              <i
                className="fas fa-paper-plane"
                style={{ marginLeft: "10px" }}
              ></i>
            </a>

            <button
              onClick={handleFinalizeOrder}
              style={{
                background: "none",
                border: "none",
                color: "#0070f3",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                textDecoration: "underline",
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
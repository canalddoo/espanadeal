"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

interface StripeFormProps {
  orderId: string;
  onSuccess: () => void;
}

export default function StripeCheckoutForm({ orderId, onSuccess }: StripeFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Ocurrió un error inesperado.");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Pagado (Stripe)" }),
      });
      
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
      {/* 
        Conteneur défilant : on limite la hauteur à 350px (ajustable) 
        et on active le défilement si le formulaire Stripe dépasse.
      */}
      <div 
        style={{ 
          maxHeight: "350px", 
          overflowY: "auto", 
          paddingRight: "8px",
          marginBottom: "15px"
        }}
      >
        <PaymentElement />
      </div>
      
      {message && (
        <div style={{ color: "red", marginTop: "10px", fontSize: "11px", background: "#fdf0f0", padding: "8px", borderRadius: "4px" }}>
          {message}
        </div>
      )}

      <button
        disabled={isProcessing || !stripe || !elements}
        style={{
          width: "100%",
          padding: "6px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "10px", // Réduit pour coller au bloc défilant
        }}
      >
        {isProcessing ? "Procesando pago..." : "Pagar con tarjeta de forma segura"}
      </button>
    </form>
  );
}
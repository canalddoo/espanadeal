import { NextResponse } from "next/server";
import Stripe from "stripe";

// On retire la propriété apiVersion pour laisser le SDK Stripe utiliser sa version native par défaut
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { items, orderId } = await req.json();

    // 1. Recalculer le total en centimes (Ex: 10€ = 1000 centimes)
    const totalAmount = items.reduce((acc: number, item: any) => {
      return acc + Math.round(item.price * item.quantity * 100);
    }, 0);

    if (totalAmount < 50) {
      return NextResponse.json({ error: "El monto mínimo es de 0.50 €" }, { status: 400 });
    }

    // 2. Créer l'intention de paiement chez Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "eur",
      metadata: { orderId: orderId }, 
      automatic_payment_methods: { enabled: true },
    });

    // 3. Renvoyer le client_secret au frontend
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
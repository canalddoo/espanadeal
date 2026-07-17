import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
 
// GET : Récupérer toutes les commandes avec leurs articles respectifs
export async function GET() {
  try {
    // 1. Récupérer d'abord toutes les commandes triées par date décroissante
    const dbOrders = await db.select().from(orders).orderBy(desc(orders.date));

    // 2. Associer manuellement les articles correspondants à chaque commande
    const result = await Promise.all(
      dbOrders.map(async (order) => {
        const items = await db
          .select()
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id));
          
        return {
          ...order,
          items, // Tableau d'articles injecté pour la page admin
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en GET /api/orders:", error);
    return NextResponse.json(
      { error: "Error al recuperar los pedidos de la base de datos" },
      { status: 500 }
    );
  }
}

// POST : Créer une nouvelle commande reçue depuis le panier
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, date, total, items } = body;

    // Validation simple des données reçues
    if (!id || total === undefined || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Datos incompletos para procesar el pedido" },
        { status: 400 }
      );
    }

    // 1. Insérer la commande principale
    await db.insert(orders).values({
      id,
      date,
      total,
      status: "Pendiente de pago",
    });

    // 2. Insérer tous les articles rattachés à cette commande
    for (const item of items) {
      await db.insert(orderItems).values({
        orderId: id,
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        image: item.image || "",
      });
    }

    return NextResponse.json({ success: true, orderId: id }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/orders:", error);
    return NextResponse.json(
      { error: "Error al crear el pedido en la base de datos" },
      { status: 500 }
    );
  }
}
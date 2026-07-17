import { NextResponse } from "next/server";
import { db } from "@/db";
import { bankDetails } from "@/db/schema";
import { eq } from "drizzle-orm";

// Récupérer les coordonnées bancaires
export async function GET() {
  try {
    const details = await db.select().from(bankDetails).where(eq(bankDetails.id, 1)).get();
    return NextResponse.json(details || {});
  } catch (error) {
    return NextResponse.json({ error: "Error al cargar datos" }, { status: 500 });
  }
}

// Mettre à jour les coordonnées bancaires
export async function PUT(req: Request) {
  try {
    const { beneficiary, iban, bic } = await req.json();
    await db.update(bankDetails)
      .set({ beneficiary, iban, bic })
      .where(eq(bankDetails.id, 1));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { db } from "@/db"; // Ajuste le chemin vers ton instance Drizzle
import { visits } from "@/db/schema";

export async function POST(request: Request) {
  try {
    // Récupération du pays via les headers de déploiement (Vercel / Cloudflare)
    const country = request.headers.get("x-vercel-ip-country") || 
                    request.headers.get("cf-ipcountry") || 
                    "Unknown";

    await db.insert(visits).values({
      country: country,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to log visit" }, { status: 500 });
  }
}
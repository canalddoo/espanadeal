import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Table principale des Commandes (Orders)
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(), // L'identifiant unique (ex: "123456")
  date: text("date").notNull(), // La date au format texte
  total: real("total").notNull(), // Le prix total de la commande
  status: text("status").notNull().default("Pendiente de pago"), // Statut en espagnol
});

// Table de liaison pour les articles de la commande (Order Items)
export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }), // Lié à la commande principale
  productId: integer("product_id").notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
});


export const bankDetails = sqliteTable("bank_details", {
  id: integer("id").primaryKey(), // Un identifiant unique (valeur fixe 1)
  beneficiary: text("beneficiary").notNull(),
  iban: text("iban").notNull(),
  bic: text("bic").notNull(),
});
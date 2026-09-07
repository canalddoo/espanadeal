import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Table principale des Commandes (Orders)
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  total: real("total").notNull(),
  status: text("status").notNull().default("Pendiente de pago"),
  
  // Nouveaux champs clients
  customerName: text("customer_name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  contact: text("contact").notNull(), // WhatsApp ou Email
});

// Table de liaison pour les articles
export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
});

export const bankDetails = sqliteTable("bank_details", {
  id: integer("id").primaryKey(),
  beneficiary: text("beneficiary").notNull(),
  iban: text("iban").notNull(),
  bic: text("bic").notNull(),
});

export const visits = sqliteTable("visits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  country: text("country").notNull().default("Unknown"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});
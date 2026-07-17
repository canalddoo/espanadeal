"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [bank, setBank] = useState({ beneficiary: "", iban: "", bic: "" });
const [savingBank, setSavingBank] = useState(false);
  
  // États pour la sécurité / Login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Vérifier si l'admin est déjà connecté (via sessionStorage)
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("admin_logged_in");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Charger les données 
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [isAuthenticated]);

  // Gérer la connexion
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Admin" && password === "Admin12") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_logged_in", "true");
      setLoginError("");
    } else {
      setLoginError("Usuario o contraseña incorrectos.");
    }
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_logged_in");
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(orders.map((order) => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (error) {
      alert("No se pudo actualizar el estado.");
    }
  };

  // Suppression de la commande (Appelle la méthode DELETE du backend)
  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("¿Está seguro de que desea eliminar este pedido del historial definitivamente?")) return;

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== orderId));
      } else {
        alert("Error del servidor al intentar eliminar el pedido.");
      }
    } catch (error) {
      alert("No se pudo eliminar el pedido.");
    }
  };

  // Charger les données bancaires au démarrage si authentifié
useEffect(() => {
  if (!isAuthenticated) return;
  fetch("/api/bank-details")
    .then((res) => res.json())
    .then((data) => setBank(data))
    .catch(console.error);
}, [isAuthenticated]);

const handleBankUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  setSavingBank(true);
  try {
    const res = await fetch("/api/bank-details", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bank),
    });
    if (res.ok) alert("Datos bancarios actualizados correctamente.");
  } catch (error) {
    alert("Error al actualizar.");
  } finally {
    setSavingBank(false);
  }
};


  // ÉCRAN DE CONNEXION (Si non authentifié)
  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <form onSubmit={handleLogin} style={{ background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}><i className="fas fa-lock"></i> Acceso Admin</h2>
          
          {loginError && <p style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px", fontSize: "14px" }}>{loginError}</p>}
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Usuario</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
          </div>

          <button type="submit" style={{ width: "100%", padding: "12px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="admin-container"><p>Cargando pedidos desde Turso...</p></div>;
  }

  // ÉCRAN PRINCIPAL (Si connecté)
  return (
    <div className="admin-container">
      <div className="admin-header" style={{ display: "flex", justifyContent: "between", alignItems: "center" }}>
        <div>
          <h1 className="admin-title"><i className="fas fa-user-shield"></i> Panel de Control - Administración</h1>
          <span className="admin-badge">{orders.length} Pedido(s) recibido(s)</span>
        </div>
        <button onClick={handleLogout} style={{ padding: "8px 16px", background: "#333", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Cerrar Sesión
        </button>
      </div>


      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
  <h3><i className="fas fa-university"></i> Configuración de Cuenta Bancaria</h3>
  <form onSubmit={handleBankUpdate} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "15px", alignItems: "end", marginTop: "15px" }}>
    <div>
      <label style={{ display: "block", fontSize: "14px", marginBottom: "5px" }}>Beneficiario</label>
      <input type="text" value={bank.beneficiary} onChange={(e) => setBank({ ...bank, beneficiary: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
    </div>
    <div>
      <label style={{ display: "block", fontSize: "14px", marginBottom: "5px" }}>IBAN</label>
      <input type="text" value={bank.iban} onChange={(e) => setBank({ ...bank, iban: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
    </div>
    <div>
      <label style={{ display: "block", fontSize: "14px", marginBottom: "5px" }}>SWIFT / BIC</label>
      <input type="text" value={bank.bic} onChange={(e) => setBank({ ...bank, bic: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
    </div>
    <button type="submit" disabled={savingBank} style={{ padding: "10px 20px", background: "#2ecc71", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
      {savingBank ? "Guardando..." : "Actualizar Cuenta"}
    </button>
  </form>
</div>

      {orders.length === 0 ? (
        <div className="admin-empty-state">
          <i className="fas fa-inbox admin-empty-icon"></i>
          <h2>No hay ningún pedido registrado aún</h2>
          <p>Las compras realizadas por los clientes aparecerán automáticamente aquí.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <div key={order.id} className="admin-order-card">
              <div className="admin-card-header">
                <div className="admin-order-info-group">
                  <span className="admin-label">ID de Pedido: </span>
                  <strong className="admin-order-id">#{order.id}</strong>
                </div>
                <div className="admin-order-info-group">
                  <span className="admin-label">Fecha: </span>
                  <strong className="admin-order-date">{order.date}</strong>
                </div>
                <div className="admin-order-info-group">
                  <span className="admin-label">Estado: </span>
                  <span className={`admin-status-pill status-${order.status.toLowerCase().replace(/\s+/g, "-")}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="admin-card-body">
                <h4 className="admin-section-subtitle">Artículos comprados :</h4>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio unitario</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item) => (
                      <tr key={item.id}>
                        <td className="product-name-cell">{item.name}</td>
                        <td className="product-cat-cell">{item.category}</td>
                        <td>{item.price} €</td>
                        <td className="text-center">x{item.quantity}</td>
                        <td className="text-right subtotal-cell">{(item.price * item.quantity).toLocaleString()} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-card-footer">
                <div className="admin-status-control">
                  <span className="control-label">Cambiar estado del pedido:</span>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="admin-select"
                  >
                    <option value="Pendiente de pago">Pendiente de pago</option>
                    <option value="Pagado">Pagado (Recibo Validado)</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                <div className="admin-actions-summary">
                  <div className="admin-total-amount">
                    <span>Monto Total a Recibir: </span>
                    <strong className="total-price-display">{order.total.toLocaleString()} €</strong>
                  </div>
                  <button onClick={() => handleDeleteOrder(order.id)} className="admin-delete-btn" title="Eliminar historial">
                    <i className="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
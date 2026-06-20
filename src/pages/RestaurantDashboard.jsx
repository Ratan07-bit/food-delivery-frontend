import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function RestaurantDashboard() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("active"); // "active" or "history"
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/restaurant-login");
      return;
    }
    getOrders();

    const interval = setInterval(getOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const getOrders = async () => {
    try {
      const res = await API.get("/restaurants/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/restaurant-login");
      }
    }
  };

  const acceptOrder = async (id) => {
    try {
      await API.put(`/restaurants/orders/${id}/accept`);
      showToast(`Order #${id} Accepted! Starting preparation.`, "success");
      getOrders();
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.detail || "Could not accept order.", "error");
    }
  };

  const readyOrder = async (id) => {
    try {
      await API.put(`/restaurants/orders/${id}/ready`);
      showToast(`Order #${id} marked as Food Ready! 🍔`, "success");
      getOrders();
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.detail || "Could not update status.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/restaurant-login");
  };

  // Group orders for metric cards
  const pendingOrders = orders.filter((o) => o.status === "PLACED");
  const preparingOrders = orders.filter((o) => o.status === "PREPARING");
  const readyOrders = orders.filter((o) => ["READY_FOR_PICKUP", "READY"].includes(o.status));
  const completedOrders = orders.filter((o) => o.status === "DELIVERED");

  // Filter orders by active tab
  const filteredOrders = orders.filter((o) => {
    if (activeTab === "active") {
      return ["PLACED", "PREPARING", "READY_FOR_PICKUP", "READY", "ASSIGNED"].includes(o.status);
    } else {
      return ["DELIVERED", "CANCELLED"].includes(o.status);
    }
  });

  return (
    <div className="partner-dashboard">
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-message ${t.type}`}>
            <span>{t.type === "success" ? "✅" : t.type === "error" ? "❌" : "ℹ️"}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      <header className="partner-header">
        <div className="partner-navbar">
          <div className="partner-nav-left">
            <span className="partner-brand-logo">🍽️</span>
            <span className="partner-brand-text">FoodExpress</span>
            <span className="partner-logo-badge">Partner Portal</span>
          </div>

          <div className="partner-nav-right">
            <div className="partner-profile">
              <span className="partner-status-dot"></span>
              <span className="partner-restaurant-name">Merchant Dashboard</span>
            </div>
            <button className="partner-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="partner-dashboard-container">
        <section className="partner-metrics-grid">
          <div className="partner-metric-card">
            <div className="partner-metric-icon-box orange">🛎️</div>
            <div className="partner-metric-info">
              <h3>Pending Orders</h3>
              <p className="value">{pendingOrders.length}</p>
            </div>
          </div>

          <div className="partner-metric-card">
            <div className="partner-metric-icon-box yellow">🍳</div>
            <div className="partner-metric-info">
              <h3>Preparing</h3>
              <p className="value">{preparingOrders.length}</p>
            </div>
          </div>

          <div className="partner-metric-card">
            <div className="partner-metric-icon-box green">📦</div>
            <div className="partner-metric-info">
              <h3>Ready For Pickup</h3>
              <p className="value">{readyOrders.length}</p>
            </div>
          </div>

          <div className="partner-metric-card">
            <div className="partner-metric-icon-box blue">📈</div>
            <div className="partner-metric-info">
              <h3>Completed Today</h3>
              <p className="value">{completedOrders.length}</p>
            </div>
          </div>
        </section>

        <div className="partner-tabs-container">
          <div className="partner-tabs-left">
            <button
              className={`partner-tab-btn ${activeTab === "active" ? "active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Active Orders
              <span className="partner-tab-count">
                {orders.filter((o) => ["PLACED", "PREPARING", "READY_FOR_PICKUP", "READY", "ASSIGNED"].includes(o.status)).length}
              </span>
            </button>
            <button
              className={`partner-tab-btn ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Order History
              <span className="partner-tab-count">
                {orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status)).length}
              </span>
            </button>
          </div>
          <div className="partner-tabs-right">
            <button className="partner-logout-btn" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={getOrders}>
              🔄 Refresh List
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="partner-empty-state">
            <div className="partner-empty-icon">📂</div>
            <h3>No Orders Found</h3>
            <p>
              {activeTab === "active"
                ? "There are currently no active incoming orders for your restaurant."
                : "You don't have any past orders in your history record."}
            </p>
          </div>
        ) : (
          <div className="partner-orders-grid">
            {filteredOrders.map((order) => (
              <div key={order.id} className="partner-order-card">
                <div className="partner-order-card-header">
                  <div>
                    <span className="partner-order-id">Order #{order.id}</span>
                    <div className="partner-order-time">Incoming Request</div>
                  </div>
                  <span className={`status-pill status-${order.status.toLowerCase()}`}>
                    {order.status.replace("_", " ")}
                  </span>
                </div>

                <div className="partner-order-card-body">
                  <div className="partner-order-detail-row">
                    <span className="label">Delivery Status</span>
                    <span className="val">{order.delivery_status || "PENDING"}</span>
                  </div>
                  {order.total_price && (
                    <div className="partner-order-detail-row total">
                      <span className="label">Amount Earned</span>
                      <span className="val">₹{order.total_price}</span>
                    </div>
                  )}
                </div>

                <div className="partner-order-card-footer">
                  {order.status === "PLACED" && (
                    <button className="partner-action-btn accept" onClick={() => acceptOrder(order.id)}>
                      <span>👨‍🍳</span> Accept & Start Preparing
                    </button>
                  )}

                  {order.status === "PREPARING" && (
                    <button className="partner-action-btn ready" onClick={() => readyOrder(order.id)}>
                      <span>🍔</span> Mark Food Ready
                    </button>
                  )}

                  {["READY_FOR_PICKUP", "READY", "ASSIGNED", "DELIVERED", "CANCELLED"].includes(order.status) && (
                    <div style={{ textAlign: "center", color: "#9ca3af", fontSize: "13px", fontWeight: "600" }}>
                      {["READY_FOR_PICKUP", "READY", "ASSIGNED"].includes(order.status)
                        ? "⌛ Waiting for delivery partner pickup"
                        : order.status === "DELIVERED"
                        ? "🎉 Order completed successfully"
                        : "❌ Order has been cancelled"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default RestaurantDashboard;
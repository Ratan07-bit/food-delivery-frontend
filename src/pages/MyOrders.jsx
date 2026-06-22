import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");
      // Sort orders by ID descending (newest first)
      const sortedOrders = res.data.sort((a, b) => b.id - a.id);
      setOrders(sortedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('delivered')) return 'delivered';
    if (s.includes('placed')) return 'placed';
    if (s.includes('preparing') || s.includes('cooking')) return 'preparing';
    if (s.includes('cancel')) return 'cancelled';
    return 'placed';
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('delivered')) return '✅';
    if (s.includes('placed')) return '🕒';
    if (s.includes('preparing') || s.includes('cooking')) return '🔥';
    if (s.includes('cancel')) return '❌';
    return '📦';
  };

  return (
    <div className="orders-page-wrapper">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders 🚚</h1>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">🍽️</div>
            <h2>No orders yet</h2>
            <p>Looks like you haven't made your menu yet.</p>
            <button className="browse-btn" onClick={() => navigate('/')}>
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header-row">
                  <div className="order-id-group">
                    <h2>Order #{order.id}</h2>
                    {/* Displaying static text for date as API might not provide it */}
                    <span className="order-date">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Recent Order'}
                    </span>
                  </div>
                  <div className={`order-status-badge ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </div>
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="order-items-summary">
                    {order.items.map(item => item.name).join(', ')}
                  </div>
                )}

                <div className="order-details-row">
                  <div className="order-amount-group">
                    <span className="order-amount-label">Total Amount</span>
                    <span className="order-amount">₹{order.total_price}</span>
                  </div>
                  <button 
                    className="track-order-btn"
                    onClick={() => navigate(`/track/${order.id}`)}
                  >
                    Track Order 🛵
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
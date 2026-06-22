import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "./RestaurantMenu.css"; // Added CSS import

function RestaurantMenu() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getFoods();
    getCart();
  }, []);

  const getFoods = async () => {
    try {
      const res = await API.get(`/foods/${id}`);
      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    try {
      const res = await API.get("/cart/my-cart");
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = async (foodId) => {
    try {
      await API.post("/cart/add", {
        food_id: foodId,
        quantity: 1,
      });
      getCart();
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.detail || "Add cart failed");
    }
  };

  const removeCart = async (foodId) => {
    try {
      const item = cart.find((c) => c.food_id === foodId);
      if (!item) {
        return;
      }
      await API.delete(`/cart/remove/${item.id}`);

      // instantly update frontend also
      setCart((prev) =>
        prev
          .map((c) =>
            c.id === item.id
              ? {
                  ...c,
                  quantity: c.quantity - 1,
                }
              : c
          )
          .filter((c) => c.quantity > 0)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getQuantity = (foodId) => {
    const item = cart.find((c) => c.food_id === foodId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="restaurant-menu-page">
      <section className="menu-hero">
        <h1 className="menu-hero-title">Restaurant Menu 🍔</h1>
        <p className="menu-hero-subtitle">
          Explore our delicious offerings, crafted with the freshest ingredients just for you.
        </p>
      </section>

      <main className="menu-container">
        <div className="menu-section-header">
          <h2 className="menu-section-title">All Items</h2>
          <span className="results-count">{foods.length} items</span>
        </div>

        {foods.length === 0 ? (
          <div className="menu-empty-state">
            <div className="menu-empty-icon">🍽️</div>
            <p className="menu-empty-text">No items found for this restaurant.</p>
          </div>
        ) : (
          <div className="food-container">
            {foods.map((food) => (
              <div className="food-card" key={food.id}>
                <div className="image-container">
                  <img
                    src={food.image_url}
                    className="food-image"
                    alt={food.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                      e.target.parentElement.querySelector(".image-fallback").style.display = "flex";
                    }}
                  />
                  <div className="image-fallback" style={{ display: "none" }}>
                    <span className="image-fallback-icon">🍲</span>
                    <span className="image-fallback-text">{food.name}</span>
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="food-title">{food.name}</h3>
                  <p className="food-desc">{food.description}</p>
                  
                  <div className="card-footer">
                    <div className="price-tag">₹{food.price}</div>
                    
                    {getQuantity(food.id) === 0 ? (
                      <button
                        className="add-btn"
                        onClick={() => {
                          console.log("BUTTON CLICKED");
                          addCart(food.id);
                        }}
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="qty-box-card">
                        <button onClick={() => removeCart(food.id)}>-</button>
                        <span>{getQuantity(food.id)}</span>
                        <button onClick={() => addCart(food.id)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default RestaurantMenu;
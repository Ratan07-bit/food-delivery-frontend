import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";

function Cart() {

  const [items, setItems] = useState([]);
  

  const [location,setLocation] = useState(
    localStorage.getItem("location") || 
    "Choose Location"
  );

  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);


  const getCart = async () => {
    try {
      const response = await API.get("/cart/my-cart");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (foodId) => {
    try {
      await API.post("/cart/add", {
        food_id: foodId,
        quantity: 1,
      });
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

const removeItem = async (foodId) => {


try{


const matchingItems = items.filter(
(c)=>c.food_id === foodId
);



if(matchingItems.length > 0){


const lastItem = matchingItems[matchingItems.length - 1];


await API.delete(
`/cart/remove/${lastItem.id}`
);


getCart();


}


}

catch(error){


console.log(error);


}


};

  const deleteGroup = async (foodId) => {
    try {
      // Delete all cart entries for this foodId
      const matchingItems = items.filter((c) => c.food_id === foodId);
      for (const item of matchingItems) {
        await API.delete(`/cart/remove/${item.id}`);
      }
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Group cart items by food_id
// Group cart items by food_id
const groupedCart = items;

  // Map high-quality images from Unsplash to prevent broken links
  const getFoodImage = (name, description) => {
    const nameLower = name.toLowerCase();
    const descLower = description ? description.toLowerCase() : "";
    let imageUrl = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80";
    if (nameLower.includes("biryani") || descLower.includes("biryani")) {
      imageUrl = "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80";
    } else if (nameLower.includes("burger") || descLower.includes("burger")) {
      imageUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80";
    } else if (nameLower.includes("pizza") || descLower.includes("pizza")) {
      imageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80";
    } else if (
      nameLower.includes("pasta") ||
      descLower.includes("pasta") ||
      nameLower.includes("noodle") ||
      descLower.includes("noodle") ||
      nameLower.includes("chinese") ||
      descLower.includes("chinese")
    ) {
      imageUrl = "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80";
    } else if (
      nameLower.includes("cake") ||
      descLower.includes("cake") ||
      nameLower.includes("dessert") ||
      descLower.includes("dessert") ||
      nameLower.includes("sweet") ||
      descLower.includes("sweet")
    ) {
      imageUrl = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";
    } else if (
      nameLower.includes("salad") ||
      descLower.includes("salad") ||
      nameLower.includes("healthy") ||
      descLower.includes("healthy")
    ) {
      imageUrl = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80";
    } else if (
      nameLower.includes("paneer") ||
      nameLower.includes("dal") ||
      nameLower.includes("roti") ||
      nameLower.includes("veg")
    ) {
      imageUrl = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80";
    }
    return imageUrl;
  };

  // Resolve grouped cart items with complete food details
  const resolvedItems = groupedCart.map((group)=>{

return {

...group,

foodDetails:group.food

};

});

  // Computation of Bill details
  const itemsTotal = resolvedItems.reduce((sum, item) => sum + item.foodDetails.price * item.quantity, 0);
  const deliveryFee = itemsTotal > 0 ? 40 : 0;
  const gstCharges = itemsTotal > 0 ? Math.round(itemsTotal * 0.05) : 0; // 5% GST
  const platformFee = itemsTotal > 0 ? 5 : 0;
  const grandTotal = itemsTotal + deliveryFee + gstCharges + platformFee;

  const handleCheckout = () => {
    alert("Checkout Successful! Your food is on its way. 🚴");
    // Mock clearing cart by deleting all rows
    const deletePromises = items.map((item) => API.delete(`/cart/remove/${item.id}`));
    Promise.all(deletePromises)
      .then(() => {
        setItems([]);
        navigate("/home");
      })
      .catch((err) => {
        console.log("Error during checkout cart clearing", err);
        navigate("/home");
      });
  };

  return (
    <div>
      {/* Sticky Header consistent with Home Page */}
      <div className="navbar-wrapper">
        <div className="container navbar">
          <div className="nav-left">
            <div className="logo" onClick={() => navigate("/home")}>
              <span>FoodExpress</span>
              <span>🍔</span>
            </div>
            <div className="location-picker">

    <span>📍</span>

    <span className="city">

        {
          location.split(",")[0]
        }

    </span>

    <span>▾</span>

</div>
          </div>

          <div className="nav-right">
            <button className="nav-link" onClick={() => navigate("/home")}>
              Home
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container cart-page-wrapper">
        {resolvedItems.length === 0 ? (
          /* Sleek Empty State */
          <div className="empty-cart-card">
            <div className="empty-cart-illustration">🍳</div>
            <h2>Your cart is empty</h2>
            <p>
              You haven't added any items to your cart yet. Browse our delicious menu and find something delicious to
              eat!
            </p>
            <button className="empty-cart-btn" onClick={() => navigate("/home")}>
              See restaurants near you
            </button>
          </div>
        ) : (
          /* Split-pane Checkout Layout */
          <div className="cart-split-layout">
            {/* Left pane - Cart items list */}
            <div className="cart-left-pane">
              <h2 className="cart-header-title">Items in your cart</h2>
              <div className="cart-items-list">
                {resolvedItems.map((item) => (
                  <div className="cart-item-row" key={item.food_id}>
                    <img
                      src={getFoodImage(item.foodDetails.name, item.foodDetails.description)}
                      alt={item.foodDetails.name}
                      className="cart-item-img"
                    />

                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.foodDetails.name}</h3>
                      <p className="cart-item-desc">{item.foodDetails.description}</p>
                      <div className="cart-item-price">₹{item.foodDetails.price}</div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="qty-box-card">
                        <button onClick={() => removeItem(item.food_id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addItem(item.food_id)}>+</button>
                      </div>

                      <button
                        className="cart-item-remove-icon"
                        onClick={() => deleteGroup(item.food_id)}
                        title="Remove all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right pane - Billing summary details */}
            <div className="cart-right-pane">
              <div className="cart-billing-card">
                <h3 className="billing-title">Bill Details</h3>
                <div className="billing-details">
                  <div className="billing-row">
                    <span>Item Total</span>
                    <span className="val">₹{itemsTotal}</span>
                  </div>

                  <div className="billing-row">
                    <span>Delivery Partner Fee</span>
                    <span className="val">₹{deliveryFee}</span>
                  </div>

                  <div className="billing-row">
                    <span>Platform Fee</span>
                    <span className="val">₹{platformFee}</span>
                  </div>

                  <div className="billing-row">
                    <span>GST & Restaurant Charges</span>
                    <span className="val">₹{gstCharges}</span>
                  </div>

                  <div className="billing-row total-row">
                    <span>TO PAY</span>
                    <span className="val">₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              <button
className="checkout-btn"
onClick={()=>navigate("/payment")}
>

Proceed to Checkout →

</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
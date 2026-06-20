import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";
import usePlacesAutocomplete from "use-places-autocomplete";

function Home() {
  const [foods, setFoods] = useState([]);
const [cart, setCart] = useState([]);

const [location, setLocation] = useState(
  "Select Location"
);

const [showLocationBox,setShowLocationBox] = useState(false);
const [selectedPlace,setSelectedPlace] = useState(false);

const {

 value,
 setValue,
 suggestions:{status,data},
 clearSuggestions

} = usePlacesAutocomplete({

 debounce:300,

 requestOptions:{

  componentRestrictions:{
    country:"in"
  }

 }

});
  
  // Navigation & Search/Filter states
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [vegOnly, setVegOnly] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);

 useEffect(()=>{


getFoods();

getCart();


const savedLocation =
localStorage.getItem("location");


if(savedLocation){

setLocation(savedLocation.split(",")[0]);

}
else{

detectLocation();

}


},[]);

  const getFoods = async () => {
    try {
      const response = await API.get("/foods/all");
      setFoods(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
  try {

    const response = await API.get(
      "/cart/my-cart"
    );

    setCart(response.data);

  } catch (error) {

    console.log(error);

  }
};



// LOCATION DETECT FUNCTION 👇

const detectLocation = () => {


  if(!navigator.geolocation){

    alert("Location not supported");
    return;

  }


  navigator.geolocation.getCurrentPosition(

    async(position)=>{


      const lat = position.coords.latitude;

      const lon = position.coords.longitude;



      const response = await fetch(

`https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${lat}&lon=${lon}`

      );


      const data = await response.json();



      const address = data.address;



      const finalLocation =

      address.building ||

      address.road ||

      address.neighbourhood ||

      address.suburb ||

      address.city ||

      address.town ||

      address.state;



      setLocation(finalLocation);



      localStorage.setItem(
        "location",
        finalLocation
      );


      setShowLocationBox(false);


    },


    ()=>{

      alert("Please allow location permission");

    }


  );


};



  const addCart = async (foodId) => {
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

  const removeCart = async (foodId) => {
    try {
      const item = cart.find((c) => c.food_id === foodId);
      if (item) {
        await API.delete(`/cart/remove/${item.id}`);
        getCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuantity = (foodId) => {
    return cart.filter((c) => c.food_id === foodId).length;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Static Categories list
  const categories = [
    { name: "All", emoji: "🍽️" },
    { name: "Biryani", emoji: "🍛" },
    { name: "Burger", emoji: "🍔" },
    { name: "Pizza", emoji: "🍕" },
    { name: "North Indian", emoji: "🍲" },
    { name: "Chinese", emoji: "🥢" },
    { name: "Desserts", emoji: "🍰" },
    { name: "Healthy", emoji: "🥗" },
  ];

  // Helper function to enrich food items with images, ratings, delivery times, and veg details
  const enrichFood = (food) => {
    // Deterministic rating based on ID: ranges from 3.7 to 4.8
    const rating = (((food.id * 7) % 12) / 10 + 3.7).toFixed(1);
    
    // Deterministic delivery time: ranges from 18 to 43 minutes
    const deliveryTime = ((food.id * 13) % 26) + 18;

    // Check if the item is vegetarian
    const nameLower = food.name.toLowerCase();
    const descLower = food.description.toLowerCase();
    const isVeg = !(
      nameLower.includes("chicken") ||
      nameLower.includes("mutton") ||
      nameLower.includes("fish") ||
      nameLower.includes("egg") ||
      nameLower.includes("beef") ||
      nameLower.includes("pork") ||
      nameLower.includes("meat") ||
      nameLower.includes("kabab") ||
      nameLower.includes("kebab") ||
      descLower.includes("chicken") ||
      descLower.includes("mutton") ||
      descLower.includes("fish")
    );

    // High quality images from Unsplash to prevent broken links
    let imageUrl = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80";
    if (nameLower.includes("biryani") || descLower.includes("biryani")) {
      imageUrl = "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=600&q=80";
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

    // Deterministic promotion offers
    const offers = ["50% OFF", "FREE DELIVERY", "10% OFF", null];
    const offer = offers[food.id % offers.length];

    return { ...food, rating, deliveryTime, isVeg, imageUrl, offer };
  };

  const enrichedFoods = foods.map(enrichFood);

  // Filter and sort items based on current control states
  const filteredFoods = enrichedFoods.filter((food) => {
    // 1. Text Search Filter
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Category Filter
    const matchesCategory =
      selectedCategory === "All" ||
      food.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      food.description.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "North Indian" &&
        (food.name.toLowerCase().includes("dal") ||
          food.name.toLowerCase().includes("paneer") ||
          food.name.toLowerCase().includes("roti") ||
          food.name.toLowerCase().includes("curry"))) ||
      (selectedCategory === "Healthy" &&
        (food.name.toLowerCase().includes("salad") ||
          food.description.toLowerCase().includes("salad")));

    // 3. Pure Veg Filter
    const matchesVeg = !vegOnly || food.isVeg;

    // 4. Fast Delivery (< 30 minutes)
    const matchesFast = !fastDelivery || food.deliveryTime <= 30;

    return matchesSearch && matchesCategory && matchesVeg && matchesFast;
  });

  // Sort filtered food items
  if (sortBy === "price-low") {
    filteredFoods.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredFoods.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredFoods.sort((a, b) => b.rating - a.rating);
  }

  return (

<div>


{
showLocationBox && (

<div className="location-popup">

<div className="location-card">


<h2>
Choose Location 📍
</h2>


<input

placeholder="Search area, street, apartment"

value={value}

onChange={(e)=>{

setValue(e.target.value);

setSelectedPlace(false);

}}

/>


<div className="suggestions">


{

data.map((place)=>(


<div

className="suggestion-item"

key={place.place_id}


onClick={()=>{


setSelectedPlace(true);


setLocation(
place.description.split(",")[0]
);


localStorage.setItem(
"location",
place.description
);


setValue(
place.description,
false
);


clearSuggestions();


setShowLocationBox(false);


}}

>

📍 {place.description}

</div>


))}


</div>



<button

onClick={()=>{


if(!selectedPlace){

alert("Please select location from suggestions");

return;

}


setShowLocationBox(false);


}}

>

Save Location

</button>


<button onClick={detectLocation}>
Use Current Location
</button>


<button onClick={()=>setShowLocationBox(false)}>
Cancel
</button>


</div>

</div>

)
}


{/* Navbar Section */}
      {/* Navbar Section */}
      <div className="navbar-wrapper">
        <div className="container navbar">
          <div className="nav-left">
            <div className="logo" onClick={() => navigate("/home")}>
              <span>FoodExpress</span>
              <span>🍔</span>
            </div>
            <div 
className="location-picker"
onClick={()=>setShowLocationBox(true)}
>

    <span>📍</span>

    <span className="city">
        {location}
    </span>

    <span> ▾</span>

</div>
          </div>

          <div className="nav-center">
            <div className="search-box-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search for dishes, cuisines, or ingredients..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="nav-right">
            <button className="cart-btn-nav" onClick={() => navigate("/cart")}>
              <span>🛒</span>
              <span>Cart</span>
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-wrapper">
        <div className="container">
          <h1 className="hero-title">Order your favourite food</h1>
          <p className="hero-subtitle">Fast delivery at your doorstep 🚀</p>
        </div>
      </div>

      <div className="container">
        {/* Categories Horizontal Carousel */}
        <div className="categories-wrapper">
          <h3 className="categories-header">What's on your mind?</h3>
          <div className="categories-list">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`category-card ${selectedCategory === cat.name ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <div className="category-image-container">{cat.emoji}</div>
                <span className="category-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sorting Pills */}
        <div className="filters-wrapper">
          <div className="filters-left">
            <button
              className={`filter-pill ${sortBy === "rating" ? "active" : ""}`}
              onClick={() => setSortBy(sortBy === "rating" ? "relevance" : "rating")}
            >
              ⭐ Top Rated
            </button>

            <button
              className={`filter-pill ${vegOnly ? "active" : ""}`}
              onClick={() => setVegOnly(!vegOnly)}
            >
              🟢 Pure Veg
            </button>

            <button
              className={`filter-pill ${fastDelivery ? "active" : ""}`}
              onClick={() => setFastDelivery(!fastDelivery)}
            >
              ⚡ Fast Delivery
            </button>

            <button
              className={`filter-pill ${sortBy === "price-low" ? "active" : ""}`}
              onClick={() => setSortBy(sortBy === "price-low" ? "relevance" : "price-low")}
            >
              Rs. Low to High
            </button>

            <button
              className={`filter-pill ${sortBy === "price-high" ? "active" : ""}`}
              onClick={() => setSortBy(sortBy === "price-high" ? "relevance" : "price-high")}
            >
              Rs. High to Low
            </button>
          </div>

          <div className="filters-right">
            <span className="results-count">Showing {filteredFoods.length} dishes</span>
          </div>
        </div>

        {/* Section Heading */}
        <h2 className="food-section-title">
          {selectedCategory === "All" ? "Popular dishes near you" : `Delicious ${selectedCategory} options`}
        </h2>

        {/* Food Cards Grid */}
        <div className="food-container">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div className="food-card" key={food.id}>
                <div className="image-container">
                  <img src={food.imageUrl} alt={food.name} className="food-image" />
                  {food.offer && <div className="card-overlay-badge">{food.offer}</div>}
                  {food.isVeg && <div className="veg-icon" title="Pure Vegetarian" />}
                </div>

                <div className="card-content">
                  <h3 className="food-title">{food.name}</h3>

                  <div className="rating-delivery-row">
                    <span className={`rating-badge ${parseFloat(food.rating) < 4.0 ? "rating-mid" : ""}`}>
                      ⭐ {food.rating}
                    </span>
                    <span className="delivery-time">⏱️ {food.deliveryTime} mins</span>
                  </div>

                  <p className="food-desc">{food.description}</p>

                  <div className="card-footer">
                    <span className="price-tag">₹{food.price}</span>

                    {getQuantity(food.id) === 0 ? (
                      <button className="add-btn" onClick={() => addCart(food.id)}>
                        Add
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
            ))
          ) : (
            <div style={{ gridColumn: "1/-1", padding: "60px 20px", textAlign: "center" }}>
              <h3>No dishes found matching your criteria.</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                Try clearing filters or searching for something else!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
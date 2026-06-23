import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";
import usePlacesAutocomplete from "use-places-autocomplete";

function Home() {
  const [restaurants,setRestaurants] = useState([]);
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


getRestaurants();

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

  const getRestaurants = async()=>{


try{


const response = await API.get(
"/restaurants/all"
);


setRestaurants(response.data);


}
catch(error){

console.log(error);

}


};

const getCart = async()=>{


const token = localStorage.getItem("token");


if(!token){

setCart([]);

return;

}


try{


const response = await API.get(
"/cart/my-cart"
);


setCart(response.data);


}
catch(error){

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
<button 

className="cart-btn-nav"

onClick={()=>navigate("/cart")}

>
              <span>🛒</span>
              <span>Cart</span>
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </button>
            {
localStorage.getItem("token") ?

<button 
className="logout-btn" 
onClick={handleLogout}
>

Logout

</button>

:

<button

className="logout-btn"

onClick={()=>navigate("/login")}

>

Login

</button>

}
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
            <span className="results-count">
Showing {restaurants.length} restaurants
</span>
          </div>
        </div>


{/* Restaurant Cards Grid */}

<h2 className="food-section-title">
Restaurants near you 🍽️
</h2>


<div className="food-container">


{

restaurants.length > 0 ?

(

restaurants.map((restaurant)=>(


<div

className="food-card"

key={restaurant.id}

onClick={()=>

navigate(
`/restaurant/${restaurant.id}`
)

}

>


<div className="image-container">


<img

src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"

alt={restaurant.name}

className="food-image"

/>


</div>



<div className="card-content">


<h3 className="food-title">

{restaurant.name}

</h3>



<div className="rating-delivery-row">


<span className="rating-badge">

⭐ 4.5

</span>


<span className="delivery-time">

⏱️ 30 mins

</span>


</div>



<p className="food-desc">

📍 {restaurant.location}

</p>



<div className="card-footer">


<button className="add-btn">

View Menu

</button>


</div>



</div>


</div>


))

)

:

(

<div

style={{

gridColumn:"1/-1",

padding:"60px 20px",

textAlign:"center"

}}

>


<h3>

No restaurants available

</h3>


</div>


)

}


</div>
      </div>
    </div>
  );
}

export default Home;
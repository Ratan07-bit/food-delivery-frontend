import { useEffect, useState } from "react";
import { 
useParams,
useNavigate 
} from "react-router-dom";
import API from "../api/axios";
import "./RestaurantMenu.css"; // Added CSS import

function RestaurantMenu() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

const getCart = async()=>{


const token = localStorage.getItem("token");


if(!token){


const guestCart =
JSON.parse(
localStorage.getItem("guestCart")
) || [];


setCart(guestCart);


return;


}



try{


const res = await API.get(
"/cart/my-cart"
);


setCart(res.data);


}

catch(error){

console.log(error);

}


};

const addCart = async(foodId)=>{


const token = localStorage.getItem("token");


// USER LOGIN CART
if(token){


try{


await API.post(
"/cart/add",
{
food_id:foodId,
quantity:1
}
);


getCart();


}

catch(error){

console.log(error);

}


}


// GUEST CART
else{


const food = foods.find(
(f)=>f.id === foodId
);



let guestCart =
JSON.parse(
localStorage.getItem("guestCart")
) || [];



const existing =
guestCart.find(
(item)=>item.id===foodId
);



if(existing){


existing.quantity += 1;


}

else{


guestCart.push({

...food,

quantity:1

});


}



localStorage.setItem(
"guestCart",
JSON.stringify(guestCart)
);



setCart(guestCart);


}


};

const removeCart = async(foodId)=>{


const token =
localStorage.getItem("token");


// ======================
// GUEST USER CART
// ======================
if(!token){


let guestCart =
JSON.parse(
localStorage.getItem("guestCart")
) || [];



guestCart =
guestCart.map((item)=>


item.id === foodId

?

{
...item,
quantity:item.quantity - 1
}

:

item


)
.filter((item)=>item.quantity > 0);



localStorage.setItem(
"guestCart",
JSON.stringify(guestCart)
);



setCart(guestCart);



return;


}



// ======================
// LOGIN USER CART
// ======================


try{


const item = cart.find(
(c)=>c.food_id === foodId
);



if(!item){

return;

}



await API.delete(
`/cart/remove/${item.id}`
);



getCart();



}

catch(error){


console.log(error);


}


};

  const getQuantity=(foodId)=>{


const item = cart.find(
(c)=>
c.food_id === foodId ||
c.id === foodId
);


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
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function MyOrders(){

const [orders,setOrders]=useState([]);

const navigate = useNavigate();


useEffect(()=>{

getOrders();

},[]);


const getOrders = async()=>{

try{

const res = await API.get(
"/orders/my-orders"
);

setOrders(res.data);

}
catch(error){

console.log(error);

}

};


return(

<div>

<h1>My Orders 🚚</h1>


{
orders.length===0 ? (

<h2>No orders yet</h2>

):(

orders.map((order)=>(


<div 
key={order.id}
className="order-card"
>

<h2>
Order #{order.id}
</h2>


<p>
Amount : ₹{order.total_price}
</p>


<p>
Status : {order.status}
</p>


<button
onClick={()=>
navigate(
`/track/${order.id}`
)
}
>

Track Order

</button>


</div>


))

)

}


</div>

)


}


export default MyOrders;
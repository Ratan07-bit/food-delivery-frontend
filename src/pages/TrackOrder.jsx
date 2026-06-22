import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
 MapContainer,
 TileLayer,
 Marker,
 Popup
} from "react-leaflet";

import L from "leaflet";

import API from "../api/axios";

import "leaflet/dist/leaflet.css";
import "../App.css";



function TrackOrder(){


const {id}=useParams();


const [order,setOrder]=useState(null);



useEffect(()=>{


fetchOrder();



const interval=setInterval(()=>{


fetchOrder();


},5000);



return ()=>clearInterval(interval);



},[]);




const fetchOrder=async()=>{


try{

const res=
await API.get(`/orders/${id}`);


setOrder(res.data);



}catch(error){

console.log(error);

}


};




const bikeIcon = new L.Icon({

iconUrl:
"https://cdn-icons-png.flaticon.com/512/2972/2972185.png",

iconSize:[50,50]

});




if(!order){

return <h2>Loading...</h2>

}





return(


<div className="swiggy-track">


<div className="track-header">


<h2>
FoodExpress 🍔
</h2>


<p>
Order #{order.id} • 2 items
</p>


</div>






<MapContainer

center={[17.4933,78.3915]}

zoom={16}

className="live-map"

>


<TileLayer

url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

/>



<Marker

position={[17.4933,78.3915]}

icon={bikeIcon}

>


<Popup>

Delivery Partner 🛵

</Popup>


</Marker>



</MapContainer>








<div className="delivery-bottom-card">



<div className="guarantee">


✅ On-time Guarantee

<br/>

<span>

Delivery before 30 mins

</span>


</div>






<div className="status-row">


<div>


<h1>


{

order.status==="PLACED"
?
"Order received 🍔"
:
order.status==="PREPARING"
?
"Restaurant preparing 👨‍🍳"
:
order.status==="READY_FOR_PICKUP"
?
"Waiting for pickup 🛵"
:
order.status==="OUT_FOR_DELIVERY"
?
"Arriving soon 🛵"
:
"Order Delivered 🎉"

}


</h1>



<p>


{

order.status==="PLACED"
?
"Restaurant will accept your order soon"
:
order.status==="PREPARING"
?
"Your food is being prepared"
:
order.status==="READY_FOR_PICKUP"
?
"Food ready. Waiting for delivery pickup"
:
order.status==="OUT_FOR_DELIVERY"
?
"Your delivery partner is coming"
:
"Enjoy your food 🍔"

}


</p>


</div>




<div className="time-box">

25

<br/>

mins

</div>



</div>





<div className="partner-row">


<div>


<h3>
Delivery Partner
</h3>



{

order.delivery_partner ?

<p>

🛵 {order.delivery_partner.user.name}

</p>


:

<p>

Searching partner...

</p>


}



</div>



<button className="call-btn">

📞

</button>



</div>







<div className="progress">


<h3>
Order Journey
</h3>


<div>
{["PLACED","PREPARING","READY_FOR_PICKUP","OUT_FOR_DELIVERY","DELIVERED"].includes(order.status)
?
"✅"
:
"⚪"
}
 Order Placed
</div>



<div>
{["PREPARING","READY_FOR_PICKUP","OUT_FOR_DELIVERY","DELIVERED"].includes(order.status)
?
"✅"
:
"⚪"
}
 Food Preparing
</div>



<div>
{["READY_FOR_PICKUP","OUT_FOR_DELIVERY","DELIVERED"].includes(order.status)
?
"✅"
:
"⚪"
}
 Ready For Pickup
</div>



<div>
{["OUT_FOR_DELIVERY","DELIVERED"].includes(order.status)
?
"✅"
:
"⚪"
}
 Out For Delivery
</div>



<div>
{
order.status==="DELIVERED"
?
"🎉"
:
"⚪"
}
 Delivered
</div>


</div>





</div>



</div>


)


}



export default TrackOrder;
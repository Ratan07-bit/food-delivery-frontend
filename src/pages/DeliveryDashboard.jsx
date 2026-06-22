import { useEffect, useState } from "react";

import API from "../api/axios";


function DeliveryDashboard(){


const [orders,setOrders] = useState([]);



useEffect(()=>{


    getOrders();


    const interval = setInterval(()=>{

        getOrders();

    },5000);



    return ()=>clearInterval(interval);


},[]);



const getOrders = async()=>{


try{

    const res = await API.get(
        "/delivery/orders"
    );


    setOrders(res.data);


}catch(error){

    console.log(error);

}


};





const updateStatus = async(orderId,status)=>{


try{


await API.put(
    `/delivery/status/${orderId}?status=${status}`
);



alert("Status Updated");


getOrders();



}catch(error){


console.log(error);


alert(
    error.response.data.detail
);


}


};





return(

<div>


<h1>
Delivery Dashboard 🛵
</h1>



{

orders.length===0 ?

<h2>No Assigned Orders</h2>


:


orders.map((order)=>(


<div 
key={order.id}
className="order-card"
>


<h2>
Order #{order.id}
</h2>


<p>
Food ID : {order.food_id}
</p>


<p>
Current Status : {order.status}
</p>



{

order.status==="READY_FOR_PICKUP" &&

<button
onClick={()=>updateStatus(
order.id,
"PICKED_UP"
)}
>

Pickup Order

</button>

}




{

order.status==="OUT_FOR_DELIVERY" &&

<button
onClick={()=>updateStatus(
order.id,
"DELIVERED"
)}
>

Mark Delivered

</button>

}



</div>


))

}


</div>


)


}


export default DeliveryDashboard;
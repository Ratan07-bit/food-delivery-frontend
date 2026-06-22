import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";


function Payment(){


const navigate = useNavigate();



useEffect(()=>{

    const script = document.createElement("script");

    script.src =
    "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);


},[]);




const payNow = async()=>{


const paymentOrder = await API.post(
    "/payments/create"
);


const options = {


    key:"rzp_test_T2eHeGA2K9A3dJ",

    amount:paymentOrder.data.amount,
    order_id:paymentOrder.data.razorpay_order_id,

    currency:"INR",


    name:"FoodExpress 🍔",

    description:"Food Order Payment",



   handler:async function(response){


await API.post(

"/payments/verify",

{

razorpay_order_id:
response.razorpay_order_id,


razorpay_payment_id:
response.razorpay_payment_id,


razorpay_signature:
response.razorpay_signature

}

);



    alert(
        "Payment Successful 🎉"
    );



    navigate("/my-orders");


},



    prefill:{

        name:"Customer",

        email:"test@gmail.com",

        contact:"9999999999"

    },


    theme:{

        color:"#ff5200"

    }


};



const razor =
new window.Razorpay(options);


razor.open();



};




return(

<div className="payment-page">


<h1>
Complete Payment
</h1>


<h2>
₹308
</h2>


<button
className="pay-btn"
onClick={payNow}
>

Pay With Razorpay 💳

</button>


</div>


);


}


export default Payment;
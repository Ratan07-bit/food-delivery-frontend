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




const payNow = ()=>{


const options = {


    key:"rzp_test_T2eHeGA2K9A3dJ",

    amount:308 * 100,

    currency:"INR",


    name:"FoodExpress 🍔",

    description:"Food Order Payment",



   handler:async function(response){


    console.log(response);



    await API.post(
        "/cart/checkout"
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
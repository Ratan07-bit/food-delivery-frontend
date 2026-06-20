import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";


function DeliveryLogin(){


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");


const navigate = useNavigate();



const login = async()=>{


try{


const res = await API.post(
"/auth/login",
{
email,
password
}
);



localStorage.setItem(
"token",
res.data.access_token
);


localStorage.setItem(
"role",
res.data.role
);



alert(
"Delivery Partner Login Success 🛵"
);



navigate(
"/delivery"
);



}

catch(error){


alert(
"Invalid delivery login");


console.log(error);


}



};





return(

<div>


<h1>
Delivery Partner Login 🛵
</h1>




<input

placeholder="Delivery Email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

/>


<br/>




<input

placeholder="Password"

type="password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

/>


<br/>




<button

onClick={login}

>

Login Delivery

</button>



</div>


);


}


export default DeliveryLogin;
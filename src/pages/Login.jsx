import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";



function Login(){


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");


    const navigate = useNavigate();




    const handleLogin = async(e)=>{


        e.preventDefault();



        try{


            const response = await API.post(

                "/auth/login",

                {

                    email:email,

                    password:password

                }

            );




            localStorage.setItem(
    "token",
    response.data.access_token
);


localStorage.setItem(
    "role",
    response.data.role
);




            alert("Login Successful");




            if(response.data.role==="USER"){


                navigate("/home");


            }


            else if(response.data.role==="RESTAURANT"){


                navigate("/restaurant");


            }


            else if(response.data.role==="DELIVERY"){


                navigate("/delivery");


            }


            else if(response.data.role==="ADMIN"){


                navigate("/admin");


            }



        }

        catch(error){


            alert("Invalid Login");


        }



    };





    return (

        <div className="login-container">


            <div className="login-card">


                <h2>

                    Login

                </h2>


                <form onSubmit={handleLogin}>


                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e)=>setEmail(e.target.value)}

                        required

                    />



                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                        required

                    />



                    <button type="submit">

                        Login

                    </button>



                </form>


            </div>


        </div>

    );


}



export default Login;
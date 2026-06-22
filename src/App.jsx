import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import TrackOrder from "./pages/TrackOrder";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantLogin from "./pages/RestaurantLogin";
import DeliveryLogin from "./pages/DeliveryLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import RestaurantMenu from "./pages/RestaurantMenu";

function App(){

    return(

        <BrowserRouter>

            <Routes>

                <Route 
                    path="/"
                    element={<Login/>}
                />


                <Route

path="/home"

element={

<ProtectedRoute role="USER">

<Home/>

</ProtectedRoute>

}

/>


                <Route

path="/cart"

element={

<ProtectedRoute role="USER">

<Cart/>

</ProtectedRoute>

}

/>


                <Route

path="/admin"

element={

<ProtectedRoute role="ADMIN">

<AdminDashboard/>

</ProtectedRoute>

}

/>

               <Route

path="/payment"

element={

<ProtectedRoute role="USER">

<Payment/>

</ProtectedRoute>

}

/>

<Route

path="/my-orders"

element={

<ProtectedRoute role="USER">

<MyOrders/>

</ProtectedRoute>

}

/>

<Route

path="/track/:id"

element={

<ProtectedRoute role="USER">

<TrackOrder/>

</ProtectedRoute>

}

/>

<Route

path="/delivery-login"

element={<DeliveryLogin/>}

/>

<Route

path="/delivery"

element={

<ProtectedRoute role="DELIVERY">

<DeliveryDashboard/>

</ProtectedRoute>

}

/>

<Route

path="/restaurant"

element={

<ProtectedRoute role="RESTAURANT">

<RestaurantDashboard/>

</ProtectedRoute>

}

/>

<Route

path="/restaurant-login"

element={<RestaurantLogin/>}

/>

<Route

path="/restaurant/:id"

element={

<ProtectedRoute role="USER">

<RestaurantMenu/>

</ProtectedRoute>

}

/>


            </Routes>

        </BrowserRouter>

    );

}


export default App;
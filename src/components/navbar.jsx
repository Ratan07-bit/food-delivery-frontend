import { useNavigate } from "react-router-dom";
import { User, MapPin } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="landing-nav">

      <div 
        className="nav-logo" 
        onClick={() => navigate("/")}
      >
        
        <span className="nav-logo-text">FoodExpress</span>
        <span className="nav-logo-icon">🍔</span>
      </div>


      <div className="nav-search">
        <MapPin size={18}/>
        <input 
          type="text"
          placeholder="Search for restaurants..."
        />
      </div>


      <div className="nav-actions">

        <button 
          className="nav-btn-ghost"
          onClick={() => navigate("/login")}
        >
          <User size={18}/>
          Sign In
        </button>

        <button 
          className="nav-btn-primary"
          onClick={() => navigate("/home")}
        >
          Order Now
        </button>

      </div>

    </nav>
  );
}
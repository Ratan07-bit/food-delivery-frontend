import { useNavigate } from 'react-router-dom'
import { MapPin } from "lucide-react";
export function HeroSection() {
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <section className="hero-section">
      {/* Background Gradients */}
      <div className="hero-bg-gradient" />
      <div className="hero-bg-gradient-2" />

      <div className="hero-content">
        {/* Left Content */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>#1 Food Delivery Platform</span>
          </div>

         <h1 className="hero-title">
  Order Your Favorite
  <br />
  Food Online
</h1>

          <p className="hero-subtitle">
            Discover 50,000+ restaurants, order your favorite meals, and get them delivered in under 30 minutes. Fresh, hot, and ready to enjoy.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hero-search">

  <MapPin 
    className="hero-search-icon"
    size={26}
    strokeWidth={2.5}
  />

  <input
    type="text"
    placeholder="Enter your delivery address..."
  />

  <button type="submit" className="hero-search-btn">
    Search
  </button>

</form>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button className="hero-cta-primary" onClick={() => navigate('/home')}>
              Order Now
            </button>
            <button className="hero-cta-secondary" onClick={() => navigate('/home')}>
              Explore Restaurants →
            </button>
          </div>
        </div>

        {/* Right - Image */}
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img
              src="/images/hero-food.png"
              alt="Delicious food spread featuring pizza, burger, sushi and more"
              className="hero-image"
            />

            {/* Floating Cards */}
            <div className="hero-float-card hero-float-card-1">
              <div className="float-card-icon green">🚀</div>
              <div className="float-card-text">
                <h4>Super Fast</h4>
                <p>30 min delivery</p>
              </div>
            </div>

            <div className="hero-float-card hero-float-card-2">
              <div className="float-card-icon orange">⭐</div>
              <div className="float-card-text">
                <h4>4.9 Rating</h4>
                <p>2M+ reviews</p>
              </div>
            </div>

            <div className="hero-float-card hero-float-card-3">
              <div className="float-card-icon purple">🎁</div>
              <div className="float-card-text">
                <h4>50% Off</h4>
                <p>First order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AppSection() {
  return (
    <section className="app-section">
      <div className="app-glow" />
      <div className="app-container">
        {/* Left Content */}
        <div className="app-left">
          <span className="section-label">📱 Get The App</span>
          <h2 className="app-title">
            Download the
            <br />
            FoodExpress App
          </h2>
          <p className="app-desc">
            Get exclusive app-only offers and a seamless ordering experience. Download now and get ₹100 off on your first order!
          </p>

          <div className="app-features-list">
            <div className="app-feature-item">
              <span className="app-feature-check">✓</span>
              <span>Fast and secure ordering with one tap</span>
            </div>
            <div className="app-feature-item">
              <span className="app-feature-check">✓</span>
              <span>Real-time GPS order tracking on map</span>
            </div>
            <div className="app-feature-item">
              <span className="app-feature-check">✓</span>
              <span>Exclusive app-only deals and rewards</span>
            </div>
            <div className="app-feature-item">
              <span className="app-feature-check">✓</span>
              <span>Schedule orders for later delivery</span>
            </div>
          </div>

          {/* App Store Buttons */}
          <div className="app-store-buttons">
            <a href="#" className="app-store-btn">
              <span className="store-icon">🍎</span>
              <div>
                <div className="store-text-small">Download on the</div>
                <div className="store-text-large">App Store</div>
              </div>
            </a>
            <a href="#" className="app-store-btn">
              <span className="store-icon">▶️</span>
              <div>
                <div className="store-text-small">Get it on</div>
                <div className="store-text-large">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right - Phone mockup */}
        <div className="app-right">
          <div className="app-phone-mockup">
            <div className="phone-notch" />
            <div className="phone-content">
              <span className="phone-app-icon">🍔</span>
              <h3 className="phone-app-name">FoodExpress</h3>
              <p className="phone-app-tagline">Order food on the go</p>
              <button className="phone-cta-btn">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const footerLinks = {
  Company: ['About Us', 'Contact Us', 'Blog', 'Careers', 'Press'],
  'For Restaurants': ['Partner With Us', 'Apps For You', 'Restaurant Onboarding', 'Business Solutions'],
  'For Delivery': ['Become a Partner', 'Delivery App', 'Dashboard', 'Support'],
  'Learn More': ['Privacy Policy', 'Terms of Service', 'Security', 'Help & Support'],
}

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🍔</span>
              <span className="footer-logo-text">FoodExpress</span>
            </div>
            <p className="footer-tagline">
              Delivering happiness, one meal at a time. Fast, fresh, and always delicious.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link">f</a>
              <a href="#" className="footer-social-link">𝕏</a>
              <a href="#" className="footer-social-link">📷</a>
              <a href="#" className="footer-social-link">in</a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div className="footer-column" key={category}>
              <h4>{category}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 FoodExpress. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

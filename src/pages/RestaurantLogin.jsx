import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function RestaurantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
    "token",
    res.data.access_token
);


localStorage.setItem(
    "role",
    res.data.role
);


navigate(
    "/restaurant"
);
    } catch (error) {
      setErrorMsg("Invalid restaurant email or password. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="partner-landing-container">
      <header className="partner-header" style={{ position: "static" }}>
        <div className="partner-navbar" style={{ height: "64px" }}>
          <div className="partner-nav-left">
            <span className="partner-brand-logo">🍽️</span>
            <span className="partner-brand-text">FoodExpress</span>
            <span className="partner-logo-badge">Partner</span>
          </div>
          <div className="partner-nav-right">
            <a href="/" className="partner-logout-btn" style={{ textDecoration: "none", fontSize: "13px" }}>
              Customer Portal
            </a>
          </div>
        </div>
      </header>

      <section className="partner-landing-hero">
        <div className="partner-hero-left">
          <div className="partner-tagline-wrapper">
            <span className="partner-badge-highlight">Partner with FoodExpress</span>
            <h1 className="partner-hero-title">
              Increase your restaurant <span className="highlight">online orders</span>
            </h1>
            <p className="partner-hero-subtitle">
              Reach thousands of hungry food lovers in your locality. Sign up today and boost your kitchen sales with our premium delivery network.
            </p>

            <div className="partner-features-row">
              <div className="partner-feature-item">
                <span className="icon">🛵</span>
                <span className="text">Fast Delivery Fleet</span>
              </div>
              <div className="partner-feature-item">
                <span className="icon">📊</span>
                <span className="text">Real-Time Insights</span>
              </div>
              <div className="partner-feature-item">
                <span className="icon">⚡</span>
                <span className="text">24H Setup Process</span>
              </div>
            </div>
          </div>
        </div>

        <div className="partner-hero-right">
          <div className="partner-login-card" style={{ boxShadow: "none", margin: 0, border: "1px solid #1f293d", background: "#111524" }}>
            <div className="partner-brand" style={{ marginBottom: "16px" }}>
              <span className="partner-brand-logo" style={{ fontSize: "24px" }}>🍽️</span>
              <span className="partner-brand-text" style={{ fontSize: "20px" }}>FoodExpress</span>
              <span className="partner-logo-badge">Partner</span>
            </div>

            <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>Get Started</h2>
            <p className="subtitle" style={{ marginBottom: "24px" }}>Enter restaurant login email to continue</p>

            {errorMsg && (
              <div className="partner-error-alert" style={{ padding: "10px 14px", fontSize: "13px" }}>
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="partner-input-group">
                <label className="partner-input-label">RESTAURANT EMAIL</label>
                <div className="partner-input-field-wrapper">
                  <span className="partner-input-icon">✉️</span>
                  <input
                    className="partner-input-field"
                    placeholder="partner@foodexpress.com"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="partner-input-group">
                <label className="partner-input-label">PASSWORD</label>
                <div className="partner-input-field-wrapper">
                  <span className="partner-input-icon">🔒</span>
                  <input
                    className="partner-input-field"
                    placeholder="••••••••"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button className="partner-login-btn" type="submit" disabled={isLoading} style={{ marginTop: "8px" }}>
                {isLoading ? "Signing in..." : "Login Restaurant"}
              </button>
            </form>

            <div className="partner-login-footer" style={{ marginTop: "24px" }}>
              <p>
                Are you a customer? <a href="/">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-onboarding-section">
        <div className="partner-onboarding-title">
          <h2>Get your restaurant delivery-ready in 24hrs!</h2>
          <p>Complete your partner signup in just 3 easy steps</p>
        </div>

        <div className="partner-onboarding-grid">
          <div className="partner-steps-panel">
            <h3><span>📋</span> Registration Steps</h3>
            <div className="partner-steps-timeline">
              <div className="partner-timeline-item">
                <div className="partner-timeline-badge">1</div>
                <div className="partner-timeline-content">
                  <h4>Install the FoodExpress Owner App</h4>
                  <p>Download the merchant application on your tablet or smartphone to manage ongoing delivery requests.</p>
                </div>
              </div>

              <div className="partner-timeline-item">
                <div className="partner-timeline-badge">2</div>
                <div className="partner-timeline-content">
                  <h4>Register & Verify Email</h4>
                  <p>Provide restaurant credentials and activate your email security profile to secure operations.</p>
                </div>
              </div>

              <div className="partner-timeline-item">
                <div className="partner-timeline-badge">3</div>
                <div className="partner-timeline-content">
                  <h4>Enter Restaurant Details</h4>
                  <p>Upload your kitchen menu items, define operational times, and pin geographical coordinates.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="partner-docs-panel">
            <h3><span>📁</span> Required Checklist</h3>
            <p className="desc">Keep these verified documents handy for a fast and frictionless registration process:</p>
            <ul className="partner-docs-list">
              <li className="partner-doc-item">
                <div className="partner-doc-left">
                  <span className="bullet">🔸</span>
                  <span>FSSAI License Copy</span>
                </div>
                <span className="partner-doc-link">Apply Here</span>
              </li>

              <li className="partner-doc-item">
                <div className="partner-doc-left">
                  <span className="bullet">🔸</span>
                  <span>Your Restaurant Menu Card</span>
                </div>
                <span className="partner-doc-link">Upload</span>
              </li>

              <li className="partner-doc-item">
                <div className="partner-doc-left">
                  <span className="bullet">🔸</span>
                  <span>Bank details (Cancelled Cheque)</span>
                </div>
                <span className="partner-doc-link">Configure</span>
              </li>

              <li className="partner-doc-item">
                <div className="partner-doc-left">
                  <span className="bullet">🔸</span>
                  <span>GSTIN / PAN Card Copy</span>
                </div>
                <span className="partner-doc-link">Apply Here</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RestaurantLogin;
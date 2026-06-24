const features = [
  {
    icon: '⚡',
    iconClass: '',
    title: 'Lightning Delivery',
    description: 'Get your food in under 30 minutes. Our optimized delivery network ensures your meals arrive hot and fresh.',
  },
  {
    icon: '🥗',
    iconClass: 'green',
    title: 'Healthy Choices',
    description: 'Browse thousands of healthy and diet-friendly options curated just for your nutritional goals.',
  },
  {
    icon: '🎯',
    iconClass: 'purple',
    title: 'Smart Recommendations',
    description: 'Our AI learns your taste preferences and suggests restaurants and dishes you will love.',
  },
  {
    icon: '📍',
    iconClass: 'blue',
    title: 'Live Order Tracking',
    description: 'Track your delivery in real-time on the map. Know exactly when your food will arrive at your door.',
  },
  {
    icon: '💰',
    iconClass: 'yellow',
    title: 'Best Deals Daily',
    description: 'Exclusive discounts, cashback offers, and combo deals. Save money on every single order you place.',
  },
  {
    icon: '🛡️',
    iconClass: 'pink',
    title: 'Safe & Hygienic',
    description: 'All partner restaurants are verified for quality and hygiene. Your safety is our top priority.',
  },
]

export function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="section-header">
          <span className="section-label">✨ Why Choose Us</span>
          <h2 className="section-title">
            Everything You Need
            <br />
            For a Perfect Meal
          </h2>
          <p className="section-subtitle">
            Experience food delivery like never before with our cutting-edge technology and exceptional service quality.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className={`feature-icon ${feature.iconClass}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

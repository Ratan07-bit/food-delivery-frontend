const stats = [
  {
    icon: '🏪',
    value: '50K+',
    label: 'Partner Restaurants',
  },
  {
    icon: '🌍',
    value: '500+',
    label: 'Cities Covered',
  },
  {
    icon: '📦',
    value: '100M+',
    label: 'Orders Delivered',
  },
  {
    icon: '👥',
    value: '10M+',
    label: 'Happy Customers',
  },
]

export function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="section-header">
          <span className="section-label">📊 By The Numbers</span>
          <h2 className="section-title">
            Trusted by Millions
          </h2>
          <p className="section-subtitle">
            Join millions of satisfied customers who order from FoodExpress every day.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

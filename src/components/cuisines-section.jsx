import { useNavigate } from 'react-router-dom'

const cuisines = [
  { emoji: '🍕', name: 'Pizza', count: '2,400+ spots' },
  { emoji: '🍔', name: 'Burgers', count: '3,100+ spots' },
  { emoji: '🍣', name: 'Sushi', count: '1,800+ spots' },
  { emoji: '🌮', name: 'Mexican', count: '1,500+ spots' },
  { emoji: '🍜', name: 'Asian', count: '2,800+ spots' },
  { emoji: '🥘', name: 'Indian', count: '2,200+ spots' },
]

export function CuisinesSection() {
  const navigate = useNavigate()

  return (
    <section className="cuisines-section">
      <div className="cuisines-container">
        <div className="section-header">
          <span className="section-label">🍽️ Popular Cuisines</span>
          <h2 className="section-title">
            Explore By Cuisine
          </h2>
          <p className="section-subtitle">
            From local favorites to international delicacies. Whatever you crave, we have got it covered.
          </p>
        </div>

        <div className="cuisines-scroll">
          {cuisines.map((cuisine, index) => (
            <div
              className="cuisine-card"
              key={index}
              onClick={() => navigate('/home')}
            >
              <span className="cuisine-emoji">{cuisine.emoji}</span>
              <div className="cuisine-name">{cuisine.name}</div>
              <div className="cuisine-count">{cuisine.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

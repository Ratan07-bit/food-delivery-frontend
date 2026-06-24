const testimonials = [
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"FoodExpress is incredible! The delivery was so fast I could barely believe it. The food arrived hot and fresh. Best food delivery app I have ever used!"',
    avatar: '👨',
    name: 'Rahul Sharma',
    role: 'Regular Customer',
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"Love the variety of restaurants available. I can find everything from gourmet sushi to comfort food burgers. The tracking feature is amazing too!"',
    avatar: '👩',
    name: 'Priya Patel',
    role: 'Food Enthusiast',
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: '"As a restaurant partner, FoodExpress has helped us reach so many more customers. The platform is easy to use and the support team is fantastic."',
    avatar: '👨‍🍳',
    name: 'Chef Arjun',
    role: 'Restaurant Partner',
  },
]

export function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header">
          <span className="section-label">💬 Testimonials</span>
          <h2 className="section-title">
            What Our Customers Say
          </h2>
          <p className="section-subtitle">
            Hear from real customers who love ordering with FoodExpress.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-stars">{testimonial.stars}</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div>
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

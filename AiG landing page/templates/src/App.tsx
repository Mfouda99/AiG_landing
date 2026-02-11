import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import jsVectorMap from 'jsvectormap/dist/jsvectormap.esm.js'
import 'jsvectormap/dist/jsvectormap.min.css'
import 'jsvectormap/dist/maps/world.js'
import HeroSection from './components/HeroSection'

// Import images
import teamPhoto from '/team-photo.jpg'
import volunteerIcon from '/volunteer-icon.png'
import talentIcon from '/talent-icon.png'
import teacherIcon from '/teacher-icon.png'
import memberIcon from '/member-icon.png'
import whiteBlueLogo from '/White-Blue-Logo.png'
import blueLogo from '/Blue-Logo.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const statsRef = useRef(null)
  const mapRef = useRef(null)
  const hasAnimated = useRef(false)
  const mapInstance = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    }

    const animateCounter = (element, target) => {
      const duration = 1500 // 1.5 seconds
      const startTime = performance.now()

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const current = Math.floor(progress * target)
        
        if (target >= 1000) {
          const kValue = (current / 1000).toFixed(progress < 1 ? 1 : 0)
          element.textContent = `${kValue}k`
        } else {
          element.textContent = current.toString()
        }
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }
      
      requestAnimationFrame(updateCounter)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const counters = entry.target.querySelectorAll('.stat-number')
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'))
            animateCounter(counter, target)
          })
        }
      })
    }, observerOptions)

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // AIESEC Countries - ISO 3166-1 alpha-2 codes
      const aiesecCountries = [
        'AL', 'DZ', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BH', 'BD', 'BE', 'BJ', 'BO', 
        'BA', 'BR', 'BG', 'BF', 'KH', 'CM', 'CA', 'CL', 'CN', 'CO', 'CR', 'HR', 
        'CZ', 'DK', 'DO', 'EC', 'EG', 'SV', 'EE', 'ET', 'FI', 'FR', 'GE', 'DE', 
        'GH', 'GR', 'GT', 'HK', 'HU', 'IS', 'IN', 'ID', 'IT', 'CI', 'JP', 'JO', 
        'KZ', 'KE', 'KW', 'KG', 'LV', 'LB', 'LR', 'LT', 'MY', 'MX', 'MD', 'MN', 
        'ME', 'MA', 'MZ', 'MM', 'NP', 'NL', 'NZ', 'NI', 'NG', 'MK', 'NO', 'PK', 
        'PA', 'PY', 'PE', 'PH', 'PL', 'PT', 'RO', 'RU', 'RW', 'SN', 'RS', 'SG', 
        'SK', 'ZA', 'KR', 'ES', 'LK', 'SE', 'CH', 'TW', 'TZ', 'TH', 'TG', 'TN', 
        'TR', 'UG', 'UA', 'AE', 'GB', 'US', 'VE', 'VN'
      ]

      const selectedRegions = {}
      aiesecCountries.forEach(code => {
        selectedRegions[code] = true
      })

      mapInstance.current = new jsVectorMap({
        selector: mapRef.current,
        map: 'world',
        zoomButtons: false,
        zoomOnScroll: false,
        draggable: false,
        selectedRegions: aiesecCountries,
        regionStyle: {
          initial: {
            fill: '#d0d0d0',
            fillOpacity: 0.4,
            stroke: 'rgba(255, 255, 255, 0.6)',
            strokeWidth: 1
          },
          hover: {
            fill: '#a0a0a0',
            fillOpacity: 0.6,
            cursor: 'default'
          },
          selected: {
            fill: '#5eb3f6',
            fillOpacity: 0.85,
            stroke: 'rgba(255, 255, 255, 0.8)',
            strokeWidth: 1
          },
          selectedHover: {
            fill: '#0a7aff',
            fillOpacity: 1,
            cursor: 'pointer'
          }
        },
        backgroundColor: 'transparent'
      })
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={whiteBlueLogo} alt="AIESEC" className="logo-img" />
          </div>
          
          <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
              <a href="#products" onClick={(e) => {
                 if (isMenuOpen) {
                   e.preventDefault()
                   setIsDropdownOpen(!isDropdownOpen)
                 }
              }}>
                Our Products
                {isMenuOpen && <span style={{marginLeft: '8px', fontSize: '0.8em'}}>
                  {isDropdownOpen ? '▲' : '▼'}
                </span>}
              </a>
              <div className="dropdown-menu">
                <Link to="/global-volunteer" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Global Volunteer</Link>
                <Link to="/global-talent" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Global Talent</Link>
                <Link to="/global-teacher" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Global Teacher</Link>
                <Link to="/member" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>AIESEC Member</Link>
              </div>
            </li>
          </ul>
          
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • ABOUT AIESEC • </p>
          </div>
        </div>
        
        <div className="intro-container">
          <div className="intro-creative-layout">
            <div className="intro-content glass-content">
              <h2>Here is the first step to<br />a life changing experience</h2>
              <p>
               AIESEC is the largest youth run organization, striving everyday with our global volunteers, interns, teachers and members for peace and fulfilment of human kinds potential
              </p>
              <button 
                className="explore-btn"
                onClick={() => {
                  document.getElementById('products-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Explore our Programs
              </button>
            </div>
            
            <div className="floating-images">
              <div className="float-img float-1">
                <img src="/static/landing6.png" alt="Team" />
              </div>
              <div className="float-img float-2">
                <img src="/static/landing7.png" alt="Team" />
              </div>
              <div className="float-img float-3">
                <img src="/static/landing8.png" alt="Team" />
              </div>
              <div className="float-img float-4">
                <img src="/static/landing9.png" alt="Team" />
              </div>
              <div className="float-img float-5">
                <img src="/static/landing10.png" alt="Team" />
              </div>
              <div className="float-img float-6">
                <img src="/static/team-photo.jpg" alt="Team" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter Section */}
        <div className="stats-section" ref={statsRef}>
          <div className="stats-container">
            <div className="stat-item">
              <h3 className="stat-number" data-target="30000">0</h3>
              <p className="stat-label">
                EXCHANGE EVERY<br />
                YEAR
              </p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number" data-target="1200">0</h3>
              <p className="stat-label">
                MEMBERS
              </p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number" data-target="80">0</h3>
              <p className="stat-label">
                PARTNER<br />
                ORGANIZATION
              </p>
            </div>
          </div>

          {/* World Map Section */}
          <div className="world-map-section">
            <div className="map-container">
              <h3 className="stat-number map-number" data-target="120">0</h3>
              <p className="map-label">countries and territories</p>
              <div className="world-map">
                <div ref={mapRef} className="jsvectormap-container"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section"  className="products-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • OUR PRODUCTS • </p>
          </div>
        </div>
        
        <div className="products-container">
          <div className="product-card volunteer">
            <div className="product-icon">
              <img src={volunteerIcon} alt="Global Volunteer" />
            </div>
            <p>
              Global Volunteer is a cross-cultural experience for young 
              people aged 18 to 30 who want to contribute to the United 
              Nations Sustainable Development Goals (SDGs)
            </p>
            <Link to="/global-volunteer" className="product-btn volunteer-btn">
              Learn More
            </Link>
          </div>

          <div className="product-card talent">
            <div className="product-icon">
              <img src={talentIcon} alt="Global Talent" />
            </div>
            <p>
              Global Talent is an internship for young people, ages 18 to 30, 
              aiming towards professional career development in a global 
              setting.
            </p>
            <Link to="/global-talent" className="product-btn talent-btn">
              Learn More
            </Link>
          </div>

          <div className="product-card teacher">
            <div className="product-icon">
              <img src={teacherIcon} alt="Global Teacher" />
            </div>
            <p>
              Global Teacher is a global teaching internship opportunity for 
              young people who want to develop themselves and their career 
              by engaging with a professional teaching experience.
            </p>
            <Link to="/global-teacher" className="product-btn teacher-btn">
              Learn More
            </Link>
          </div>

          <div className="product-card member">
            <div className="product-icon">
              <img src={memberIcon} alt="AIESEC Member" />
            </div>
            <p>
              AIESEC member is an informal education for youth, that focus on 
              leadership as a core. We develop young people by delivering a 
              personalized, relevant, and measurable leadership development 
              experience
            </p>
            <Link to="/member" className="product-btn member-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • WHAT THEY ARE SAYING • </p>
          </div>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonial-card red">
            <div className="testimonial-image-wrapper">
              <img src={teamPhoto} alt="Team Member" className="testimonial-bg-img" />
            </div>
            <div className="testimonial-content">
              <div className="testimonial-info">
                <h4>John Anderson</h4>
                <p className="testimonial-role">Global Volunteer</p>
              </div>
              <p className="testimonial-text">
                "My experience with AIESEC has been transformative. I've grown as a leader 
                and made connections that will last a lifetime. The opportunity to work on 
                sustainable development projects opened my eyes to global challenges."
              </p>
            </div>
          </div>

          <div className="testimonial-card cyan">
            <div className="testimonial-image-wrapper">
              <img src={teamPhoto} alt="Team Member" className="testimonial-bg-img" />
            </div>
            <div className="testimonial-content">
              <div className="testimonial-info">
                <h4>Maria Santos</h4>
                <p className="testimonial-role">Global Talent</p>
              </div>
              <p className="testimonial-text">
                "The internship program helped me kickstart my career in a global setting. 
                Working across cultures taught me invaluable skills that I use every day. 
                AIESEC truly develops young leaders."
              </p>
            </div>
          </div>

          <div className="testimonial-card orange">
            <div className="testimonial-image-wrapper">
              <img src={teamPhoto} alt="Team Member" className="testimonial-bg-img" />
            </div>
            <div className="testimonial-content">
              <div className="testimonial-info">
                <h4>David Chen</h4>
                <p className="testimonial-role">Global Teacher</p>
              </div>
              <p className="testimonial-text">
                "Teaching abroad through AIESEC changed my perspective on education. 
                I learned as much from my students as they learned from me. It's an 
                experience I recommend to every young educator."
              </p>
            </div>
          </div>

          <div className="testimonial-card blue">
            <div className="testimonial-image-wrapper">
              <img src={teamPhoto} alt="Team Member" className="testimonial-bg-img" />
            </div>
            <div className="testimonial-content">
              <div className="testimonial-info">
                <h4>Sofia Papadopoulos</h4>
                <p className="testimonial-role">AIESEC Member</p>
              </div>
              <p className="testimonial-text">
                "Being an AIESEC member has shaped who I am today. The leadership development, 
                teamwork, and opportunities to make an impact have been incredible. I've found 
                my purpose and a global network of friends."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • OUR PARTNERS • </p>
          </div>
        </div>
        
        <div className="partners-grid">
          {[...Array(11)].map((_, i) => (
            <div key={i} className="partner-circle">
              <img src={`/static/partner${i + 1}.png`} alt={`Partner ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <img src={blueLogo} alt="AIESEC" className="footer-logo" />
            <p>
              AIESEC is the world's largest youth-run organization, developing young people 
              aged 18 to 30 with leadership development and cross-cultural experiences. The 
              organization focuses on empowering young people to make a progressive social 
              impact through leadership education, international internships, and exchange 
              programs and other practical programs to help young people unlock their 
              potential.
            </p>
          </div>
          
          <div className="footer-products">
            <h3>Our Products</h3>
            <ul>
              <li><Link to="/global-volunteer">Global Volunteer</Link></li>
              <li><Link to="/global-talent">Global Talent</Link></li>
              <li><Link to="/global-teacher">Global Teacher</Link></li>
              <li><Link to="/member">AIESEC Member</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact</h3>
            <div className="contact-item">
              <i className="far fa-envelope"></i>
              <span>greece@aiesec.gr</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Ανδρέα Μουστοξύδη 3, Αθήνα 114 73</span>
            </div>
            <div className="social-icons">
              <a href="https://www.facebook.com/AIESEC.Greece/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.youtube.com/user/AIESECinGreece" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.instagram.com/aiesec.greece/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/aiesec-hellas_2/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-banner">
          <div className="banner-track">
            <div className="banner-text">
              AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • 
            </div>
          </div>
          <div className="banner-track" aria-hidden="true">
            <div className="banner-text">
              AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • AIESEC • 
            </div>
          </div>
        </div>
        
        <div className="footer-credits">
          <p>Made with 💙, Powered by AIESEC, Developed by Mahmoud Fouda</p>
        </div>
      </footer>
    </div>
  )
}

export default App
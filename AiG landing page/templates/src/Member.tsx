import './App.css'
import './Member.css'
import { Link } from 'react-router-dom'
import { useState, FormEvent } from 'react'
import whiteBlueLogo from '/White-Blue-Logo.png'
import blueLogo from '/Blue-Logo.png'

function Member() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    university: '',
    department: '',
    birthdate: '',
    whyJoin: '',
    academicSituation: '',
    employmentStatus: '',
    howHeard: '',
    consent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/submit-member/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const json = await res.json()
      if (res.ok) {
        setSubmitSuccess(true)
      } else {
        setSubmitError(json.message || 'Submission failed')
      }
    } catch (err) {
      setSubmitError('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="member-page">
      {/* Navigation */}
       <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <Link to="/">
              <img src={whiteBlueLogo} alt="AIESEC" className="logo-img" />
            </Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <Link to="/#products">Our Products</Link>
              <div className="dropdown-menu">
                <Link to="/global-volunteer" className="dropdown-item">Global Volunteer</Link>
                <Link to="/global-talent" className="dropdown-item">Global Talent</Link>
                <Link to="/global-teacher" className="dropdown-item">Global Teacher</Link>
                <Link to="/member" className="dropdown-item">AIESEC Member</Link>
              </div>
            </li>
            <li><Link to="/#partner">Partner With Us</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="member-hero">
        <div className="member-hero-overlay"></div>
        <div className="member-hero-content">
          <h1 className="member-hero-title">Become a Member</h1>
          <p className="member-hero-subtitle">
            Join the world's largest youth-run organization. Develop your leadership potential 
            while making a positive impact and connecting with a global network.
          </p>
          <button className="member-hero-btn">Apply Now</button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • WHY JOIN AIESEC • </p>
          </div>
        </div>

        <div className="benefits-container">
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Leadership Development</h3>
            <p>
              Develop essential leadership skills through hands-on experience managing projects, 
              teams, and initiatives that create real impact.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-globe-americas"></i>
            </div>
            <h3>Global Network</h3>
            <p>
              Connect with over 40,000 members across 120+ countries and territories, 
              building relationships that last a lifetime.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h3>Career Opportunities</h3>
            <p>
              Access exclusive internships, volunteer opportunities, and career development 
              resources from our global partner network.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3>Skill Building</h3>
            <p>
              Gain practical skills in project management, communication, teamwork, 
              and cross-cultural understanding.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Make an Impact</h3>
            <p>
              Contribute to the United Nations Sustainable Development Goals while 
              empowering young people to create positive change.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <h3>Recognition</h3>
            <p>
              Receive certificates and recognition for your contributions, enhancing 
              your CV and opening doors for future opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section className="signup-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • START YOUR JOURNEY • </p>
          </div>
        </div>

        <div className="signup-container">
          <h2 className="signup-title">AIESEC Member Application</h2>
          <p className="signup-subtitle">Join AIESEC and develop your leadership potential</p>

          {submitSuccess && <div className="alert alert-success">✅ Application submitted successfully</div>}
          {submitError && <div className="alert alert-error">❌ {submitError}</div>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                className="form-input"
                value={formData.firstName} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="text" 
                name="lastName" 
                placeholder="Last Name" 
                className="form-input"
                value={formData.lastName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-row">
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="form-input"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password (min 8 characters)" 
                className="form-input"
                value={formData.password} 
                onChange={handleChange} 
                required 
                minLength={8}
              />
            </div>

            <div className="form-row">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                className="form-input"
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="date" 
                name="birthdate" 
                placeholder="Date of Birth"
                className="form-input"
                value={formData.birthdate} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-row">
              <select name="university" className="form-input" value={formData.university} onChange={handleChange} required>
                  <option value="">Select your university</option>
                  <option value="Alexandrion TEI of Thessaloniki">Alexandrion TEI of Thessaloniki</option>
                  <option value="American College of Greece">American College of Greece</option>
                  <option value="American College of Thessaloniki">American College of Thessaloniki</option>
                  <option value="Athens School of Fine Arts">Athens School of Fine Arts</option>
                  <option value="Athens University of Economics and Business">Athens University of Economics and Business</option>
                  <option value="Harokopio University">Harokopio University</option>
                  <option value="Hellenic American University">Hellenic American University</option>
                  <option value="Hellenic Open University">Hellenic Open University</option>
                  <option value="Ionian University">Ionian University</option>
                  <option value="National and Kapodistrian University of Athens">National and Kapodistrian University of Athens</option>
                  <option value="National Technical University of Athens">National Technical University of Athens</option>
                  <option value="Panteion University">Panteion University</option>
                  <option value="Technological Educational Institute of Athens">Technological Educational Institute of Athens</option>
                  <option value="Technological Educational Institute of Central Macedonia">Technological Educational Institute of Central Macedonia</option>
                  <option value="Technological Educational Institute of Crete">Technological Educational Institute of Crete</option>
                  <option value="Technological Educational Institute of Epirus">Technological Educational Institute of Epirus</option>
                  <option value="Technological Educational Institute of Ionian Islands">Technological Educational Institute of Ionian Islands</option>
                  <option value="Technological Educational Institute of Kalamata">Technological Educational Institute of Kalamata</option>
                  <option value="Technological Educational Institute of Lamia">Technological Educational Institute of Lamia</option>
                  <option value="Technological Educational Institute of Patras">Technological Educational Institute of Patras</option>
                  <option value="Technological Educational Institute of Piraeus">Technological Educational Institute of Piraeus</option>
                  <option value="Technological Educational Institute of Serres">Technological Educational Institute of Serres</option>
                  <option value="Technological Educational Institute of Sterea Ellada">Technological Educational Institute of Sterea Ellada</option>
                  <option value="Technological Educational Institute of Thessaly">Technological Educational Institute of Thessaly</option>
                  <option value="Technological Educational Institute of Western Greece">Technological Educational Institute of Western Greece</option>
                  <option value="Technological Educational Institute of Western Macedonia">Technological Educational Institute of Western Macedonia</option>
                  <option value="University of Crete">University of Crete</option>
                  <option value="University of Ioannina">University of Ioannina</option>
                  <option value="University of Macedonia">University of Macedonia</option>
                  <option value="University of Patras">University of Patras</option>
                  <option value="University of Peloponnese">University of Peloponnese</option>
                  <option value="University of Piraeus">University of Piraeus</option>
                  <option value="University of Thessaly">University of Thessaly</option>
                  <option value="University of Western Attica">University of Western Attica</option>
                  <option value="University of Western Macedonia">University of Western Macedonia</option>
                  <option value="Other">Other</option>
                </select>
              <select name="department" className="form-input" value={formData.department} onChange={handleChange} required>
                  <option value="">Select your department</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Agricultural Development">Agricultural Development</option>
                  <option value="Applied Informatics">Applied Informatics</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Banking and Finance">Banking and Finance</option>
                  <option value="Biology">Biology</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Communications">Communications</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Construction Management">Construction Management</option>
                  <option value="Dentistry">Dentistry</option>
                  <option value="Economics">Economics</option>
                  <option value="Educational Studies">Educational Studies</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Electronic Engineering">Electronic Engineering</option>
                  <option value="Energy Technology">Energy Technology</option>
                  <option value="English">English</option>
                  <option value="Environmental Engineering">Environmental Engineering</option>
                  <option value="Environmental Studies">Environmental Studies</option>
                  <option value="European Studies">European Studies</option>
                  <option value="Finance">Finance</option>
                  <option value="Food Science and Technology">Food Science and Technology</option>
                  <option value="Forestry">Forestry</option>
                  <option value="French">French</option>
                  <option value="Geography">Geography</option>
                  <option value="Geology">Geology</option>
                  <option value="German">German</option>
                  <option value="Health Management">Health Management</option>
                  <option value="History">History</option>
                  <option value="Hotel Management">Hotel Management</option>
                  <option value="Industrial Engineering">Industrial Engineering</option>
                  <option value="Information Systems">Information Systems</option>
                  <option value="International Relations">International Relations</option>
                  <option value="Italian">Italian</option>
                  <option value="Journalism">Journalism</option>
                  <option value="Law">Law</option>
                  <option value="Linguistics">Linguistics</option>
                  <option value="Management">Management</option>
                  <option value="Management Information Systems">Management Information Systems</option>
                  <option value="Management Science">Management Science</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Meteorology and Climatology">Meteorology and Climatology</option>
                  <option value="Music">Music</option>
                  <option value="Nautical Studies">Nautical Studies</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Nutrition and Dietetics">Nutrition and Dietetics</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Physical Education and Sport Science">Physical Education and Sport Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Primary Education">Primary Education</option>
                  <option value="Product and Systems Design Engineering">Product and Systems Design Engineering</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Public Administration">Public Administration</option>
                  <option value="Rural and Surveying Engineering">Rural and Surveying Engineering</option>
                  <option value="Social Policy">Social Policy</option>
                  <option value="Social Work">Social Work</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Statistics">Statistics</option>
                  <option value="Surveying and Geoinformatics Engineering">Surveying and Geoinformatics Engineering</option>
                  <option value="Theatre Studies">Theatre Studies</option>
                  <option value="Theology">Theology</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Veterinary Medicine">Veterinary Medicine</option>
                  <option value="Viticulture and Oenology">Viticulture and Oenology</option>
                  <option value="Other">Other</option>
                </select>
            </div>

            <div className="form-row">
              <select name="whyJoin" className="form-input" value={formData.whyJoin} onChange={handleChange} required>
                <option value="">Why do you want to join AIESEC?</option>
                <option value="Leadership development">Leadership development</option>
                <option value="Global network">Global network</option>
                <option value="Career opportunities">Career opportunities</option>
                <option value="Skill building">Skill building</option>
                <option value="Cultural exposure">Cultural exposure</option>
                <option value="Make a positive impact">Make a positive impact</option>
                <option value="Other">Other</option>
              </select>
              <select name="academicSituation" className="form-input" value={formData.academicSituation} onChange={handleChange} required>
                <option value="">Academic situation</option>
                <option value="Undergraduate Student">Undergraduate Student</option>
                <option value="Postgraduate Student">Postgraduate Student</option>
                <option value="Graduate">Graduate (Recently Completed)</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            <div className="form-row">
              <select name="employmentStatus" className="form-input" value={formData.employmentStatus} onChange={handleChange} required>
                  <option value="">Employment status</option>
                  <option value="student">Full-time Student</option>
                  <option value="part-time">Part-time Employment</option>
                  <option value="full-time">Full-time Employment</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="other">Other</option>
                </select>
              <select name="howHeard" className="form-input" value={formData.howHeard} onChange={handleChange} required>
                  <option value="">How did you hear about AIESEC?</option>
                  <option value="friend">Friend or Family Member</option>
                  <option value="social-media">Social Media</option>
                  <option value="university-event">University Event</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
            </div>

            <div className="form-row">
              <textarea 
                name="whyJoin" 
                placeholder="Tell us about your motivation to join AIESEC and what you hope to achieve..." 
                className="form-input"
                value={formData.whyJoin} 
                onChange={handleChange} 
                rows={5}
                required 
              />
            </div>

            <div className="form-row consent-row">
              <label className="checkbox-label">
                <input name="consent" type="checkbox" checked={!!formData.consent} onChange={handleChange} required />
                <span>I agree to the processing of my personal data and understand that my information will be used in accordance with AIESEC's privacy policy *</span>
              </label>
            </div>

            <div className="form-row">
              <button type="submit" className="signup-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <img src={blueLogo} alt="AIESEC" className="footer-logo" />
            <p>
              AIESEC is the world's largest youth-run organization, developing young people 
              aged 18 to 30 with leadership development and cross-cultural experiences.
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
      </footer>
    </div>
  )
}

export default Member

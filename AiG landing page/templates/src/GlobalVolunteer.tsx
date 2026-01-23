import './App.css'
import './GlobalVolunteer.css'
import { Link } from 'react-router-dom'
import { useState, FormEvent } from 'react'
import whiteBlueLogo from '/White-Blue-Logo.png'
import blueLogo from '/Blue-Logo.png'
import { checkEmailUnique, submitGlobalVolunteerSignup } from './services/expaApi'

function GlobalVolunteer() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    campus: '',
    faculty: '',
    preventReason: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setFormErrors({})
    
    try {
      // Get campaign ID from URL if available
      const urlParams = new URLSearchParams(window.location.search)
      const campaignId = urlParams.get('c')
      
      // Submit to Django backend (which handles all validation and EXPA API calls)
      const result = await submitGlobalVolunteerSignup({
        ...formData,
        campaignId
      })
      
      if (result.success) {
        setSubmitSuccess(true)
        // Show success message
        const applicantName = result.data?.applicant?.firstName || formData.firstName
        const expaId = result.data?.applicant?.expaId || ''
        setTimeout(() => {
          alert(`Success! Welcome ${applicantName}!${expaId ? ` Your EXPA ID is ${expaId}` : ''}`)
        }, 500)
      } else {
        // Handle validation or submission errors
        if (result.errors) {
          setFormErrors(result.errors)
        } else {
          setSubmitError(result.error || 'An error occurred during signup. Please try again.')
        }
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="global-volunteer">
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
      <section className="volunteer-hero">
        <div className="volunteer-hero-overlay"></div>
        <div className="volunteer-hero-content">
          <h1 className="volunteer-hero-title">Global Volunteer</h1>
          <p className="volunteer-hero-subtitle">
            Make a difference across borders. Contribute to sustainable development 
            while experiencing a new culture and building lifelong connections.
          </p>
          <button className="volunteer-hero-btn">Apply Now</button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • WHY VOLUNTEER • </p>
          </div>
        </div>

        <div className="benefits-container">
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-globe"></i>
            </div>
            <h3>Cross-Cultural Experience</h3>
            <p>
              Immerse yourself in a new culture, learn local traditions, and gain 
              a global perspective that will shape your worldview forever.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-hands-helping"></i>
            </div>
            <h3>Contribute to SDGs</h3>
            <p>
              Work on projects aligned with the UN Sustainable Development Goals, 
              making a real impact on communities around the world.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Build Global Network</h3>
            <p>
              Connect with like-minded young people from different countries and 
              build a network that spans across continents.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Personal Growth</h3>
            <p>
              Develop leadership skills, increase self-awareness, and gain confidence 
              through challenging and rewarding experiences.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>Learn & Develop</h3>
            <p>
              Gain practical skills, learn new languages, and develop competencies 
              that will enhance your personal and professional life.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Meaningful Impact</h3>
            <p>
              Create lasting change in communities while discovering your purpose 
              and passion for making the world a better place.
            </p>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="countries-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • EXPLORE DESTINATIONS • </p>
          </div>
        </div>

        <div className="countries-container">
          <div className="country-card">
            <div className="country-image">
              <img src="/tunisia.jpg" alt="Tunisia" />
            </div>
            <h3>Tunisia</h3>
            <p>Discover ancient ruins, desert landscapes, and Mediterranean beaches.</p>
          </div>

          <div className="country-card">
            <div className="country-image">
              <img src="/turkey.jpg" alt="Turkey" />
            </div>
            <h3>Turkey</h3>
            <p>Experience the crossroads of Europe and Asia with rich history.</p>
          </div>

          <div className="country-card">
            <div className="country-image">
              <img src="/egypt.jpg" alt="Egypt" />
            </div>
            <h3>Egypt</h3>
            <p>Explore the land of pharaohs, pyramids, and ancient wonders.</p>
          </div>

          <div className="country-card">
            <div className="country-image">
              <img src="/germany.jpg" alt="Germany" />
            </div>
            <h3>Germany</h3>
            <p>Blend innovation, efficiency, and rich cultural traditions.</p>
          </div>

          <div className="country-card">
            <div className="country-image">
              <img src="/italy.jpg" alt="Italy" />
            </div>
            <h3>Italy</h3>
            <p>Experience art, cuisine, and rich cultural heritage.</p>
          </div>

          <div className="country-card">
            <div className="country-image">
              <img src="/brazil.jpg" alt="Brazil" />
            </div>
            <h3>Brazil</h3>
            <p>Embrace vibrant culture, stunning nature, and warm hospitality.</p>
          </div>

          <div className="country-card">
            <div className="country-image">
              <img src="/srilanka.jpg" alt="Sri Lanka" />
            </div>
            <h3>Sri Lanka</h3>
            <p>Discover tropical paradise, ancient temples, and tea plantations.</p>
          </div>

          <div className="country-card">
            <div className="country-image">
              <img src="/india.jpg" alt="India" />
            </div>
            <h3>India</h3>
            <p>Experience spiritual diversity, ancient wisdom, and vibrant colors.</p>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section className="signup-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • JOIN THE MOVEMENT • </p>
          </div>
        </div>

        <div className="signup-container">
          <h2 className="signup-title">Apply for Global Volunteer</h2>
          <p className="signup-subtitle">Start your journey today and make a global impact</p>
          
          {submitSuccess && (
            <div className="alert alert-success">
              <p>✅ Application submitted successfully! Check your email for next steps.</p>
            </div>
          )}
          
          {submitError && (
            <div className="alert alert-error">
              <p>❌ {submitError}</p>
            </div>
          )}
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First Name" 
                  className={`form-input ${formErrors.firstName ? 'error' : ''}`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                />
                {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
              </div>
              <div className="form-field">
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name" 
                  className={`form-input ${formErrors.lastName ? 'error' : ''}`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                />
                {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  className={`form-input ${formErrors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
              <div className="form-field">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password (min 8 chars, upper+lower+number)" 
                  className={`form-input ${formErrors.password ? 'error' : ''}`}
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                />
                {formErrors.password && <span className="error-message">{formErrors.password}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone (10-11 digits)" 
                  className={`form-input ${formErrors.phone ? 'error' : ''}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                />
                {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
              </div>
              <div className="form-field">
                <input 
                  type="date" 
                  name="dob"
                  placeholder="Date of Birth" 
                  className={`form-input ${formErrors.dob ? 'error' : ''}`}
                  value={formData.dob}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                />
                {formErrors.dob && <span className="error-message">{formErrors.dob}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <select 
                  name="faculty"
                  className={`form-input ${formErrors.faculty ? 'error' : ''}`}
                  value={formData.faculty}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Faculty</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts & Humanities</option>
                  <option value="Science">Science</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Law">Law</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.faculty && <span className="error-message">{formErrors.faculty}</span>}
              </div>
              <div className="form-field">
                <select 
                  name="campus"
                  className={`form-input ${formErrors.campus ? 'error' : ''}`}
                  value={formData.campus}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                >
                <option value="">Campus</option>
                <option value="QS College (Athens Department)">QS College (Athens Department)</option>
                <option value="University of Athens">University of Athens</option>
                <option value="Vakalo Art & Design College">Vakalo Art & Design College</option>
                <option value="Agricultural University">Agricultural University</option>
                <option value="IEK SBIE (Athens Department)">IEK SBIE (Athens Department)</option>
                <option value="ALBA - The American College of Greece">ALBA - The American College of Greece</option>
                <option value="British Hellenic College (Athens Department)">British Hellenic College (Athens Department)</option>
                <option value="Business College of Athens">Business College of Athens</option>
                <option value="National Technical University of Athens">National Technical University of Athens</option>
                <option value="IST College">IST College</option>
                <option value="National Kapodistrian University of Athens">National Kapodistrian University of Athens</option>
                <option value="Global Training">Global Training</option>
                <option value="TEI Chalkidas">TEI Chalkidas</option>
                <option value="Panteion University">Panteion University</option>
                <option value="Athens IT College">Athens IT College</option>
                <option value="Mediterranean College (Thessaloniki Department)">Mediterranean College (Thessaloniki Department)</option>
                <option value="University of Western Attica">University of Western Attica</option>
                <option value="New York College (Thessaloniki Department)">New York College (Thessaloniki Department)</option>
                <option value="IEK Domi">IEK Domi</option>
                <option value="University of Piraeus">University of Piraeus</option>
                <option value="University of Crete">University of Crete</option>
                <option value="TEI of Crete">TEI of Crete</option>
                <option value="Mediterranean Insitute Chania">Mediterranean Insitute Chania</option>
                <option value="Technical University of Crete">Technical University of Crete</option>
                <option value="TEI of Patras">TEI of Patras</option>
                <option value="IEK Akmi (Thessaloniki Department)">IEK Akmi (Thessaloniki Department)</option>
                <option value="Hellenic Open University">Hellenic Open University</option>
                <option value="TEI Kalamata">TEI Kalamata</option>
                <option value="University of Peloponnese (Kalamata's Department)">University of Peloponnese (Kalamata's Department)</option>
                <option value="TEI Messolonghi">TEI Messolonghi</option>
                <option value="University of Patras">University of Patras</option>
                <option value="TEI Thessalonikis">TEI Thessalonikis</option>
                <option value="University of Western Macedonia">University of Western Macedonia</option>
                <option value="TEI Kavalas">TEI Kavalas</option>
                <option value="University of Macedonia">University of Macedonia</option>
                <option value="TEI Western Macedonia">TEI Western Macedonia</option>
                <option value="City College Thessaloniki">City College Thessaloniki</option>
                <option value="AKMI College (Thessaloniki's Departments)">AKMI College (Thessaloniki's Departments)</option>
                <option value="International University">International University</option>
                <option value="TEI of Serres">TEI of Serres</option>
                <option value="Aristotle University of Thessaloniki">Aristotle University of Thessaloniki</option>
                <option value="TEI of Ionian Islands">TEI of Ionian Islands</option>
                <option value="Ionian University">Ionian University</option>
                <option value="TEI of Larisa">TEI of Larisa</option>
                <option value="University of Central Greece">University of Central Greece</option>
                <option value="TEI of Lamia">TEI of Lamia</option>
                <option value="University of Thessaly">University of Thessaly</option>
                <option value="Democretus University of Thrace">Democretus University of Thrace</option>
                <option value="Athens Information Technology College">Athens Information Technology College</option>
                <option value="Athens University of Economics & Business">Athens University of Economics & Business</option>
                <option value="IEK Akmi (Patras Department)">IEK Akmi (Patras Department)</option>
                <option value="Agricultural University of Athens">Agricultural University of Athens</option>
                <option value="Mediterranean Agronomic Institute of Chania">Mediterranean Agronomic Institute of Chania</option>
                <option value="University of Cyprus">University of Cyprus</option>
                <option value="American University of Nicosia">American University of Nicosia</option>
                <option value="Cyprus University of Technology">Cyprus University of Technology</option>
                <option value="European University of Cyprus">European University of Cyprus</option>
                <option value="Frederick University">Frederick University</option>
                <option value="Neapolis University Paphos">Neapolis University Paphos</option>
                <option value="KES College">KES College</option>
                <option value="University of Nicosia">University of Nicosia</option>
                <option value="Cyprus International Institute of Management">Cyprus International Institute of Management</option>
                <option value="Open University of Cyprus">Open University of Cyprus</option>
                <option value="AKMI Mediterranean College (Thessaloniki's Departments)">AKMI Mediterranean College (Thessaloniki's Departments)</option>
                <option value="DEI College">DEI College</option>
                <option value="TEI of Kalamata">TEI of Kalamata</option>
                <option value="Mediterranean College (Athens Department)">Mediterranean College (Athens Department)</option>
                <option value="University of Peloponnese (Korinth's Department)">University of Peloponnese (Korinth's Department)</option>
                <option value="American College of Thessaloniki">American College of Thessaloniki</option>
                <option value="Deree  -  The American College of Greece">Deree  -  The American College of Greece</option>
                <option value="University of Aegean">University of Aegean</option>
                <option value="New York College (Athens's Department)">New York College (Athens's Department)</option>
                <option value="International University of Macedonia">International University of Macedonia</option>
                <option value="TEI of Epirus">TEI of Epirus</option>
                <option value="University of Ioannina">University of Ioannina</option>
                <option value="University of Peloponnese (Nafplio's Department)">University of Peloponnese (Nafplio's Department)</option>
                <option value="University of Peloponnese (Tripolis' Department)">University of Peloponnese (Tripolis' Department)</option>
                <option value="University of Peloponnese (Sparta's Department)">University of Peloponnese (Sparta's Department)</option>
                <option value="Technological Institute of Thessaloniki">Technological Institute of Thessaloniki</option>
                <option value="Harokopio University of Athens">Harokopio University of Athens</option>
                <option value="City College Athens">City College Athens</option>
                <option value="University of Central Lancashire">University of Central Lancashire</option>
                <option value="School of Fine Arts">School of Fine Arts</option>
                <option value="IEK DATA Chios">IEK DATA Chios</option>
                <option value="Public IEK of Chios">Public IEK of Chios</option>
                <option value="Open University of Chios">Open University of Chios</option>
                <option value="University of Aegean (Mitilini)">University of Aegean (Mitilini)</option>
                <option value="University of Aegean (Chios)">University of Aegean (Chios)</option>
                <option value="University of Aegean (Rodos)">University of Aegean (Rodos)</option>
                <option value="University of Aegean (Siros)">University of Aegean (Siros)</option>
                <option value="University of Aegean (Samos)">University of Aegean (Samos)</option>
                <option value="University of Aegean (Limnos)">University of Aegean (Limnos)</option>
                <option value="Metropolitan College">Metropolitan College</option>
                <option value="IEK AKMI Athens">IEK AKMI Athens</option>
                <option value="Hellenic Conservatory">Hellenic Conservatory</option>
                <option value="National Theatre">National Theatre</option>
                <option value="University of Crete (Herakleion Department)">University of Crete (Herakleion Department)</option>
                <option value="University of Crete (Rethymno Department)">University of Crete (Rethymno Department)</option>
                <option value="Hellenic Mediterranean University (Herakleion Department)">Hellenic Mediterranean University (Herakleion Department)</option>
                <option value="Hellenic Mediterranean University (Rethumno Department)">Hellenic Mediterranean University (Rethumno Department)</option>
                <option value="Hellenic Mediterranean University (Chania Department)">Hellenic Mediterranean University (Chania Department)</option>
                <option value="Hellenic Mediterranean University (Ag.Nikolaos Department)">Hellenic Mediterranean University (Ag.Nikolaos Department)</option>
                <option value="Hellenic Mediterranean University (Siteia Department)">Hellenic Mediterranean University (Siteia Department)</option>
                <option value="1st D.IEK of  Heraklion">1st D.IEK of  Heraklion</option>
                <option value="2nd D.IEK of  Heraklion">2nd D.IEK of  Heraklion</option>
                <option value="IEK of Ag. Nikolaos">IEK of Ag. Nikolaos</option>
                <option value="D.IEK of Chania">D.IEK of Chania</option>
                <option value="D.IEK of Rethymno">D.IEK of Rethymno</option>
                <option value="IEK AKMI (Herakleion Department)">IEK AKMI (Herakleion Department)</option>
                <option value="D.IEK of Siteia">D.IEK of Siteia</option>
                <option value="IEK MORFI of Heraklion">IEK MORFI of Heraklion</option>
                <option value="IEK MBS Rethymnon">IEK MBS Rethymnon</option>
                <option value="City Unity College (Patras Department)">City Unity College (Patras Department)</option>
                <option value="IEK VERGI (Patras Department)">IEK VERGI (Patras Department)</option>
                <option value="IEK SBIE (Patras Department)">IEK SBIE (Patras Department)</option>
                <option value="IEK EUROTEAM (Patras Department)">IEK EUROTEAM (Patras Department)</option>
                <option value="IEK DELTA (Patras Department)">IEK DELTA (Patras Department)</option>
                <option value="University of Patras (Patras Department)">University of Patras (Patras Department)</option>
                <option value="University of Patras (Agrinio Department)">University of Patras (Agrinio Department)</option>
                <option value="University of Patras (Mesologgi Department)">University of Patras (Mesologgi Department)</option>
                <option value="University of Patras (Aigio Department)">University of Patras (Aigio Department)</option>
                <option value="University of Patras (Pyrgos Department)">University of Patras (Pyrgos Department)</option>
                <option value="University of Peloponnese (Patras' Department)">University of Peloponnese (Patras' Department)</option>
                <option value="Aegean College Piraeus">Aegean College Piraeus</option>
                <option value="IEK PEIRAIA">IEK PEIRAIA</option>
                <option value="IEK OMEGA PEIRAIA">IEK OMEGA PEIRAIA</option>
                <option value="D.IEK NEAS IONIAS">D.IEK NEAS IONIAS</option>
                <option value="IEK AMMAROUSIOU">IEK AMMAROUSIOU</option>
                <option value="IEK AIGALEO">IEK AIGALEO</option>
                <option value="IEK KORIDALLOU">IEK KORIDALLOU</option>
                <option value="ASPAITE">ASPAITE</option>
                <option value="University of Thessaly (Volos' Department)">University of Thessaly (Volos' Department)</option>
                <option value="University of Thessaly (Lamia's Department)">University of Thessaly (Lamia's Department)</option>
                <option value="IEK Delta (Thessaloniki's Department)">IEK Delta (Thessaloniki's Department)</option>
                <option value="Know Crunch">Know Crunch</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.campus && <span className="error-message">{formErrors.campus}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <select 
                  name="preventReason"
                  className={`form-input ${formErrors.preventReason ? 'error' : ''}`}
                  value={formData.preventReason}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Top reason that might prevent you from going on exchange</option>
                  <option value="Financial Constraints">Financial Constraints</option>
                  <option value="Time Commitment">Time Commitment</option>
                  <option value="Family Concerns">Family Concerns</option>
                  <option value="Language Barrier">Language Barrier</option>
                  <option value="Academic Requirements">Academic Requirements</option>
                  <option value="No Concerns">No Concerns</option>
                </select>
                {formErrors.preventReason && <span className="error-message">{formErrors.preventReason}</span>}
              </div>
            </div>

            <div className="form-checkbox">
              <input type="checkbox" id="consent" required disabled={isSubmitting} />
              <label htmlFor="consent">I consent to the usage of my phone number for communication purposes</label>
            </div>

            <button type="submit" className="signup-btn" disabled={isSubmitting}>
              {isSubmitting ? 'SUBMITTING...' : 'SIGN UP!'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
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

export default GlobalVolunteer

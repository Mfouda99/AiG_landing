import { useState } from 'react'
import './App.css'
import './GlobalTeacher.css'
import { Link } from 'react-router-dom'
import whiteBlueLogo from '/White-Blue-Logo.png'
import blueLogo from '/Blue-Logo.png'
import { submitGlobalTeacherSignup } from './services/expaApi'

function GlobalTeacher() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    campus: '',
    faculty: '',
    dob: '',
    preventReason: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    
    const result = await submitGlobalTeacherSignup(formData);
    
    if (result.success) {
      alert('Application submitted successfully!');
      // Reset form or redirect
    } else {
      if (result.errors) {
        setFormErrors(result.errors);
      }
      alert(result.error || 'Submission failed');
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="global-teacher">
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
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="teacher-hero">
        <div className="teacher-hero-overlay"></div>
        <div className="teacher-hero-content">
          <h1 className="teacher-hero-title">Global Teacher</h1>
          <p className="teacher-hero-subtitle">
            Shape minds across borders. Gain teaching experience internationally 
            while making a lasting impact on students' lives around the world.
          </p>
           <button 
                className="teacher-hero-btn"
                onClick={() => {
                  document.getElementById('signup-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Apply Now
              </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • WHY GLOBAL TEACHER • </p>
          </div>
        </div>

        <div className="benefits-container">
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <h3>Teaching Experience</h3>
            <p>
              Develop your teaching skills in real classrooms abroad, gaining 
              hands-on experience that will enhance your career in education.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-globe-americas"></i>
            </div>
            <h3>Cultural Exchange</h3>
            <p>
              Experience different educational systems and teaching methods 
              while sharing your own cultural perspective with students.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Impact Lives</h3>
            <p>
              Make a meaningful difference in students' lives while contributing 
              to quality education and sustainable development goals.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Innovative Methods</h3>
            <p>
              Learn and implement innovative teaching methodologies from 
              different cultures and educational approaches worldwide.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>Professional Growth</h3>
            <p>
              Enhance your CV with international teaching experience that 
              demonstrates adaptability and cross-cultural competence.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Personal Fulfillment</h3>
            <p>
              Experience the joy of teaching while traveling, growing personally, 
              and creating memories that will last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Product Info Section */}
      <section className="product-info-section">
        <div className="info-container">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3>Duration</h3>
            <p>6-78 Weeks</p>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Age Range</h3>
            <p>18-30 Years</p>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-chalkboard"></i>
            </div>
            <h3>Opportunities</h3>
            <p>Teaching Positions</p>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="countries-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • TEACHING SUBJECTS • </p>
          </div>
        </div>

        <div className="countries-container">
          <div className="country-card">
            <div className="field-icon">
              <i className="fas fa-language"></i>
            </div>
            <h3>English Language</h3>
            <p>Teach English as a foreign language to students of all ages and proficiency levels.</p>
          </div>

          <div className="country-card">
            <div className="field-icon">
              <i className="fas fa-calculator"></i>
            </div>
            <h3>Mathematics</h3>
            <p>Share mathematical concepts and problem-solving skills with students worldwide.</p>
          </div>

          <div className="country-card">
            <div className="field-icon">
              <i className="fas fa-flask"></i>
            </div>
            <h3>Science</h3>
            <p>Inspire curiosity through biology, chemistry, physics, and environmental science.</p>
          </div>

          <div className="country-card">
            <div className="field-icon">
              <i className="fas fa-laptop-code"></i>
            </div>
            <h3>Computer Science</h3>
            <p>Teach coding, programming, and digital literacy to the next generation.</p>
          </div>

          <div className="country-card">
            <div className="field-icon">
              <i className="fas fa-palette"></i>
            </div>
            <h3>Arts & Music</h3>
            <p>Nurture creativity through visual arts, music, drama, and cultural expression.</p>
          </div>

          <div className="country-card">
            <div className="field-icon">
              <i className="fas fa-running"></i>
            </div>
            <h3>Physical Education</h3>
            <p>Promote health and wellness through sports, fitness, and physical activities.</p>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section  id="signup-section" className="signup-section">
        <div className="section-marquee">
          <div className="marquee-track">
            <p className="marquee-text">START TEACHING • START TEACHING • START TEACHING • START TEACHING • START TEACHING • START TEACHING • START TEACHING • START TEACHING • </p>
          </div>
          <div className="marquee-track" aria-hidden="true">
            <p className="marquee-text">START TEACHING • START TEACHING • START TEACHING • START TEACHING • START TEACHING • START TEACHING • START TEACHING • START TEACHING • </p>
          </div>
        </div>

        <div className="signup-container">
          <h2 className="signup-title">Apply for Global Teacher</h2>
          <p className="signup-subtitle">Begin your international teaching journey</p>
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name" 
                className="form-input" 
                required 
              />
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name" 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-row">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email" 
                className="form-input" 
                required 
              />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password" 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-row">
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone" 
                className="form-input" 
                required 
              />
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                placeholder="Date of Birth" 
                className="form-input" 
                required 
              />
            </div>

            <div className="form-row">
              <select 
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                className="form-input" 
                required
              >
                <option value="">Faculty</option>
                <option value="education">Education</option>
                <option value="languages">Languages</option>
                <option value="science">Science</option>
                <option value="mathematics">Mathematics</option>
                <option value="arts">Arts & Humanities</option>
                <option value="other">Other</option>
              </select>
              <select 
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
                className="form-input" 
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
            </div>

            

            <div className="form-row-full">
              <select 
                name="preventReason"
                value={formData.preventReason}
                onChange={handleInputChange}
                className="form-input" 
                required
              >
                <option value="">Top reason that might prevent you from going on exchange</option>
                <option value="financial">Financial Constraints</option>
                <option value="time">Time Commitment</option>
                <option value="family">Family Concerns</option>
                <option value="language">Language Barrier</option>
                <option value="academic">Academic Requirements</option>
                <option value="none">No Concerns</option>
              </select>
            </div>

            <div className="form-checkbox">
              <input type="checkbox" id="consent" required />
              <label htmlFor="consent">I consent to the usage of my phone number for communication purposes</label>
            </div>

            <button type="submit" className="signup-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'SIGN UP!'}
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
        
        <div className="footer-credits">
          <p>Made with 💙, Powered by AIESEC, Developed by Mahmoud Fouda</p>
        </div>
      </footer>
    </div>
  )
}

export default GlobalTeacher

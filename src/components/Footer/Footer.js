import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="index.html" className="logo d-flex align-items-center">
                <img src="/img/dws_logo.png" alt="" />
              </a>
              <p>
                Most trusted education institute in Vadodara
              </p>
              <div className="social-links mt-3">
                <a href="#" className="twitter">
                  <i className="bi bi-twitter" />
                </a>
                <a href="#" className="facebook">
                  <i className="bi bi-facebook" />
                </a>
                <a href="#" className="instagram">
                  <i className="bi bi-instagram" />
                </a>
                <a href="#" className="linkedin">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right" /> <Link to="/">Home</Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right" /> <Link to="/about-us">About us</Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right" /> <Link to="/features">Services</Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-6 footer-links">
              <h4>Our Courses</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right" />
                  <Link to="/it-courses">IT Courses</Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right" />{" "}
                  <Link to="/multimedia-courses">Multimedia Courses</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
                1/A, Satyam Apartment, RC Dutt <br />
                Rd, Vishwas Colony, Alkapuri,
                <br />
                Vadodara, Gujarat - 390005<br />
                <br />
                <strong>Phone:</strong> +91 9824354587
                <br />
                <strong>Email:</strong> info@thedigitalworkstation.in
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          © Copyright{" "}
          <strong>
            <span>The Digital Workstation</span>
          </strong>
          . All Rights Reserved
        </div>
      </div>
    </footer>

  )
}

export default Footer

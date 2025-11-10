import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  const scrollToTopRef = useRef(null);

  // To handle the rendering of Customer support section if the path is "/contact",
  const location = useLocation();
  const [isSectionVisible, setIsSectionVisible] = useState(true);

  useEffect(() => {
    if (
      location.pathname === "/contact" ||
      location.pathname === "/page-not-found" ||
      location.pathname === "/404"
    ) {
      setIsSectionVisible(false);
    } else {
      setIsSectionVisible(true);
    }
  }, [location.pathname]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errorField, setErrorField] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      setErrorField("name");
      nameRef.current.focus();
      return;
    } else if (
      !formData.email.trim() ||
      !/^\S+@\S+\.\S+$/.test(formData.email)
    ) {
      setErrorField("email");
      emailRef.current.focus();
      return;
    } else if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      setErrorField("phone");
      phoneRef.current.focus();
      return;
    } else {
      setErrorField(null);
      console.log("Email JS", formData);
      setFormData({ name: "", email: "", phone: "" });
      return;
    }
  };

  // ---- Scroll to top ----
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollToTopRef.current) {
        if (window.scrollY > 200) {
          scrollToTopRef.current.classList.add("show");
        } else {
          scrollToTopRef.current.classList.remove("show");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* -- Customer Support Section -- */}
      {isSectionVisible && (
        <section className="customer-support-section">
          <div className="support-background-wrap">
            <div className="support-overlay"></div>
          </div>

          <div className="support-content">
            <h2 className="top-heading-white">Contact</h2>

            <div className="heading-white">
              <h1>Customer Support</h1>
            </div>

            <p className="sub-text">
              Mango Holidays’ Customer Support Team offers comprehensive tour
              assistance, ensuring a smooth, unforgettable journey. Contact us
              today for all your travel inquiries!
            </p>

            <NavLink to="/contact" onClick={handleScrollToTop}>
              <button className="btn-c">
                <p>Contact Us</p>
              </button>
            </NavLink>
          </div>
        </section>
      )}

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            {/* Left Column - Newsletter */}
            <div className="newsletter">
              <h2>Keep Travelling all year round!</h2>
              <h3>
                Subscribe to our newsletter to find travel inspiration in your
                inbox.
              </h3>

              <div className="form-container">
                <div className="input-group">
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    placeholder=""
                    value={formData.name}
                    onChange={handleChange}
                    className={errorField === "name" ? "inputError" : ""}
                  />
                  <label htmlFor="name">First Name</label>
                </div>

                <div className="input-group">
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    placeholder=""
                    value={formData.email}
                    onChange={handleChange}
                    className={errorField === "email" ? "inputError" : ""}
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="input-group">
                  <input
                    ref={phoneRef}
                    type="text"
                    id="phone"
                    placeholder=""
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    className={errorField === "phone" ? "inputError" : ""}
                  />
                  <label htmlFor="phone">Phone No.</label>
                </div>

                <button className="btn-c" onClick={handleSubmit}>
                  <p>Send Enquiry</p>
                </button>
              </div>
            </div>

            {/* Right Column - Navigation */}
            <div className="footer-links">
              <div className="link-column">
                <h2>Discover Us</h2>

                <NavLink
                  to="/about"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  About Mango
                </NavLink>

                <NavLink
                  to="/franchise"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Franchise
                </NavLink>

                <NavLink
                  to="/careers"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Career
                </NavLink>

                <NavLink
                  to="/termCondition"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Terms & Condition
                </NavLink>
              </div>

              <div className="link-column">
                <h2>Resources</h2>

                <NavLink
                  to="/blogs"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Blogs
                </NavLink>

                <NavLink
                  to="/video-blogs"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Video Blogs
                </NavLink>

                <NavLink
                  to="/tour-talks"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Tour Talks
                </NavLink>
              </div>

              <div className="link-column">
                <h2>Support</h2>
                <NavLink
                  to="/contact"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Contact Us
                </NavLink>

                <NavLink
                  to="/how-to-book"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  How to Book
                </NavLink>

                <NavLink
                  to="/faqs"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  FAQs
                </NavLink>
              </div>

              <div className="link-column">
                <h2>Guest Corner</h2>

                <NavLink
                  to="/testimonials"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Our Clients Speak
                </NavLink>

                <NavLink
                  to="/photo-gallery"
                  className="navlinks"
                  onClick={handleScrollToTop}
                >
                  <i className="fas fa-angle-right" />
                  Photo Gallery
                </NavLink>
              </div>
            </div>
          </div>

          {/* Social Icons and Copyright */}
          <div className="footer-bottom">
            <div className="social-icons">
              <a
                href="https://www.facebook.com/MangoHolida"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/mangoholidays/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@mangoholidaysofficial9685"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=8484839508&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
            <p>
              <i className="fas fa-copyright"></i> Mango Holidays India Pvt Ltd.
              All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        ref={scrollToTopRef}
        className="scroll-to-top"
        onClick={handleScrollToTop}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
};

export default Footer;

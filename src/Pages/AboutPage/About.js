import {useEffect} from "react";
import "./about.css";
import { FaArrowRight } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    document.title = "About | Mango Holidays";
  }, []);

  return (
    <>
      {/* -- Banner Section -- */}
      <section className="banner-section-about">
        <div className="img-container-about">
          <img src="/img/about-us-banner.webp" alt="Banner" />
        </div>
        <div className="banner-overlay-about" />
      </section>


      {/* -- About Section -- */}
      <section className="about-container">

        {/* -- Left Section -- */}
        <div className="about-left">
          <div className="about-left-inner">
            <img
              src="/img/global-experience-local-comfort.webp"
              alt="Mango Holidays Logo"
              className="about-logo"
            />

            <h2>Experience Unforgettable Journeys with</h2>
            <h1>Mango Holidays</h1>
            <h3>Your Trusted Travel Partner Since 2008</h3>

            <h2>About</h2>
            <p>
              At Mango Holidays, we are dedicated to crafting unforgettable
              travel experiences for our guests. Since our inception on January
              1st, 2008, we have grown exponentially, establishing offices in
              key locations across Mumbai, Pune, Thane, and Nagpur. Our
              commitment to excellence and customer satisfaction has propelled
              us to become a trusted name in the travel industry.
            </p>
          </div>
        </div>

        {/* -- Right Section -- */}
        <div className="about-right">
          <div className="mission-section">
            <h1>Our <span className="orange-text">Mission</span></h1>
            <p>
              Our mission at Mango Holidays is simple yet
              profound: to create experiences of a lifetime for our guests. We
              believe in going beyond the ordinary to ensure that every journey
              with us is filled with moments of joy, discovery, and adventure.
              From group tours to customized packages, and corporate events to
              visa assistance, we provide comprehensive travel solutions
              tailored to meet your needs.
            </p>
          </div>

          <div className="mission-section">
            <h1>Core <span>Values</span></h1>

            <p>At the heart of Mango Holidays are our corevalues, which guide everything we do:</p>

            <p>
              <FaArrowRight className="icon" />
              <strong>Customer First: </strong>
              Our guests are at the center of everything we do, and their satisfaction is our top priority.
            </p>

            <p>
              <FaArrowRight className="icon" />
              <strong>Teamwork: </strong>
              We believe in the power ofcollaboration and teamwork to deliver exceptional results.
            </p>

            <p>
              <FaArrowRight className="icon" />
              <strong>Ownership: </strong>
              Each member of our team takes ownership of their responsibilities, ensuring accountability and excellence in every aspect of our service.
            </p>

            <p>
              <FaArrowRight className="icon" />
              <strong>Honest & Ethical Interactions: </strong>
              Transparency and integrity are fundamental to our interactions, ensuring trust and confidence in our relationships.
            </p>

            <p>
              <FaArrowRight className="icon" />
              <strong>Pursuit of Excellence: </strong>
              We are committed to continuous improvement and excellence in all that we do, striving to exceed expectations at every opportunity.
            </p>
          </div>

          <div className="mission-section">
            <h1>Our <span>Purpose</span></h1>
            <p>
              At Mango Holidays, our purpose goes beyond just providing travel services.
              We aim to enrich lives and increase the happiness quotient of our society by making every travel experience truly exceptional.
            </p>
          </div>
        </div>
      </section>


      {/* -- Why Choose Us Section -- */}
      <section className="why-choose-us-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>

          <div className="choose-us-grid">
            {/* Left cards */}
            <div className="cards-left">
              <div className="card-left">
                <div className="card-text">
                  <h2>Values Over Volumes</h2>
                  <p>
                    Unlike mass tour operators, we organize a select number of
                    exclusive tours to each destination annually, allowing us to
                    focus on quality and personalized experiences.
                  </p>
                </div>

                <div className="icon-container">
                  <img src='/img/values.webp' alt='Icon Unavailable' />
                </div>
              </div>

              <div className="card-left">
                <div className="card-text">
                  <h2>Quality Over Quantity</h2>
                  <p>
                    We prioritize quality in every aspect of our service, from
                    selecting the finest airlines and accommodations to providing
                    premium transportation and tour experiences.
                  </p>
                </div>

                <div className="icon-container">
                  <img src='/img/quality.webp' alt='Icon Unavailable' />
                </div>
              </div>
            </div>

            {/* Right cards */}
            <div className="cards-right">
              <div className="card-right">
                <div className="icon-container">
                  <img src='/img/team.webp' alt='Icon Unavailable' />
                </div>
                <div className="card-text">
                  <h2>Qualified Team</h2>
                  <p>
                    Our team comprises passionate and experienced individuals who
                    are dedicated to making your holidays memorable.
                  </p>
                </div>
              </div>

              <div className="card-right">
                <div className="icon-container">
                  <img src='/img/honesty.webp' alt='Icon Unavailable' />
                </div>
                <div className="card-text">
                  <h2>Honest & Ethical Interactions</h2>
                  <p>
                    With Mango Holidays, you can trust that you’ll receive
                    transparent and honest dealings, with no hidden costs or
                    surprises along the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

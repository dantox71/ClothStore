import React from "react";

const Footer = props => {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-wrapper">
            <div className="contact">
              <h2>Our Contact Information</h2>
              <div>
                <p>
                  <i className="fa fa-envelope"></i> daniellagowskii@gmail.com
                </p>

                <p>
                  <i className="fa fa-phone"></i>48+ 231 534 345
                </p>
              </div>
            </div>
            <form className="newsletter">
              <h2>Join to Our newsletter</h2>

              <div className="newsletter-inputs">
                <input
                  type="email"
                  name="newsletter-email"
                  placeholder="Your Email Adress"
                />

                <button type="submit" className="newsletter-btn">
                  Send <i className="fa fa-send-o"></i>
                </button>
              </div>
            </form>

            <div className="social-media">
              <h2>Check Out Our Social Media</h2>
              <div className="social-media-links">
                <a href="#!">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#!">
                  <i className="fab fa-twitter"></i>
                </a>

                <a href="#!">
                  <i className="fab fa-instagram"></i>
                </a>

                <a href="#!">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Created By
          <a target="_blank" href="http://daniellagowski.netlify.com">
            {" "}
            Daniel Łagowski.{" "}
          </a>
          All Rights Reserved &copy; 2020
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const Footer = props => {
  return (
    <footer id="main-footer">
      <div class="footer-top">
        <div class="container">
          <div class="footer-top-wrapper">
            <div class="contact">
              <h2>Our Contact Information</h2>
              <div>
                <p>
                  <i class="fa fa-envelope"></i> daniellagowskii@gmail.com
                </p>

                <p>
                  <i class="fa fa-phone"></i>48+ 231 534 345
                </p>
              </div>
            </div>
            <form class="newsletter">
              <h2>Join to Our newsletter</h2>

              <div class="newsletter-inputs">
                <input
                  type="email"
                  name="newsletter-email"
                  placeholder="Your Email Adress"
                />

                <button type="submit" class="newsletter-btn">
                  Send <i class="fa fa-send-o"></i>
                </button>
              </div>
            </form>

            <div class="social-media">
              <h2>Check Out Our Social Media</h2>
              <div class="social-media-links">
                <a href="#!">
                  <i class="fab fa-facebook"></i>
                </a>
                <a href="#!">
                  <i class="fab fa-twitter"></i>
                </a>

                <a href="#!">
                  <i class="fab fa-instagram"></i>
                </a>

                <a href="#!">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          Created By
          <a href="daniellagowski.netlify.com">Daniel Łagowski.</a> All Rights
          Reserved &copy; 2020
        </p>
      </div>
    </footer>
  );
};

export default Footer;

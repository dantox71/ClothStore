import React from "react";
import PropTypes from "prop-types";

const Contact = props => {
  return (
    <section id="contact">
      <h1>Contact Us</h1>
      <div className="container">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Enter Your Name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter Your Email" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              cols="30"
              placeholder="Enter Your Message"
              value="Enter Your Message"
              rows="10"
            ></textarea>
          </div>

          <div className="form-group">
            <a href="#!" className="btn">
              Send
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

Contact.propTypes = {};

export default Contact;

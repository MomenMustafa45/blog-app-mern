import "./footer.css";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer-parent">
      <div className="contact-us">
        <div className="paragraph">
          <p>
            Contact me via social links on right side of this line &#128513;
          </p>
        </div>
        <div className="social-links">
          <p>facebook</p>
          <p>Linkedin</p>
          <p>github</p>
        </div>
      </div>

      <div className="copy-right">
        <p>copyright 2023&copy;</p>
      </div>
    </footer>
  );
};

export default Footer;

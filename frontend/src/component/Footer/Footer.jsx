import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
<footer className="footer">

  <div className="footer-inner">

    <div className="footer-left">
      <h2 className="footer-logo">LOGO</h2>
      <p className="footer-description">
        A Project Marketplace Platform where users can discover, share, and explore projects across different categories. It helps students, developers, and creators 
        find inspiration, upload their work, and connect with others, promoting collaboration and learning in the developer community.
      </p>
    </div>

    <div className="footer-right">
      <h3>Legal</h3>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Customer Services</a></li>
      </ul>
    </div>

  </div>

  <hr className="footer-line" />

  <p className="footer-bottom">
    © 2025 Project MarketPlace. All rights reserved.
  </p>

</footer>

  );
};

export default Footer;
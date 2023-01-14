import React from "react";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <p>
          &copy; {new Date().getFullYear()} <span>Comfy</span> All rights
          reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;

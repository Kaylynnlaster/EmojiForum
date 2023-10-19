import React from "react";
import "../style/Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="containerff">
        <h2> The Forum App for Emoji Lovers! ❤️💙💚</h2>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="text-xs-center">
            &copy;{new Date().getFullYear} Emoji Forum App - All rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

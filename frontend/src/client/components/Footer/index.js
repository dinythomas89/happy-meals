import React from "react";
import { SocialIcon } from "react-social-icons";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>Lovely Meal Sharing</h3>
        <p>Wall street, Norreport</p>
        <p>15.00 to 20.00- all days</p>
      </div>
      <div>
        <p>2021 Copyright @ Diny Thomas.</p>
        <p>All Rights Reserved.</p>
      </div>
      <div>
        <h3>Connect with me:</h3>
        <div>
          <span>
            <SocialIcon
              url="https://twitter.com"
              fgColor="white"
              style={{ height: 35, width: 35 }}
              key="35"
            />
          </span>
          <span>
            <SocialIcon
              url="https://facebook.com"
              bgColor="white"
              style={{ height: 35, width: 35 }}
              key="35"
            />
          </span>
          <span>
            <SocialIcon
              url="https://www.instagram.com/"
              style={{ height: 35, width: 35 }}
              key="35"
            />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

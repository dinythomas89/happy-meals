import React from "react";

import background from "../../background-image.png";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="home-text">
          Easy online meal reservations to support your loved ones
        </div>
      </div>
    </div>
  );
}

export default Home;

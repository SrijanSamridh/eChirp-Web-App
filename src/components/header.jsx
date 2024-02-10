import React from "react";
import logo from "../assets/images/logo.png";

function Header() {
  const logout = () => {
    localStorage.removeItem("x-auth-token");
    window.location.href = "/";
  };

  return (
    <div className="header_main">
      <div className="header">
        <nav className="nav_header">
          <div className="left_nav">
            <img src={logo} alt="logo"></img>
            <h3>EventChirp</h3>
          </div>
          <div className="right_nav">
            <h3>Contact us</h3>
            {/* <img src={contactIcon} alt="contact us icon"></img> */}
            <button onClick={logout} className="logout">
              {" "}
              Logout{" "}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
export default Header;

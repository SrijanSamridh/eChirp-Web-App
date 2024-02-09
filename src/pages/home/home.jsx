import React, { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header"; // Corrected import
import "./home.css";

import { MdPerson } from "react-icons/md";
import { IoCalendar } from "react-icons/io5"; // Corrected import
import { FaUserFriends } from "react-icons/fa";
import Profile from "../profile/profile";
import Events from "../events/events";
import Friends from "../friends/friends";

function Home() {
  const [navigation, setNavigation] = useState("Profile");

  // Function to handle navigation
  const handleNavigation = (nav) => {
    setNavigation(nav);
  };

  return (
    <>
      <Header></Header>
      <div className="main">
        <header>
          <div className="feed-block left">
            <nav>
              <ul>
                <li
                  className={navigation === "Profile" ? "active" : ""}
                  onClick={() => handleNavigation("Profile")}
                >
                  <MdPerson className="iconStyle" /> Profile
                </li>
                <li
                  className={navigation === "Events" ? "active" : ""}
                  onClick={() => handleNavigation("Events")}
                >
                  <IoCalendar className="iconStyle" /> Events
                </li>
                <li
                  className={navigation === "Friends" ? "active" : ""}
                  onClick={() => handleNavigation("Friends")}
                >
                  <FaUserFriends className="iconStyle" /> Friends
                </li>
              </ul>
            </nav>
          </div>
          <div className="feed-block right">
            {navigation === "Profile" && <Profile></Profile>}
            {navigation === "Events" && <Events></Events>}
            {navigation === "Friends" && <Friends></Friends>}
          </div>
        </header>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;

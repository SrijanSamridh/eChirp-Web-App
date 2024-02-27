import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { MdPerson } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Tempelate({ children }) {
  const [navigation, setNavigation] = useState(localStorage.getItem('sideNav'));
  const navigate = useNavigate();
  const handleNavigation = (nav) => {
    setNavigation(nav);
    localStorage.setItem('sideNav', nav);
    navigate(`/home/${nav}`);
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
                  className={navigation === "profile" ? "active" : ""}
                  onClick={() => handleNavigation("profile")}
                >
                  <MdPerson className="iconStyle" /> Profile
                </li>
                <li
                  className={navigation === "events" ? "active" : ""}
                  onClick={() => handleNavigation("events")}
                >
                  <IoCalendar className="iconStyle" /> Events
                </li>
                <li
                  className={navigation === "friends" ? "active" : ""}
                  onClick={() => handleNavigation("friends")}
                >
                  <FaUserFriends className="iconStyle" /> Friends
                </li>
              </ul>
            </nav>
          </div>
          <div className="feed-block right">{children}</div>
        </header>
      </div>
      <Footer></Footer>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Services from "./services/profile.services";
import Events from "../events/services/events.services";
import UpdateUserModal from "./components/editProfile";
import { FaEdit } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "./profile.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]);
  
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [attended, setAttended] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateUser = async (formData) => {
    const response = await Services.updateUserProfile(formData);
    window.location.href = "/";
    console.log("Updating user with data:", response);
  };

  const fetchEvents = async () => {
    try {
      await Events.fetchEvents(setEvents, setLoading, "/upcoming");
      await Events.fetchEvents(setAttended, setLoading, "/attended");
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    Services.fetchUserData(setUserData);
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="profile-container">
        <FaEdit onClick={openModal} />
        <UpdateUserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdate={updateUser}
          userData={userData}
        />
        <h2 className="profile-heading">User Profile</h2>
        {userData ? (
          <div className="profile-details">
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>First Name:</strong> {userData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.lastName}
            </p>
            <p>
              <strong>Bio:</strong> {userData.bio}
            </p>
            <p>
              <strong>Number of Friends:</strong> {userData.numberOfFriends}
            </p>
            <p>
              <strong>Number of Events Created:</strong>{" "}
              {userData.numberOfEventsCreated}
            </p>
            <p>
              <strong>Number of Events Attended:</strong>{" "}
              {userData.numberOfEventsAttended}
            </p>
          </div>
        ) : (
          <p className="loading-message">Loading user data...</p>
        )}
      </div>
      {/* Showcase events in a carousel 
      <div className="carousel-container">
        <h3>Upcoming Events</h3>
        <Carousel
          showThumbs={false}
          emulateTouch={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          showStatus={false}
          showArrows={false}
          className="custom-carousel"
        >
          {events.map((event, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{ backgroundImage: `url(${event.coverImgUrl})` }}
            >
              <div className="carousel-slide-content">
                <h4>{event.eventTitle}</h4>
                <p>{event.eventDescription}</p>
                <div className="event-details">
                  <p>
                    <strong>Created By:</strong> {event.createdBy}
                  </p>
                  <p>
                    <strong>Event Mode:</strong> {event.eventMode}
                  </p>
                  <p>
                    <strong>Age Range:</strong> {event.ageRange}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {event.occupation}
                  </p>
                </div>
                <div className="datetime">
                  <p>
                    Date: {new Date(event.dateOfEvent).toLocaleDateString()}
                  </p>
                  <p>
                    Time: {event.startTime} - {event.endTime}
                  </p>
                </div>
                <p className="location">
                  Location: {event.location}, {event.nameOfPlace}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div> */}
      <div className="scrollable-content">
        {/* Additional code for the attended events */}
        <div className="carousel-container">
          <h3>Attended Events</h3>
          <Carousel
            showThumbs={false}
            emulateTouch={true}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showStatus={false}
            showArrows={false}
            className="custom-carousel"
          >
            {attended.map((event, index) => (
              <div
                key={index}
                className="carousel-slide"
                style={{ backgroundImage: `url(${event.coverImgUrl})` }}
              >
                <div className="carousel-slide-content">
                  <h4>{event.eventTitle}</h4>
                  <p>{event.eventDescription}</p>
                  <div className="event-details">
                    <p>
                      <strong>Created By:</strong> {event.createdBy}
                    </p>
                    <p>
                      <strong>Event Mode:</strong> {event.eventMode}
                    </p>
                    <p>
                      <strong>Age Range:</strong> {event.ageRange}
                    </p>
                    <p>
                      <strong>Occupation:</strong> {event.occupation}
                    </p>
                  </div>
                  <div className="datetime">
                    <p>
                      Date: {new Date(event.dateOfEvent).toLocaleDateString()}
                    </p>
                    <p>
                      Time: {event.startTime} - {event.endTime}
                    </p>
                  </div>
                  <p className="location">
                    Location: {event.location}, {event.nameOfPlace}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Profile;

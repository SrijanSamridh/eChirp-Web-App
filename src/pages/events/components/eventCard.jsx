import "../events.css";
import Event from "../services/events.services";

// SkeletonLoader component
const SkeletonLoader = () => (
  <div className="event-card skeleton">
    <div className="skeleton-title"></div>
    <div className="skeleton-description"></div>
    <div className="skeleton-datetime"></div>
    <div className="skeleton-location"></div>
    <div className="skeleton-image"></div>
    <div className="skeleton-buttons"></div>
  </div>
);

// Event Card Component
function Card({ event }) {
  const handleJoinNow =  async () => {
    await Event.joinViaCode(event._id);
    window.location.href="/";
    console.log("Join Now clicked for event:", event);
  };

  const handleShareEvent = () => {
    //TODO: Add logic to handle sharing the event
    console.log("Share Event clicked for event:", event);
  };

  return (
    <div className="event-card">
      <h4>{event.eventTitle}</h4>
      <p>{event.eventDescription}</p>
      <div className="datetime">
        <p>Date: {new Date(event.dateOfEvent).toLocaleDateString()}</p>
        <p>
          Time: {event.startTime} - {event.endTime}
        </p>
      </div>
      <p className="location">
        Location: {event.location}, {event.nameOfPlace}
      </p>
      <img src={event.coverImgUrl} alt="Event Cover" />

      {/* Buttons for Join Now and Share Event */}
      <div className="button-container">
        <button className="join-button" onClick={handleJoinNow}>
          Join Now
        </button>
        <button className="share-button" onClick={handleShareEvent}>
          Share Event
        </button>
      </div>
    </div>
  );
}

const EventCard = {
  Card,
  SkeletonLoader,
};

export default EventCard;

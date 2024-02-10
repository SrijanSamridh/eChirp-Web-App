import React, { useState, useEffect } from "react";
import Events from "../services/events.services";
import EventCard from "../components/eventCard";

function MyCreatedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Events.fetchEvents(setEvents, setLoading, "/created");
  }, []);

  return (
    <div className="scrollable-container">
      <h3>My Created Events</h3>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        events.map((event) => <EventCard key={event._id} event={event} />)
      )}
    </div>
  );
}

export default MyCreatedEvents;

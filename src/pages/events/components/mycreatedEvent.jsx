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
        // Render 10 skeleton loaders
       Array.from({ length: 10 }, (_, index) => (
        <EventCard.SkeletonLoader key={index} />
      ))
      ) : (
        events.map((event) => <EventCard.Card key={event._id} event={event} />)
      )}
    </div>
  );
}

export default MyCreatedEvents;

const baseURL = `https://api.eventchirp.com/api/events`;

const fetchEvents = async (setEvents, setLoading, route = "") => {
    try {
      const token = localStorage.getItem("x-auth-token");
      const response = await fetch(`${baseURL}${route}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events data");
      }
      const eventData = await response.json();
      setEvents(eventData.events);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events data:", error.message);
    }
  };

  const events = {
    fetchEvents
  }

  export default events;
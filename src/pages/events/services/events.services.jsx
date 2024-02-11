import { toast } from "react-hot-toast";

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
      toast.error(response.message);
      throw new Error("Failed to fetch events data");
    }
    const eventData = await response.json();
    setEvents(eventData.events);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching events data:", error.message);
  }
};

const joinViaCode = async (code) => {
  try {
    const token = localStorage.getItem("x-auth-token");
    const response = await fetch(`https://api.eventchirp.com/api/events/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ eventID: code }),
    });
    console.log("Response:", response);
    const responseData = await response.json();
    if (response.ok) {
      toast.success(responseData.message);
      return true;
    } else {
      toast.error(responseData.message);
      throw new Error(responseData.message);
    }
  } catch (error) {
    console.error("Error joining event:", error.message);
    return false;
  }
};

const postRequest = async (body) => {
  try {
    const token = localStorage.getItem("x-auth-token");
    const response = await fetch(`https://api.eventchirp.com/api/events/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ eventID: body }),
    });
    console.log("Response:", response);
    const responseData = await response.json();
    if (response.ok) {
      toast.success(responseData.message);
      return true;
    } else {
      toast.error(responseData.message);
      throw new Error(responseData.message);
    }
  } catch (error) {
    console.error("Error joining event:", error.message);
    return false;
  }
};

const events = {
  fetchEvents,
  joinViaCode,
  postRequest
};

export default events;

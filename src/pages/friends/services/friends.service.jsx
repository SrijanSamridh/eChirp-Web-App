const API_URL = "https://api.eventchirp.com/api/friend";

async function fetchMyFriends() {
  try {
    console.log("fetching...");
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    const response = await fetch(API_URL + "/my-friends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching my friends");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching my friends:", error);
    throw error;
  }
}

async function fetchPotentialFriends() {
  try {
    const response = await fetch(API_URL + "/potential");
    if (!response.ok) {
      throw new Error("Error fetching potential friends");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching potential friends:", error);
    throw error;
  }
}

async function searchUsers(searchTerm) {
  try {
    console.log("fetching...");
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    const response = await fetch(API_URL + `/search?term=${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      throw new Error("Error searching for users");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error searching for users:", error);
    throw error;
  }
}

export { fetchMyFriends, fetchPotentialFriends, searchUsers };

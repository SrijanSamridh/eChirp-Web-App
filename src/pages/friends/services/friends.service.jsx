// const API_URL = "https://e-chirp-server.vercel.app/api/friend";
const API_URL = "http://localhost:8080/api/friend";

async function fetchMyFriends() {
  try {
    console.log("fetching...");
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    const response = await fetch(API_URL + "/friends", {
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
    console.log("fetching...");
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    const response = await fetch(API_URL + "/potential", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
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

async function fetchMyRequests() {
  try {
    console.log("fetching...");
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    const response = await fetch(API_URL + "/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching my requests");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching my requests:", error);
    throw error;
  }
}

async function acceptRequest(friendID){
  try {
    console.log("fetching...");
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    console.log(friendID);
    const response = await fetch(API_URL + "/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({friendID})
    });
    if (!response.ok) {
      throw new Error("Error fetching my requests");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching my requests:", error);
    throw error;
  }
}

async function removeFriend(friendID){
  try {
    console.log("fetching...");
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    console.log(friendID);
    const response = await fetch(API_URL + `/remove/${friendID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching my requests");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching my requests:", error);
    throw error;
  }
}

async function addFriend(friendID){
  try {
    console.log("fetching...");
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    console.log(friendID);
    const response = await fetch(API_URL + "/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({friendID})
    });
    if (!response.ok) {
      throw new Error("Error fetching my requests");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching my requests:", error);
    throw error;
  }
}

export { fetchMyFriends, fetchPotentialFriends, searchUsers, fetchMyRequests, acceptRequest, removeFriend, addFriend };

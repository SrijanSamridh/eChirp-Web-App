import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import "./friends.css";
import { fetchMyFriends, fetchPotentialFriends, searchUsers } from "./services/friends.service";

function Friends() {
  const [activeTab, setActiveTab] = useState("my-friends");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [potentialFriends, setPotentialFriends] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (activeTab === "my-friends") {
          const data = await fetchMyFriends();
          setMyFriends(data);
        } else if (activeTab === "potential-friends") {
          const data = await fetchPotentialFriends();
          setPotentialFriends(data.potentialFriends);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = async (event) => {
    const term = event.target.value.toLowerCase();
    console.log(term);
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchResults(["data not found"]);
      return;
    }
    try {
      const data = await searchUsers(term);
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      // Make API call to add friend
      // You need to implement this part in the service functions
      console.log(`Adding friend with ID ${friendId}`);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      // Make API call to remove friend
      // You need to implement this part in the service functions
      console.log(`Removing friend with ID ${friendId}`);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <div>
      <Toaster />
      <h2>All Friends</h2>
      <div className="flex">
        {activeTab === "search"? <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={handleSearch}
        /> : <div></div>}
      </div>

      <div className="tab-bar">
        <button
          className={activeTab === "my-friends" ? "active" : ""}
          onClick={() => handleTabChange("my-friends")}
        >
          My Friends ({myFriends.length})
        </button>
        <button
          className={activeTab === "potential-friends" ? "active" : ""}
          onClick={() => handleTabChange("potential-friends")}
        >
          Potential Friends ({potentialFriends.length})
        </button>
        <button
          className={activeTab === "search" ? "active" : ""}
          onClick={() => handleTabChange("search")}
        >
          Search ({searchResults.length})
        </button>
      </div>
      <hr />
      <div className="scrollable-content">
        {/* Rendering different content based on the active tab */}
        {activeTab === "my-friends" && renderMyFriendsTab(myFriends, handleRemoveFriend)}
        {activeTab === "potential-friends" &&
          renderPotentialFriendsTab(potentialFriends, handleAddFriend)}
        {activeTab === "search" && renderSearchResultsTab(searchResults, handleAddFriend)}
      </div>
    </div>
  );
}

const renderSearchResultsTab = (searchResults, handleAddFriend) => (
  <div>
    <h3>Search Results</h3>
    {searchResults.map((friend) => (
      <div key={friend._id} className="friend">
        <img src={friend.profilePic} alt={friend.username} />
        <div>
          <h4>{friend.username}</h4>
          <p>{friend.bio}</p>
          <p>Mutual Friends: {friend.mutualFriends}</p>
        </div>
        <button onClick={() => handleAddFriend(friend._id)}>
          <BiUserPlus /> Add Friend
        </button>
      </div>
    ))}
  </div>
);

const renderPotentialFriendsTab = (potentialFriends, handleAddFriend) => (
  <div>
    <h3>Potential Friends</h3>
    {potentialFriends.map((friend) => (
      <div key={friend._id} className="friend">
        <img src={friend.profilePic} alt={friend.username} />
        <div>
          <h4>{friend.username}</h4>
          <p>{friend.bio}</p>
          <p>Mutual Friends: {friend.mutualFriends}</p>
        </div>
        <button onClick={() => handleAddFriend(friend._id)}>
          <BiUserPlus /> Add Friend
        </button>
      </div>
    ))}
  </div>
);

const renderMyFriendsTab = (myFriends, handleRemoveFriend) => (
  <div>
    <h3>My Friends</h3>
    {myFriends.map((friend) => (
      <div key={friend._id} className="friend">
        <img src={friend.profilePic} alt={friend.username} />
        <div>
          <h4>{friend.username}</h4>
          <p>{friend.bio}</p>
          <p>Mutual Friends: {friend.mutualFriends}</p>
        </div>
        <button onClick={() => handleRemoveFriend(friend._id)}>
          <BiUserMinus /> Remove Friend
        </button>
      </div>
    ))}
  </div>
);

export default Friends;

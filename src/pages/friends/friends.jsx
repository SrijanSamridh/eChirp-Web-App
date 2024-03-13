import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import "./friends.css";
import { fetchMyFriends, fetchPotentialFriends, searchUsers, fetchMyRequests, acceptRequest, removeFriend, addFriend } from "./services/friends.service";

function Friends() {
  const [activeTab, setActiveTab] = useState("my-friends");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [requests,setRequests] = useState([]);
  const [confirmedRequests,setConfirmedRequests] = useState([]);
  const [declinedRequests,setDeclinedRequests] = useState([]);
  const [removedFriends,setRemovedFriends] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (activeTab === "my-friends") {
          const data = await fetchMyFriends();
          setMyFriends(data);
          setRemovedFriends([]);
        } else if (activeTab === "potential-friends") {
          const data = await fetchPotentialFriends();
          setPotentialFriends(data.potentialFriends);
        } else if (activeTab === "requests") {
          const data = await fetchMyRequests();
          setConfirmedRequests([]);
          setDeclinedRequests([]);
          setRequests(data);
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
      const data = await addFriend(friendId);
      console.log(`Adding friend with ID ${friendId}`);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      setRemovedFriends([...removedFriends,friendId]);
      const data = await removeFriend(friendId);
      console.log(`Removing friend with ID ${friendId}`);
      console.log(data);
      myFriends.length--;
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const handleAcceptRequest = async (friendId) => {
    try {
      setConfirmedRequests([...confirmedRequests,friendId]);
      const data = await acceptRequest(friendId);
      console.log(`Accepting friend request with ID ${friendId}`);
      console.log(data);
      requests.length--;
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const handleRejectRequest = async (friendId) => {
    try {
      setDeclinedRequests([...declinedRequests,friendId]);
      console.log(`Rejecting friend request with ID ${friendId}`);
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
          className={activeTab === "requests" ? "active" : ""}
          onClick={() => handleTabChange("requests")}
        >
          Requests ({requests.length})
        </button>
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
        {activeTab === "my-friends" && renderMyFriendsTab(myFriends,removedFriends,handleRemoveFriend,handleAddFriend)}
        {activeTab === "potential-friends" &&
          renderPotentialFriendsTab(potentialFriends,handleAddFriend)}
        {activeTab === "search" && renderSearchResultsTab(searchResults, handleAddFriend)}
        {activeTab === "requests" && renderMyRequestsTab(requests,confirmedRequests,declinedRequests,handleAcceptRequest,handleRejectRequest)}
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
function generatePlaceholderUrl(firstLetter) {
  return `https://via.placeholder.com/100x100?text=${firstLetter.toUpperCase()}`;
}

const renderPotentialFriendsTab = (potentialFriends,handleAddFriend) => (
  <div>
    <h3>Potential Friends</h3>
    {potentialFriends.map((friend) => (
      <div key={friend.friend._id} className="friend">
        <img src={friend.friend.profilePic ?? generatePlaceholderUrl(friend.friend.username[0])} alt={friend.friend.username} />
        <div>
          <h4>{friend.friend.username}</h4>
          <p>{friend.friend.bio}</p>
          <p>Mutual Friends: {friend.count}</p>
        </div>
        <button onClick={() => handleAddFriend(friend.friend._id)}>
            <BiUserPlus /> Add Friend
        </button>
      </div>
    ))}
  </div>
);


const renderMyFriendsTab = (myFriends,removedFriends,handleRemoveFriend,handleAddFriend) => (
  <div>
    <h3>My Friends</h3>
    {myFriends.map((friend) => (
      <div key={friend._id} className="friend">
        <img src={friend.profilePic ?? generatePlaceholderUrl(friend.username[0])} alt={friend.username} />
        <div>
          <h4>{friend.username}</h4>
          <p>{friend.bio}</p>
        </div>
        {removedFriends.includes(friend._id) && (
          <button onClick={() => handleAddFriend(friend._id)}>
            <BiUserPlus /> Add Friend
          </button>
        )}
        {!removedFriends.includes(friend._id) && (
          <button onClick={() => handleRemoveFriend(friend._id)}>
            <BiUserMinus /> Remove Friend
          </button>
        )}
      </div>
    ))}
  </div>
);

const renderMyRequestsTab = (requests, confirmedRequests, declinedRequests, handleAcceptRequest, handleRejectRequest) => (
  <div>
    <h3>Requests</h3>
    {requests.map((friend) => (
      <div key={friend._id} className="friend">
        <img src={friend.profilePic ?? generatePlaceholderUrl(friend.username[0])} alt={friend.username} />
        <div>
          <h4>{friend.username}</h4>
          <p>{friend.bio}</p>
        </div>
        {confirmedRequests.includes(friend._id) && <span>Confirmed</span>}
        {declinedRequests.includes(friend._id) && <span>Declined</span>}
        {!confirmedRequests.includes(friend._id) && !declinedRequests.includes(friend._id) && (
          <>
            <button onClick={() => handleAcceptRequest(friend._id)}>
              <BiUserPlus /> Confirm
            </button>
            <button onClick={() => handleRejectRequest(friend._id)}>
              <BiUserMinus /> Decline
            </button>
          </>
        )}
      </div>
    ))}
  </div>
);

export default Friends;

import React, { useState } from "react";
import Events from "../services/events.services";
import Animations from "../../../components/animations";
import "../events.css";

function JoinViaLink() {
  const [joinCode, setJoinCode] = useState("");
  const [response, setResponse] = useState(false);

  const handleJoin = async () => {
    const success = await Events.postRequest(joinCode);
    setResponse(success);
    if (success) {
      setTimeout(() => {
        setResponse(false);
      }, 5000); // Reset response to false after 3 seconds
    }
  };

  return response ? (
    <div className="join-via-code">
      <Animations.SuccessMark />
      <h2>See You In The Event!</h2>
    </div>
  ) : (
    <div className="join-via-code">
      <Animations.JoinViaCode />
      <div className="join-via-code-container">
        <h2>Join via Link</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Or Paste Join Code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button onClick={handleJoin}>Join Event</button>
        </div>
      </div>
    </div>
  );
}

export default JoinViaLink;


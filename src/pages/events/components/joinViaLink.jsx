import React, { useState } from "react";
import Events from "../services/events.services";
import "../events.css";

function JoinViaLink() {
  const [joinCode, setJoinCode] = useState("");

  const handleJoin = async () => {
    await Events.postRequest(joinCode);
  };

  return (
    <div className="join-via-code">
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

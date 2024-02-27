import React from "react";
import { Route, Routes } from "react-router-dom";
import Friends from "./friends/friends";
import Tempelate from "./home/Tempelate";
import Profile from "./profile/profile";
import Events from "./events/events";

export default function HomeRoute() {
  return (
    <Tempelate>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </Tempelate>
  );
}

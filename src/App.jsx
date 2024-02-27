import React from "react";
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import CreateEventForm from "./utils/event/createEventForm";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";
import HomeRoute from "./pages/Home.route";


function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element ={< Auth />} />
                {/* <Route path="/home" element ={< Home />} /> */}
                <Route path="/create-event" element ={< CreateEventForm />} />
                <Route path="/home/*" element ={< HomeRoute />} />
            </Routes>
        </Router>
    )
}

export default App;

import React from "react";
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
// import SignIn from "./pages/login/SignIn";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";


function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element ={< Auth />} />
                <Route path="/home" element ={< Home />} />
            </Routes>
        </Router>
    )
}

export default App;

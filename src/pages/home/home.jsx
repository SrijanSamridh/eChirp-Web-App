import React from "react";
import Footer from "../../components/footer";
import "./home.css";

function Home() {
  const logout = () => {
    localStorage.removeItem("x-auth-token");
    window.location.href = "/";
  };
  return (
    <>
    <div className="main height">
      <h1 className="text-2xl py-12">Welcome to EventChirp!</h1>
      <hr />
      <button onClick={logout} className=""> Logout </button>
    </div>
    <Footer></Footer>
    </>
    
  );
}

export default Home;

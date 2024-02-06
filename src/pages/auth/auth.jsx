import React, { useEffect, useState } from "react";
import "./auth.css";
import "../../components/footer";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import BarLoader from "react-spinners/BarLoader";

const Auth = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.eventchirp.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Signup Successful");
        // You can redirect or perform other actions after successful signup
        window.location.href = "/";
      } else {
        alert(data.error || data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.eventchirp.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Login Successful");
        // You can redirect or perform other actions after successful login
        localStorage.setItem("x-auth-token", data.user.token);
        localStorage.setItem("username", data.user.username);
        window.location.href = "/home";
      } else {
        alert(data.error || data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      if (localStorage.getItem("x-auth-token") != null) {
        window.location.href = "/home";
      } else {
        setloading(false);
      }
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <center style={{ marginTop: "300px" }}>
          <BarLoader
            color="#d67936"
            loading={loading}
            size={80}
            aria-label="BounceLoader Spinner"
            data-testid="loader"
          />
        </center>
      ) : (
        <div className="main-container backgroud-image">
          <div className="container">
            <div className="">
              <div className="header_login">
                <div className="text_login">{action}</div>
                <div className="underline"></div>
              </div>

              {/* Form Section */}
              <form onSubmit={action === "Login" ? handleLogin : handleSignup}>
                <div className="input">
                  <img src={user_icon} alt=""></img>
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {action === "Login" ? null : (
                  <div className="input">
                    <img src={email_icon} alt=""></img>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}
                <div className="input">
                  <img src={password_icon} alt=""></img>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="login-btn" type="submit">
                  {action}
                </button>
                {action === "Login" ? (
                  <div className="text-formating">
                    Forgot Password? <span>Click Here!</span>
                  </div>
                ) : null}
                {action === "Login" ? (
                  <p className="text-formating">
                    Don't have an Account?{" "}
                    <span
                      onClick={() => {
                        setAction("Sign Up");
                      }}
                    >
                      Sign Up
                    </span>
                  </p>
                ) : (
                  <p className="text-formating">
                    Already Have an Account?{" "}
                    <span
                      onClick={() => {
                        setAction("Login");
                      }}
                    >
                      Login
                    </span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;

import React, { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import "./auth.css";
import "../../components/footer";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import BarLoader from "react-spinners/BarLoader";
import authentication from "./services/auth_service";

const Auth = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();
    setSubmitting(true); 
    await authentication.handleSignup(username, email, password, e);
    setSubmitting(false); 
  }

  const signIn = async (e) => {
    e.preventDefault();
    setSubmitting(true); 
    await authentication.handleLogin(username, password, e);
    setSubmitting(false); 
  }

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("x-auth-token") != null) {
        window.location.href = "/home";
      } else {
        setLoading(false);
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
          <Toaster />
          <div className="container">
            <div className="">
              <div className="header_login">
                <div className="text_login">{action}</div>
                <div className="underline"></div>
              </div>

              <form onSubmit={action === "Login" ? signIn : signUp}>
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
                <button className="login-btn" type="submit" disabled={submitting}>
                  {submitting ? 'loading...' : action}
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

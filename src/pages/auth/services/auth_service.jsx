import toast from "react-hot-toast";

const baseURL = "https://api.eventchirp.com/api";

const notify = (message, type = "success") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    default:
      toast(message);
      break;
  }
};

const handleSignup = async (username, email, password, e) => {
  e.preventDefault();
  notify("Processing Authentication..", "loading");

  try {
    const response = await fetch(`${baseURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Signup Successful");
      // You can redirect or perform other actions after successful signup
      window.location.href = "/"; // Redirect to homepage after signup
      notify("Signup Successful", "success");
    } else {
      alert(data.error || data.message || "Something went wrong");
      notify(data.error || data.message || "Something went wrong", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
    notify("An error occurred. Please try again later.", "error");
  }
};

const handleLogin = async (username, password, e) => {
  e.preventDefault();
  notify("Processing Authentication..", "loading");

  try {
    const response = await fetch(`${baseURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login Successful");
      // You can redirect or perform other actions after successful login
      localStorage.setItem("x-auth-token", data.user.token);
      localStorage.setItem("username", data.user.username);
      window.location.href = "/home"; // Redirect to home page after login
      notify("Login Successful", "success");
    } else {
      alert(data.error || data.message || "Invalid credentials");
      notify(data.error || data.message || "Invalid credentials", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
    notify("An error occurred. Please try again later.", "error");
  }
};

const authentication = {
  handleLogin,
  handleSignup,
};

export default authentication;

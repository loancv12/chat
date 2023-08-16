import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const Login = () => {
  const [errmsg, setErrmsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setErrmsg(error.message);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">Users Chat</h1>
        <h2 className="title">Login</h2>
        {errmsg && <p>{errmsg}</p>}
        <form action="" onSubmit={handleSubmit}>
          <input type="email" name="email" id="email" placeholder="email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />

          <button>Sign in</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

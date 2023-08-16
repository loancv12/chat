import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  console.log("currentUser navbar", currentUser);
  return (
    <div className="navbar">
      <span className="logo">Lama chat</span>
      <div className="user">
        <img src={currentUser?.photoURL} alt="" className="avatar" />
        <span>{currentUser?.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;

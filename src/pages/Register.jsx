import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [errmsg, setErrmsg] = useState("");
  const [fileAvatar, setFileAvatar] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    // debugger;
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    e.target[3].value = null;
    console.log(file);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const metadata = {
        contentType: "image/jpeg",
      };
      const date = new Date().getTime();

      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            setErrmsg(error.message);
          }
        });
      });
    } catch (err) {
      setErrmsg(err.message);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">Users Chat</h1>
        <h2 className="title">Register</h2>
        {errmsg && <p className="errmsg">{errmsg}</p>}
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="display name" />
          <input type="email" name="email" id="email" placeholder="email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <label htmlFor="file" className="file-avatar">
            <img src="vite.svg" alt="logo" />
            <span>Add an avatar</span>
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name="avatar"
            id="file"
            accept="image/*"
          />
          <button>Sign up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

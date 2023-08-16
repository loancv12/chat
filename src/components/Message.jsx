import React, { useEffect, useRef, useState } from "react";
import useChat from "../hooks/useChat";
import useAuth from "../hooks/useAuth";

function Message({ message }) {
  const { currentUser } = useAuth();
  const { data } = useChat();

  let owner = message.senderId === currentUser.uid;

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref={ref} className={`message ${owner && "owner"}`}>
      <div className="messageInfo">
        <img src={owner ? currentUser.photoURL : data.user.photoURL} alt="" />
        {/* <span>Just now</span> */}
      </div>
      <div className="messageContent">
        {message?.text && <p>{message.text}</p>}
        {message?.img && <img src={message.img} alt="h" />}
      </div>
    </div>
  );
}

export default Message;

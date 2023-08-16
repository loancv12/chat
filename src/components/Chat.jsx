import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import useChat from "../hooks/useChat";

function Chat() {
  const { data, dispatch } = useChat();

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data?.user?.displayName}</span>
        <div className="chatIcons">
          <img src="vite.svg" alt="" />
          <img src="vite.svg" alt="" />
          <img src="vite.svg" alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;

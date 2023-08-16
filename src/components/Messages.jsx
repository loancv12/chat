import Message from "./Message";
import React, { useEffect, useState } from "react";
import useChat from "../hooks/useChat";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

function Messages() {
  const { data, dispatch } = useChat();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // debugger;
    if (data.chatId) {
      const unsub = onSnapshot(
        doc(db, "chats", data.chatId),
        (doc) => {
          console.log("Current data: ", doc.data());
          let { messages } = doc.data();
          doc.exists() && setMessages(messages);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => {
        unsub();
      };
    }
  }, [data.chatId]);
  return (
    <div className="messages ">
      {messages?.map((m, i) => {
        return <Message message={m} key={i} />;
      })}
    </div>
  );
}

export default Messages;

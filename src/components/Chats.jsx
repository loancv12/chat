import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase/config";
import useChat from "../hooks/useChat";
import TimeAgo from "./TimeAgo";

function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  const { data, dispatch } = useChat();

  const handleSelect = (userInfo) => {
    dispatch({
      type: "CHANGE_USER",
      payload: userInfo,
    });
  };

  useEffect(() => {
    const getChats = () => {
      // debugger;
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        },
        (error) => {
          console.log(error);
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat, i) => {
          const { date, userInfo, lastMessage } = chat[1];
          return (
            <div
              className="userChat"
              key={i}
              onClick={() => handleSelect(userInfo)}
            >
              <img src={userInfo?.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{userInfo?.displayName}</span>
                <p>{lastMessage?.text}</p>
              </div>
              {lastMessage && <TimeAgo timestamp={date} />}
            </div>
          );
        })}
    </div>
  );
}

export default Chats;

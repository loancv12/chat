import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/config";
import useAuth from "../hooks/useAuth";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: "",
    user: {},
  };

  const { currentUser } = useAuth();

  const chatReducer = (state, action) => {
    let user = action.payload;
    let combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user,
          chatId: combinedId,
        };
        break;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

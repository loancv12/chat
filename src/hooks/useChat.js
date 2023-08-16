import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

const useChat = () => {
  const { data, dispatch } = useContext(ChatContext);
  return useContext(ChatContext);
};

export default useChat;

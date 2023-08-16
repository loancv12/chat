import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log("currentUser", currentUser);
  return useContext(AuthContext);
};

export default useAuth;

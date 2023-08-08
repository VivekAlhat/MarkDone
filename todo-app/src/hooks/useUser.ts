import { useContext } from "react";
import { IUserContext, UserContext } from "../context/UserContext";

const useUser = () => useContext<IUserContext>(UserContext);

export default useUser;

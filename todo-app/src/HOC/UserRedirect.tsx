import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

type UserRedirectProps = {
  children: React.ReactNode;
};

const UserRedirect = ({ children }: UserRedirectProps) => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (user) {
    navigate("/dashboard");
  }

  return children;
};

export default UserRedirect;

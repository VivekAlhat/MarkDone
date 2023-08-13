import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

type UserRedirectProps = {
  children: React.ReactNode;
};

const UserRedirect = ({ children }: UserRedirectProps) => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);
  return children;
};

export default UserRedirect;

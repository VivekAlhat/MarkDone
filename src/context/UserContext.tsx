import React, { createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "../db/supabase";

export interface IUserContext {
  user: User | null;
  isUserLoading: boolean;
}

type UserProviderProps = {
  children: React.ReactNode;
};

const defaultUser: IUserContext = {
  user: null,
  isUserLoading: false,
};

export const UserContext = createContext<IUserContext>(defaultUser);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchActiveSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          session?.user && setUser(session.user);
          setIsUserLoading(false);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setIsUserLoading(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchActiveSession = async () => {
    const activeSession = await supabase.auth.getSession();
    if (activeSession.data.session) {
      setUser(activeSession.data.session.user);
      setIsUserLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

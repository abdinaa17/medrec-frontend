import { createContext, useContext } from "react";
import type { User } from "../types/User";

const user: User = {
  firstName: "admin",
  lastName: "admin",
  username: "admin",
  role: "STAFF",
};

const GlobalContext = createContext<User | null>(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalContext.Provider value={user}>{children}</GlobalContext.Provider>
  );
};

export default AppProvider;

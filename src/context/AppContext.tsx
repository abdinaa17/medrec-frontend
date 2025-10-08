import { createContext, useContext } from "react";
import type { User } from "../types/User";

const user: User = {
  firstName: "Jamal",
  lastName: "Junior",
  username: "jjamal",
  role: "ADMIN",
};

const GlobalContext = createContext<User | null>(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalContext.Provider value={user}>{children}</GlobalContext.Provider>
  );
};

export default AppProvider;

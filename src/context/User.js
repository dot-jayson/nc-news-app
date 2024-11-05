import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [signedInUser, setSignedInUser] = useState("tickle122");

  return (
    <UserContext.Provider value={{ signedInUser, setSignedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

import * as React from "react";

export interface User {
  email: string;
  displayName: string;
  id: string;
  photoURL: string;
}

export interface UserStateInterface {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const DefaultUser: User = {
  email: "",
  displayName: "",
  id: "",
  photoURL: "",
};

export const DefaultUserState: UserStateInterface = {
  user: { email: "", displayName: "", id: "", photoURL: "" },
  setUser: () => {},
};

const GlobalUserContext = React.createContext(DefaultUserState);
export const ContextProvider = GlobalUserContext.Provider;

export default GlobalUserContext;

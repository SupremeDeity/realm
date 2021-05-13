export interface User {
  email: string;
  displayName: string;
  id: string;
  photoURL: string;
}

export const DefaultUser: User = {
  email: "",
  displayName: "",
  id: "",
  photoURL: "",
};

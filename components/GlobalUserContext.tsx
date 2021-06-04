export interface User {
  email: string;
  displayName: string;
  id: string;
  photoURL: string;
}

export const PrototypeUser: User = {
  email: "",
  displayName: "",
  id: "",
  photoURL: "",
};

export const isSameUser = (first: User, other: User) => {
  return (
    first.email === other.email &&
    first.displayName === other.displayName &&
    first.id === other.id &&
    first.photoURL === other.photoURL
  );
};

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  role: ROLE;
};

type ROLE = "ADMIN" | "STAFF";

export type User = {
  age: number;
  email: string;
  id: number;
  role: string;
  username: string;
};
export type GetUsersResponse = {
  users: User[];
  total: number;
  totalPages: number;
};

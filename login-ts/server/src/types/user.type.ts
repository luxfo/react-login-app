export type CreateUserRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type GetUserRequest = {
  id: string;
};

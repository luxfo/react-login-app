export type TUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TUserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

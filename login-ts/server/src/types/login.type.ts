export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type VerifyRequest = {
  verificationCode: string;
};

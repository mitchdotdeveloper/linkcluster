export type PostSignupResponse = {
  jwt: string;
  userID: number;
  username: string;
};

export type PostLoginResponse = {
  jwt: string;
  userID: number;
  username: string;
};

export type PostRefreshResponse = {
  jwt: string;
};

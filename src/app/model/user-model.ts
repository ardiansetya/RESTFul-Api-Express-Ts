export type userResponse = {
  username: string;
  name: string;
  token?: string;
};


export type createUserRequest = {
  username: string;
  name: string;
  password: string
};

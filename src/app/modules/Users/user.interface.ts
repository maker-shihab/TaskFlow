export type IUser = {
  name: {
    first: string;
    last: string;
  };
  username: string;
  role: string;
  email: string;
  password: string;
  isDeleted: boolean;
};

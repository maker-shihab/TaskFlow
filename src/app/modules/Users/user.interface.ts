export type IUser = {
  name: {
    first: string;
    last: string;
  };
  username: string;
  email: string;
  isDeleted: boolean;
};

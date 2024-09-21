export type IUser = {
  name: {
    first: string;
    last: string;
  };
  username: string;
  teams: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phoneNumber: string;
  occupations: string;
  isDeleted: boolean;
};

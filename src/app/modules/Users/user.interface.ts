export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  username: string;
  role: string;
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

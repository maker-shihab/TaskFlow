import Auth from "../app/modules/Auth/auth.model";

export const isUserEsist = async (email: string) => {
  const user = await Auth.findOne({ email: email });
  return user;
};

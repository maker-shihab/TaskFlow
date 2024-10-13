import axios from "axios";
import config from "../../../config";

export const exchangeCodeForToken = async (code: string) => {
  const tokenResponse = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      client_id: config.google_client_id,
      client_secret: config.google_client_secret,
      code,
      grant_type: "authorization_code",
      redirect_uri: config.google_redirect_uri,
    }
  );

  return tokenResponse.data;
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const userInfoResponse = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return userInfoResponse.data;
};

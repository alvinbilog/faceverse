import dotenv from 'dotenv';
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT as string;

const configVars = {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  SERVER_ENDPOINT,
};

export default configVars;

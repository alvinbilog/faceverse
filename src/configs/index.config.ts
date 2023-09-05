import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN as string;

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT as string;

const configVars = { JWT_SECRET_TOKEN, SERVER_ENDPOINT };

export default configVars;

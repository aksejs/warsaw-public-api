import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "./.env"),
  override: true,
});

export const API_KEY = process.env.API_KEY;

jest.setTimeout(20000);

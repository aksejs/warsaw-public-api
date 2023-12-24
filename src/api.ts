import axios, { AxiosInstance } from "axios";
import * as rax from "retry-axios";

import { Culture } from "./culture/culture";

export const API_URL = "https://api.um.warszawa.pl/api/action/";

export type WarsawPublicApiOptions = {
  token: string;
};

export class WarsawPublicApi {
  private readonly axiosInstance: AxiosInstance;
  options: Required<WarsawPublicApiOptions>;

  public cultureApi: Culture

  constructor(options: WarsawPublicApiOptions) {
    this.options = options;
    this.axiosInstance = axios.create({
      baseURL: API_URL,
    });
    rax.attach(this.axiosInstance);

    this.cultureApi = new Culture(this.axiosInstance, this.options.token)
  }
}

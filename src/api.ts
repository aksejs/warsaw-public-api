import axios, { AxiosInstance } from "axios";
import * as rax from "retry-axios";
import { TransportService } from "./services/transportService";

export const API_URL = "https://test.com/api/action";

export type WarsawPublicApiOptions = {
  apiKey: string;
};

export class WarsawPublicApi {
  private readonly axiosInstance: AxiosInstance;
  options: Required<WarsawPublicApiOptions>;

  public transportApi: TransportService;

  constructor(options: WarsawPublicApiOptions) {
    this.options = options;
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      params: {
        apiKey: this.options.apiKey,
      },
    });
    rax.attach(this.axiosInstance);

    this.transportApi = new TransportService(this.axiosInstance);
  }
}

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import * as rax from "retry-axios";

import { TransportService } from "./services/transportService";
import { EducationService } from "./services/educationService";
import { EcologyService } from "./services/ecologyService";
import { SatelliteDataService } from "./services/satelliteDataService";
import { GovernmentService } from "./services/governmentService";
import { SafetyService } from "./services/safetyService";
import { CultureService } from "./services/cultureService";
import { HttpsAgent } from "agentkeepalive";
import { RealtimeService } from "./services/realtimeService";

export const API_URL = "https://api.um.warszawa.pl/api";

export type WarsawPublicApiOptions = {
  apikey: string;
  axiosInstance?: AxiosInstance;
  config?: AxiosRequestConfig;
};

export const defaultHttpsAgent = new HttpsAgent({ keepAlive: true });
export const defaultTimeout = 10000;

const defaultConfig: AxiosRequestConfig = {
  timeout: defaultTimeout,
  httpsAgent: defaultHttpsAgent,
};

export class WarsawPublicApi {
  private readonly axiosInstance: AxiosInstance;

  protected _apikey: string;

  public transportApi!: TransportService;
  public educationApi!: EducationService;
  public ecologyApi!: EcologyService;
  public satelliteDataApi!: SatelliteDataService;
  public governmentApi!: GovernmentService;
  public safetyApi!: SafetyService;
  public cultureApi!: CultureService;
  public realtimeApi!: RealtimeService;

  constructor(options: WarsawPublicApiOptions) {
    let { axiosInstance, config, apikey } = options;
    this._apikey = apikey;

    if (axiosInstance) {
      axiosInstance.defaults.params = {
        ...axiosInstance.defaults.params,
        apikey,
      };
      this.axiosInstance = axiosInstance;
    } else if (config) {
      config = { ...defaultConfig, ...config };
      config.params = { ...config.params, apikey };
      config.headers = { ...defaultConfig.headers, ...(config.headers || {}) };
      this.axiosInstance = axios.create(config);
      // rax.attach(this.axiosInstance);
    } else {
      this.axiosInstance = axios.create({
        ...defaultConfig,
        baseURL: API_URL,
        params: {
          apikey,
        },
      });
      // rax.attach(this.axiosInstance);
    }

    this.transportApi = new TransportService(this.axiosInstance);
    this.educationApi = new EducationService(this.axiosInstance);
    this.ecologyApi = new EcologyService(this.axiosInstance);
    this.satelliteDataApi = new SatelliteDataService(this.axiosInstance);
    this.governmentApi = new GovernmentService(this.axiosInstance);
    this.safetyApi = new SafetyService(this.axiosInstance);
    this.cultureApi = new CultureService(this.axiosInstance);
    this.realtimeApi = new RealtimeService(this.axiosInstance);
  }

  getApikey() {
    return this._apikey;
  }

  getInstanceDefaults() {
    return this.axiosInstance.defaults;
  }
}

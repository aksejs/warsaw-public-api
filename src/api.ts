import axios, { AxiosInstance } from "axios";
import * as rax from "retry-axios";
import { TransportService } from "./services/transportService";
import { EducationService } from "./services/educationService";
import { EcologyService } from "./services/ecologyService";
import { SatelliteDataService } from "./services/satelliteDataService";
import { GovernmentService } from "./services/governmentService";
import { SafetyService } from "./services/safetyService";
import { CultureService } from "./services/cultureService";

export const API_URL = "https://test.com/api/action";

export type WarsawPublicApiOptions = {
  apiKey: string;
};

export class WarsawPublicApi {
  private readonly axiosInstance: AxiosInstance;
  options: Required<WarsawPublicApiOptions>;

  public transportApi!: TransportService;
  public educationApi!: EducationService;
  public ecologyApi!: EcologyService;
  public satelliteDataApi!: SatelliteDataService;
  public governmentApi!: GovernmentService;
  public safetyApi!: SafetyService;
  public cultureApi!: CultureService;

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
    this.educationApi = new EducationService(this.axiosInstance);
    this.ecologyApi = new EcologyService(this.axiosInstance);
    this.satelliteDataApi = new SatelliteDataService(this.axiosInstance);
    this.governmentApi = new GovernmentService(this.axiosInstance);
    this.safetyApi = new SafetyService(this.axiosInstance);
    this.cultureApi = new CultureService(this.axiosInstance);
  }
}

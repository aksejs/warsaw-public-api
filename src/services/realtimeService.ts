import { AxiosInstance, AxiosRequestConfig } from "axios";
import { BaseService } from "../utils/helpers";
import { RESOURCE_IDS } from "../utils/types";

interface BussesAndTramsResponse {
  result: Array<{
    Lines: string;
    Lon: number;
    VehicleNumber: string;
    Time: Date;
    Lat: number;
    Brigade: string;
  }>;
}

interface BussesAndTramsRequest extends AxiosRequestConfig {
  params: {
    type: number;
    line?: number;
    brigade: number;
  };
}

export class RealtimeService {
  protected readonly realTimeInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    axiosInstance.defaults.headers.post = {
      ...axiosInstance.defaults.headers.post,
      "Cache-Control": "no-cache",
    };
    this.realTimeInstance = axiosInstance;
  }

  /**
   * EN: Get current location of public transport
   * Info updates every 10 seconds
   * PL: API	udostępnia	aktualną	lokalizację	pojazdów	komunikacji	miejskiej
   * Informacje	o	położeniu	pojazdów	komunikacji	miejskiej	
   * aktualizowane	są	z	częstotliwością	10	sekund
   * 
   * https://api.um.warszawa.pl/files/9fae6f84-4c81-476e-8450-6755c8451ccf.pdf
   */
  public getBussesAndTrams(
    request: BussesAndTramsRequest
  ): Promise<BussesAndTramsResponse> {
    return this.realTimeInstance.get("/action/busestrams_get", {
      ...request,
      params: {
        ...request?.params,
        resource_id: RESOURCE_IDS.BUSES_AND_TRAMS,
      },
    });
  }
}

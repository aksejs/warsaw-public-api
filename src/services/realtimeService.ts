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

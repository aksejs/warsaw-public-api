import { AxiosRequestConfig } from "axios";
import { GeoParams, Geometry, WFS_IDS } from "../utils/types";
import { wfsstoreBaseHandler } from "../utils/handlers";
import { BaseService } from "../utils/helpers";

export interface TheatresResponse {
  data: {
    geometry: Geometry;
  };
}

export interface TheatresServiceRequest extends Partial<AxiosRequestConfig> {
  params: GeoParams;
}

export class CultureService extends BaseService {
  public getTheatres(requestParams: TheatresServiceRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      requestParams,
      WFS_IDS.URZADS
    );
  }
}

import { AxiosRequestConfig } from "axios";
import { GeoParams, WFS_IDS } from "../utils/types";
import { wfsstoreBaseHandler } from "../utils/handlers";
import { BaseService } from "../utils/helpers";

export class CultureService extends BaseService {
  public getTheatres(requestParams: GeoParams) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      requestParams,
      WFS_IDS.URZADS
    );
  }
}

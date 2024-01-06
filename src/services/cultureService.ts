import { AxiosRequestConfig } from "axios";
import { WFSStoreBaseRequest, WFS_IDS } from "../utils/types";
import { wfsstoreBaseHandler } from "../utils/handlers";
import { BaseService } from "../utils/helpers";

export class CultureService extends BaseService {
  /**
   * EN: Get dataset which provides vector maps in the form of JSON objects with theater locations.
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON z lokalizacją teatrów.
   *
   * https://api.um.warszawa.pl/files/a6c9f4b5-3c54-4e38-95cc-97bb9fca859e.pdf
   */
  public getTheatres(requestParams: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      WFS_IDS.URZADS,
      requestParams
    );
  }
}

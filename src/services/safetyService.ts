import { BaseService } from "../utils/helpers";
import { wfsstoreBaseHandler } from "../utils/handlers";
import { WFSStoreBaseRequest, WFS_IDS } from "../utils/types";

interface DefibrillatorsRequest {
  defibrillator_id?: string;
}

interface DefibrillatorLocation {
  geometry: {
    type: string;
    coordinates: number[][];
  };
  properties: DefibrillatorProperties;
}

interface DefibrillatorProperties {
  location_city: string;
  defibrillator_id: string;
  device_access_description: string;
  device_location: string;
  device_public_access: string;
  location_street: string;
  location_description: string;
  device_availability: string;
  location_postcode: string;
  location_object_name: string;
  device_manufacturer: string;
  location_building: string;
  device_specifications: string;
}

interface DefibrillatorLocationResponse {
  result: DefibrillatorLocation[];
}

export class SafetyService extends BaseService {
  /**
   * EN: Get difibrilators data
   * PL: API umożliwia pobranie danych na temat defibratorów.
   *
   * https://api.um.warszawa.pl/files/aecdc237-e4d2-4cba-9285-1fddb2ad2d70.pdf
   */
  public getDefibrillator(requestParams: DefibrillatorsRequest) {
    return this.axiosInstance.get<DefibrillatorLocationResponse>(
      "/action/aed_get",
      {
        params: {
          ...requestParams,
        },
      }
    );
  }

  /**
   * https://api.um.warszawa.pl/files/91a1b495-fb74-472e-9460-fe67cd807348.pdf
   */
  public getPoliceDepartments(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.POLICE_DEPARTMENTS
    );
  }
}

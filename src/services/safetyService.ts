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

  public getPoliceDepartments(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.POLICE_DEPARTMENTS
    );
  }
}

import { AxiosRequestConfig } from "axios";
import { BaseService } from "../utils/helpers";
import { WFSStoreBaseRequest, wfsstoreBaseHandler } from "../utils/handlers";
import { WFS_IDS } from "../utils/types";

interface DefibrillatorsRequest extends AxiosRequestConfig {
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
  public getDefibrillator(
    request: DefibrillatorsRequest
  ): Promise<DefibrillatorLocationResponse> {
    return this.axiosInstance.get("/action/aed_get", {
      ...request,
      params: {
        ...request.params,
      },
    });
  }

  public getPoliceDepartments(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.POLICE_DEPARTMENTS
    );
  }
}

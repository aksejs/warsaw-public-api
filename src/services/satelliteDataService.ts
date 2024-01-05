import { AxiosRequestConfig } from "axios";
import { wfsstoreBaseHandler } from "../utils/handlers";
import { BaseService } from "../utils/helpers";
import { WFSStoreBaseRequest, WFS_IDS } from "../utils/types";

interface Shape {
  type: string;
  coordinates: number[][][];
}

interface ParkingData {
  administrator: string;
  street_number: string;
  district: string;
  shape: Shape;
  street: string;
  number_of_places: number;
  id: number;
}

interface Shape {
  type: string;
  coordinates: number[][][];
}

interface ParkingData {
  administrator: string;
  street_number: string;
  district: string;
  shape: Shape;
  street: string;
  number_of_places: number;
  id: number;
}

interface RoadSignResult {
  id: number;
  angle_of_location: number;
  T29: boolean;
  text_sign: string;
  blue_place: boolean;
  district: string;
  shape: Shape;
}

interface RoadSignsResponse {
  result: RoadSignResult[];
}

interface DisabledParkingResponse {
  result: ParkingData[];
}

export class SatelliteDataService extends BaseService {
  public getDisabledParkings(
    request?: AxiosRequestConfig
  ): Promise<DisabledParkingResponse> {
    return this.axiosInstance.get("/action/disabled_parking_spaces", request);
  }

  public getENOMAddressPoints(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.ENOM_ADRESS_POINTS
    );
  }

  public getENOMStreets(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.ENOM_STREETS
    );
  }

  public getENOMSquares(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.ENOM_SQUARES
    );
  }

  public getPharmacies(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.PHARMACIES);
  }

  public getBikeLines(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.BIKE_LINES);
  }

  public getBikeStops(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.BIKE_STOPS);
  }

  public getSoccerFields(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.SOCCER_FIELDS
    );
  }

  public getSwimmingPools(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.SWIMMING_POOLS
    );
  }

  public getHotels(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.HOTELS);
  }

  public getDormitories(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.DORMITORIES
    );
  }

  public getD18ARoadSigns(
    request?: AxiosRequestConfig
  ): Promise<RoadSignsResponse> {
    return this.axiosInstance.get("/action/zdm_road_sign_d18a", request);
  }

  public getD18RoadSigns(
    request?: AxiosRequestConfig
  ): Promise<RoadSignsResponse> {
    return this.axiosInstance.get("/action/zdm_road_sign_d18", request);
  }

  public getD44D45RoadSigns(
    request?: AxiosRequestConfig
  ): Promise<RoadSignsResponse> {
    return this.axiosInstance.get("/action/zdm_road_sign_d44_d45", request);
  }
}

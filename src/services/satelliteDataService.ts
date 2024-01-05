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
  /**
   * EN: Get parking spaces for people with disabilities
   * PL: Miejsca parkingowe dla osób z niepełnosprawnością
   *
   * https://api.um.warszawa.pl/files/1758bc44-0e03-4d59-aa7d-4d3c23152621.pdf
   */
  public getDisabledParkings(
    request?: AxiosRequestConfig
  ): Promise<DisabledParkingResponse> {
    return this.axiosInstance.get("/action/disabled_parking_spaces", request);
  }

  /**
   * EN: Get Euronet ATMS locations
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON 
   * z lokalizacjąbankomatów sieci Euronet.
   *
   * https://api.um.warszawa.pl/files/cd0eb28b-5239-4abd-ad55-27948fc418f6.pdf
   */
    public getEuronetATMS(
      requestParams: WFSStoreBaseRequest
    ) {
      return wfsstoreBaseHandler(this.axiosInstance, requestParams, WFS_IDS.EURONET_ATMS)
    }

  /**
   * PL: ENOM (Ewidencja nazw obiektów miejskich) - Punkty adresowe
   *
   * https://api.um.warszawa.pl/files/2eb238fc-9204-4a06-b239-8a1ab883429a.pdf
   */
  public getENOMAddressPoints(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.ENOM_ADRESS_POINTS
    );
  }

  /**
   * PL: ENOM (Ewidencja nazw obiektów miejskich) - Ulice
   *
   * https://api.um.warszawa.pl/files/2eb238fc-9204-4a06-b239-8a1ab883429a.pdf
   */
  public getENOMStreets(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.ENOM_STREETS
    );
  }

  /**
   * PL: ENOM (Ewidencja nazw obiektów miejskich) - Place Skwery
   *
   * https://api.um.warszawa.pl/files/2eb238fc-9204-4a06-b239-8a1ab883429a.pdf
   */
  public getENOMSquares(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.ENOM_SQUARES
    );
  }

  /**
   * EN: Get city pharmacies locations
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON z lokalizacją aptek
   *
   * https://api.um.warszawa.pl/files/23a5fb3f-80bc-48c1-b8a5-e035b0e3f1c5.pdf
   */
  public getPharmacies(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.PHARMACIES);
  }

  /**
   * EN: Get bike lines locations
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON 
   * z lokalizacją tras rowerowych
   *
   * https://api.um.warszawa.pl/files/99251867-7895-44a3-b63f-dbe05935669d.pdf
   */
  public getBikeLines(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.BIKE_LINES);
  }

  /**
   * EN: Get bike stops locations
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON 
   * z lokalizacją stacji rowerów. 
   *
   * https://api.um.warszawa.pl/files/99251867-7895-44a3-b63f-dbe05935669d.pdf
   */
  public getBikeStops(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.BIKE_STOPS);
  }

  /**
   * EN: Get the pitches and football stadiums locations
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON 
   * z lokalizacją boisk i stadionów piłkarskich
   *
   * https://api.um.warszawa.pl/files/483e3dd3-35af-4c41-8728-a92ed4ced474.pdf
   */
  public getSoccerFields(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.SOCCER_FIELDS
    );
  }

  /**
   * EN: Get swimming pool locations
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON 
   * z lokalizacją pływalni
   *
   * https://api.um.warszawa.pl/files/483e3dd3-35af-4c41-8728-a92ed4ced474.pdf
   */
  public getSwimmingPools(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.SWIMMING_POOLS
    );
  }

  /**
   * EN: Get hotels locations
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON z lokalizacją hoteli
   *
   * https://api.um.warszawa.pl/files/00d70bdb-4f2e-496f-afaf-1289206e8e8a.pdf
   */
  public getHotels(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.HOTELS);
  }

  /**
   * EN: Get dormitories locations
   * PL: Zbiór danych udostępnia mapy wektorowe, w formie obiektów JSON z lokalizacją akademików 
   *
   * https://api.um.warszawa.pl/files/00d70bdb-4f2e-496f-afaf-1289206e8e8a.pdf
   */
  public getDormitories(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      WFS_IDS.DORMITORIES
    );
  }

  /**
   * EN: Get road signs D-18a in the Paid Unguarded Parking Zone in Warsaw
   * PL: Znaki drogowe D-18a w Strefie Płatnego Parkowania Niestrzeżonego w Warszawie 
   *
   * https://api.um.warszawa.pl/files/ada9ba35-7167-4d91-ad0a-a7a4752d79f2.pdf
   */
  public getD18ARoadSigns(
    request?: AxiosRequestConfig
  ): Promise<RoadSignsResponse> {
    return this.axiosInstance.get("/action/zdm_road_sign_d18a", request);
  }

  /**
   * EN: Get road signs D-18 in the Paid Unguarded Parking Zone in Warsaw
   * PL: Znaki drogowe D-18 w Strefie Płatnego Parkowania Niestrzeżonego w Warszawie 
   *
   * https://api.um.warszawa.pl/files/ada9ba35-7167-4d91-ad0a-a7a4752d79f2.pdf
   */
  public getD18RoadSigns(
    request?: AxiosRequestConfig
  ): Promise<RoadSignsResponse> {
    return this.axiosInstance.get("/action/zdm_road_sign_d18", request);
  }

  /**
   * EN: Get road signs D-44/D-45 in the Paid Unguarded Parking Zone in Warsaw
   * PL: Znaki drogowe D-44/D-45 w Strefie Płatnego Parkowania Niestrzeżonego w Warszawie 
   *
   * https://api.um.warszawa.pl/files/ada9ba35-7167-4d91-ad0a-a7a4752d79f2.pdf
   */
  public getD44D45RoadSigns(
    request?: AxiosRequestConfig
  ): Promise<RoadSignsResponse> {
    return this.axiosInstance.get("/action/zdm_road_sign_d44_d45", request);
  }
}

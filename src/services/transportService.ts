import { AxiosRequestConfig } from "axios";
import { Value } from "../utils/types";
import { BaseService } from "../utils/helpers";
import {
  DBStoreBaseRequest,
  WFSStoreBaseRequest,
  dbstoreBaseHandler,
  wfsstoreBaseHandler,
} from "../utils/handlers";

export enum ZTMTimetableIDS {
  STOPS = "b27f4c17-5c50-4a5b-89dd236b282bc499",
  LINES = "88cd555f-6f31-43ca-9de4-66c479ad5942",
  SCHEDULES = "e923fa0e-d96c-43f9-ae6e60518c9f3238",
}

export enum TransportIDS {
  BIKE_STATIONS = "8a235d27-b96a-4876-9b92-9e164940c9b6",
  BIKE_ROUTES = "d2f0c41f-cda1-440a-8a27-f01f724529f8",
  PARKINGS = "157648fd-a603-4861-af96-884a8e35b155",
  METRO_ENTRANCES = "0ac7f6d1-a26b-430f-9e3d-a41c5356b9a3",
}

export enum StopsIDS {
  STOPS_COORDS = "1c08a38c-ae09-46d2-8926-4f9d25cb0630",
  STOP_COORDS_FOR_CURRENT_DAY = "ab75c33d-3a26-4342-b36a-6e5fef0a3ac3",
}

interface ZTMTimetableRequest {
  name?: string;
  busstopId?: number;
  busstopNr?: string;
  line?: number;
}

interface ZTMTimetableResponse {
  result: Array<{
    values: Value[];
  }>;
}

interface UrbanTransportRoutesResponse {
  result: {
    [key: number]: {
      [key: string]: {
        [key: number]: {
          odleglosc: number;
          ulica_id: string;
          nr_zespolu: string;
          typ: string;
          nr_przystanku: string;
        };
      };
    };
  };
}

interface DictionaryResponse {
  result: {
    uilice: {
      [key: number]: string;
    };
    typy_przystankow: {
      [key: number]: string;
    };
    miejsca: {
      [key: number | string]: string;
    };
  };
}

export class TransportService extends BaseService {
  public getTimetableStops(request: ZTMTimetableRequest) {
    return this.axiosInstance.get<ZTMTimetableResponse>(
      "/action/dbtimetable_get",
      {
        params: {
          ...request,
          id: ZTMTimetableIDS.STOPS,
        },
      }
    );
  }

  public getTimetableLines(request: ZTMTimetableRequest) {
    return this.axiosInstance.get<ZTMTimetableResponse>(
      "/action/dbtimetable_get",
      {
        params: {
          ...request,
          id: ZTMTimetableIDS.LINES,
        },
      }
    );
  }

  public getTimetableSchedules(request: ZTMTimetableRequest) {
    return this.axiosInstance.get<ZTMTimetableResponse>(
      "/action/dbtimetable_get",
      {
        params: {
          ...request,
          id: ZTMTimetableIDS.SCHEDULES,
        },
      }
    );
  }

  public getTransportBikeStations(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      TransportIDS.BIKE_STATIONS
    );
  }

  public getTransportBikeRoutes(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      TransportIDS.BIKE_ROUTES
    );
  }

  public getTransportParkings(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      TransportIDS.PARKINGS
    );
  }

  public getTransportMetroEntrances(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      request,
      TransportIDS.METRO_ENTRANCES
    );
  }

  public getStopsCoords(request?: DBStoreBaseRequest) {
    return dbstoreBaseHandler(
      this.axiosInstance,
      StopsIDS.STOPS_COORDS,
      request
    );
  }

  public getStopsCurrent(request: DBStoreBaseRequest) {
    return dbstoreBaseHandler(
      this.axiosInstance,
      StopsIDS.STOP_COORDS_FOR_CURRENT_DAY,
      request
    );
  }

  public getUrbanTransportRoutes() {
    return this.axiosInstance.get<UrbanTransportRoutesResponse>(
      "/action/public_transport_routes"
    );
  }

  public getDictionary() {
    return this.axiosInstance.get<DictionaryResponse>(
      "/action/public_transport_dictionary"
    );
  }
}

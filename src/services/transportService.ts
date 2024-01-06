import { Value, WFSStoreBaseRequest } from "../utils/types";
import { BaseService } from "../utils/helpers";
import {
  DBStoreBaseRequest,
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
  /**
   * EN: Get stops timetables
   * PL: Pobranie	zespołu	przystanków
   *
   * https://api.um.warszawa.pl/files/91f49cb2-9ffb-41bd-8e25-5204bb9da990.pdf
   */
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

  /**
   * EN: Get timetable lines
   * PL: Pobranie	linii	dostępnych na	przystanku
   *
   * https://api.um.warszawa.pl/files/91f49cb2-9ffb-41bd-8e25-5204bb9da990.pdf
   */
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

  /**
   * EN: Get timetable for the line
   * PL: Pobranie	rozkładu	jazdy	dla	linii
   *
   * https://api.um.warszawa.pl/files/91f49cb2-9ffb-41bd-8e25-5204bb9da990.pdf
   */
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

  /**
   * EN: Get bike stop stations. Returns vector map represented as JSON
   * PL: Mapy wektorowe, w formie obiektów JSON z lokalizacją stacji rowerów
   *
   * https://api.um.warszawa.pl/files/10d27093-8fc1-4416-814d-ff40c5631fcb.pdf
   */
  public getTransportBikeStations(requestParams: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      TransportIDS.BIKE_STATIONS,
      requestParams
    );
  }

  /**
   * EN: Get bike routes. Returns vector map represented as JSON
   * PL: Mapy wektorowe, w formie obiektów JSON z lokalizacją tras rowerowych
   *
   * https://api.um.warszawa.pl/files/10d27093-8fc1-4416-814d-ff40c5631fcb.pdf
   */
  public getTransportBikeRoutes(requestParams: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      TransportIDS.BIKE_ROUTES,
      requestParams
    );
  }

  /**
   * EN: Get parkinkgs P+R. Returns vector map represented as JSON
   * PL: Mapy wektorowe, w formie obiektów JSON z lokalizacją parkingów P+R
   *
   * https://api.um.warszawa.pl/files/10d27093-8fc1-4416-814d-ff40c5631fcb.pdf
   */
  public getTransportParkings(requestParams: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      TransportIDS.PARKINGS,
      requestParams
    );
  }

  /**
   * EN: Get metro entrances. Returns vector map represented as JSON
   * PL: Mapy wektorowe, w formie obiektów JSON z lokalizacją wejść do metra
   *
   * https://api.um.warszawa.pl/files/10d27093-8fc1-4416-814d-ff40c5631fcb.pdf
   */
  public getTransportMetroEntrances(requestParams: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      TransportIDS.METRO_ENTRANCES,
      requestParams
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

  /**
   * EN: Get data of the current routes of Warsaw Public Transport
   * PL: API umożliwia odczyt danych na temat bieżących tras przejazdu pojazdów Warszawskiego Transportu
   * Publicznego (WTP)
   *
   * https://api.um.warszawa.pl/files/495fc3e8-a32e-4c32-a4ca-0e3c9a4eed4f.pdf
   */
  public getUrbanTransportRoutes() {
    return this.axiosInstance.get<UrbanTransportRoutesResponse>(
      "/action/public_transport_routes"
    );
  }

  /**
   * EN: Get dictionary of terms used in other endpoints related to Warsaw Public Transport
   * PL: API umożliwia odczyt słownika pojęć używanych w innych endpointach dotyczących Warszawskiego
   * Transportu Publicznego (WTP).
   *
   * https://api.um.warszawa.pl/files/4fd88d4a-3389-48c4-a8c2-b02c2f0d9dd1.pdf
   */
  public getDictionary() {
    return this.axiosInstance.get<DictionaryResponse>(
      "/action/public_transport_dictionary"
    );
  }
}

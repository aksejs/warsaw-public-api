import {
  DBStoreIDS,
  WFSStoreBaseRequest,
  WFS_IDS,
  ZTMTimetableIDS,
} from "../utils/types";
import { BaseService } from "../utils/helpers";
import {
  DBStoreBaseRequest,
  ZTMTimetableRequest,
  dbTimetableBaseHandler,
  dbstoreBaseHandler,
  wfsstoreBaseHandler,
} from "../utils/handlers";

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
    return dbTimetableBaseHandler(
      this.axiosInstance,
      ZTMTimetableIDS.STOPS,
      request
    );
  }

  /**
   * EN: Get timetable lines
   * PL: Pobranie	linii	dostępnych na	przystanku
   *
   * https://api.um.warszawa.pl/files/91f49cb2-9ffb-41bd-8e25-5204bb9da990.pdf
   */
  public getTimetableLines(request: ZTMTimetableRequest) {
    return dbTimetableBaseHandler(
      this.axiosInstance,
      ZTMTimetableIDS.LINES,
      request
    );
  }

  /**
   * EN: Get timetable for the line
   * PL: Pobranie	rozkładu	jazdy	dla	linii
   *
   * https://api.um.warszawa.pl/files/91f49cb2-9ffb-41bd-8e25-5204bb9da990.pdf
   */
  public getTimetableSchedules(request: ZTMTimetableRequest) {
    return dbTimetableBaseHandler(
      this.axiosInstance,
      ZTMTimetableIDS.SCHEDULES,
      request
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
      WFS_IDS.BIKE_STATIONS,
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
      WFS_IDS.BIKE_ROUTES,
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
      WFS_IDS.PARKINGS,
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
      WFS_IDS.METRO_ENTRANCES,
      requestParams
    );
  }

  public getStopsCoords(request?: DBStoreBaseRequest) {
    return dbstoreBaseHandler(
      this.axiosInstance,
      DBStoreIDS.STOPS_COORDS,
      request
    );
  }

  public getStopsCurrent(request: DBStoreBaseRequest) {
    return dbstoreBaseHandler(
      this.axiosInstance,
      DBStoreIDS.STOP_COORDS_FOR_CURRENT_DAY,
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

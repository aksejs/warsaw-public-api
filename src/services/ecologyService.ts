import {
  DataStorageBaseRequest,
  dataStorageBaseHandler,
} from "../utils/handlers";
import { BaseService } from "../utils/helpers";
import { RESOURCE_IDS } from "../utils/types";

interface MunicipalWastesRecord {
  _id: number;
  Identyfikator: number;
  Nazwa: string;
  Synonim: string;
  Typ: string;
  Opis: string;
  Tak: string;
  Nie: string;
}

type AirQualityInfo = {
  name: string;
  recommendations?: string;
};

type AirQualityAddress = {
  city: string;
  street: string;
  zip_code: string;
  district: string;
  commune: string;
};

type AirQualityDataEntry = {
  ijp: AirQualityInfo;
  param_name: string;
  param_code: string;
  value: number;
  time: string;
  unit: string;
};

type AirQualityResult = {
  ijp: AirQualityInfo;
  data_source: string;
  name: string;
  station_type: string;
  lon: number;
  owner: string;
  station: string;
  address: AirQualityAddress;
  lat: number;
  data: AirQualityDataEntry[];
};

interface AirQualityResponse {
  result: AirQualityResult[];
}

interface PlantRecord {
  _id: number;
  x_wgs84: number;
  y_wgs84: number;
  x_pl2000: number;
  y_pl2000: number;
  numer_inw: string;
  dzielnica: string;
  jednostka: string;
  miasto: string;
  adres: string;
  numer_adres: string;
  lokalizacja: string;
  gatunek: string;
  gatunek_1: string;
  data_wyk_pom: number;
  wiek_w_dni: number;
  wysokosc: string;
  pnie_obwod: string;
  srednica_k: string;
  stan_zdrowia: string;
}

interface GroupOfPlantsRecord {
  _id: number;
  x_wgs84: number;
  y_wgs84: number;
  x_pl2000: number;
  y_pl2000: number;
  id_obrysu: number;
  partid_obrysu: number;
  numer_inw: string;
  dzielnica: string;
  jednostka: string;
  miasto: string;
  adres: string;
  lokalizacja: string;
  gatunki: string;
  data_wyk_pom: number;
  wiek_w_dni: number;
  powierzchnia: string;
  wysokosc: string;
  stan_zdrowia: string;
}

interface ForestsRecord {
  _id: number;
  x_wgs84: number;
  y_wgs84: number;
  x_pl2000: number;
  y_pl2000: number;
  id: number;
  partid: number;
  dzielnica: string;
  obwód: string;
  osiedle: string;
  nr_oddz: string;
  poddz: string;
  powierzchnia: string;
  stl: string;
  powierzchnia1: string;
  gat_panujacy: string;
  udział: string;
  wiek: number;
  bonitacja: string;
  zadrzewienie: string;
  zwarcie: string;
  zmieszanie: string;
  podrost: string;
  podszyt: string;
  typ_planu: string;
  planu: string;
  obowiazywanie: string;
  shape_area: number;
  shape_len: number;
}

export class EcologyService extends BaseService {
  /**
   * EN: Info from SegregujNa5.um.warszawa.pl
   * PL: API udostępnia informacje zawarte w wyszukiwarce SegregujNa5.um.warszawa.pl.
   *
   * https://api.um.warszawa.pl/files/43e7db4f-7b12-404e-8a0d-b659c304ff9d.pdf
   */
  public getMunicipalWastes(requestParams?: DataStorageBaseRequest) {
    return dataStorageBaseHandler<MunicipalWastesRecord>(
      this.axiosInstance,
      RESOURCE_IDS.MUNICIPAL_WASTES,
      requestParams
    );
  }

  /**
   * EN: Get air quality data
   * PL: API umożliwia odczyt danych na temat jakości powietrza w Warszawie oraz gminach ościennych
   *
   * https://api.um.warszawa.pl/files/0f6cd27d-18c4-4f2f-83f9-ed505304c6b6.pdf
   */
  public getAirQuality() {
    return this.axiosInstance.get<AirQualityResponse>(
      "/action/air_sensors_get"
    );
  }

  /**
   * EN: Get bushes location
   * PL: Położenie pojedynczych krzewów
   *
   * https://api.um.warszawa.pl/files/ee7ba488-6e45-43c7-b505-3a99c18ad6c5.pdf
   */
  public getBushes(requestParams?: DataStorageBaseRequest) {
    return dataStorageBaseHandler<PlantRecord>(
      this.axiosInstance,
      RESOURCE_IDS.BUSHES,
      requestParams
    );
  }

  /**
   * EN: Get bushes (group) location
   * PL: Położenie (obrysy) grup krzewów
   *
   * https://api.um.warszawa.pl/files/ee7ba488-6e45-43c7-b505-3a99c18ad6c5.pdf
   */
  public getGroupOfBushes(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<GroupOfPlantsRecord>(
      this.axiosInstance,
      RESOURCE_IDS.GROUP_OF_BUSHES,
      requestParams
    );
  }

  /**
   * EN: Get trees location
   * PL: Położenie pojedynczych drzew
   *
   * https://api.um.warszawa.pl/files/bd15b25c-eb84-4996-a5ca-812ffa3ef666.pdf
   */
  public getTrees(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<PlantRecord>(
      this.axiosInstance,
      RESOURCE_IDS.TREES,
      requestParams
    );
  }
  /**
   * EN: Get trees (group) location
   * PL: Położenie (obrysy) grup drzew
   *
   * https://api.um.warszawa.pl/files/bd15b25c-eb84-4996-a5ca-812ffa3ef666.pdf
   */
  public getGroupOfTrees(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<GroupOfPlantsRecord>(
      this.axiosInstance,
      RESOURCE_IDS.GROUP_OF_TREES,
      requestParams
    );
  }
  /**
   * EN: The dataset contains data on forest divisions and
   * forest fragments with uniform undergrowth
   * economic features (e.g. age, species composition).
   * PL: Zbiór danych zawiera dane o wydzieleniach leśnych i
   * fragmentach lasów o jednolitych pod
   * względem gospodarczym cechach (np. wiek, skład gatunkowy).
   *
   * https://api.um.warszawa.pl/files/5296e09c-4ab2-41a5-ac85-81c04b9c7462.pdf
   */
  public getForests(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<ForestsRecord>(
      this.axiosInstance,
      RESOURCE_IDS.FORESTS,
      requestParams
    );
  }
}

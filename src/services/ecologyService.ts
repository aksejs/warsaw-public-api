import { AxiosRequestConfig } from "axios";
import {
  DataStorageBaseRequest,
  DataStorageBaseResponse,
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
  public getMunicipalWastes(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<MunicipalWastesRecord>> {
    return this.axiosInstance.get("datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.MUNICIPAL_WASTES,
      },
    });
  }

  public getAirQuality(
    request?: AxiosRequestConfig
  ): Promise<AirQualityResponse> {
    return this.axiosInstance.get("/action/air_sensors_get", {
      ...request,
    });
  }

  public getBushes(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<PlantRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.BUSHES,
      },
    });
  }

  public getGroupOfBushes(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<GroupOfPlantsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.GROUP_OF_BUSHES,
      },
    });
  }

  public getTrees(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<PlantRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.TREES,
      },
    });
  }

  public getGroupOfTrees(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<GroupOfPlantsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.GROUP_OF_TREES,
      },
    });
  }

  public getForests(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<ForestsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.FORESTS,
      },
    });
  }
}

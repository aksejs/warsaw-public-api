import {
  DataStorageBaseRequest,
  DataStorageBaseResponse,
} from "../utils/handlers";
import { BaseService } from "../utils/helpers";
import { Field, RESOURCE_IDS } from "../utils/types";

interface Record {
  _id: number;
  "Nr RSPO": number;
  "Typ szkoły/placówki": string;
  "Nazwa szkoły/placówki": string;
  Województwo: string;
  Powiat: string;
  Gmina: string;
  Miejscowość: string;
  Ulica: string;
  "Nr domu": string;
  "Nr mieszkania": string;
  "Kod pocztowy": string;
  Poczta: string;
  Telefon: string;
  "E-mail": string;
  "Typ organu prowadzącego": string;
  Publiczność: string;
  "Kategoria uczniów": string;
  "Specyfika szkoły": string;
  "Rodzaj placówki": string;
}

interface InternetAccessRecord extends Record {
  "Łącze telefoniczne - do 1 Mbit": 1 | 0 | null;
  "Łącze telefoniczne - do 2 Mbit": 1 | 0 | null;
  "Łącze telefoniczne - do 10 Mbit ": 1 | 0 | null;
  "Łącze telefoniczne - powyżej 10 Mbit ": 1 | 0 | null;
  "łącze TV - do 1 Mbit": 1 | 0 | null;
  "łącze TV - do 2 Mbit ": 1 | 0 | null;
  "łącze TV - do 10 Mbit": 1 | 0 | null;
  "łącze TV - powyżej 10 Mbit": 1 | 0 | null;
  "Światłowód - do 1 Mbit": 1 | 0 | null;
  "Światłowód - do 2 Mbit": 1 | 0 | null;
  "Światłowód - do 10 Mbit ": 1 | 0 | null;
  "Światłowód - powyżej 10 Mbit ": 1 | 0 | null;
  "Łącze SAT -do 1 Mbit: 1 | 0 ": null;
  "Łącze SAT - do 2 Mbit ": 1 | 0 | null;
  "Łącze SAT - do 10 Mbit": 1 | 0 | null;
  "Łącze SAT - powyżej 10 Mbit ": 1 | 0 | null;
  "Łącze radio - do 1 Mbit ": 1 | 0 | null;
  "Łącze radio - do 2 Mbit ": 1 | 0 | null;
  "Łącze radio - do 10 Mbit ": 1 | 0 | null;
  "Łącze radio - powyżej 10 Mbit ": 1 | 0 | null;
  "Łącze tel kom - do 1 Mbit": 1 | 0 | null;
  "Łącze tel kom - do 2 Mbit": 1 | 0 | null;
  "Łącze tel kom - do 10 Mbit": 1 | 0 | null;
  "Łącze tel kom - powyżej 10 Mbit": 1 | 0 | null;
}

interface EducationRoomsRecord extends Record {
  "Typ szkoły/placówki": "Bursa";
  "Nazwa szkoły/placówki": "BURSA SZKOLNA NR 5 IM PPŁK MGR INŻ GRAŻYNY LIPIŃSKIEJ";
  "sala lekcyjna": null;
  "pracownia szkolna": null;
  " pracownia do prowadzenia praktycznej nauki zawodów": null;
  biblioteka: null;
  świetlica: 2;
  "pomieszczenia do prowadzenia zajęć wychowania fizycznego": null;
  "kuchnia i stołówka": 1;
  "pomieszczenie wielofunkcyjne": 3;
  gabinet: null;
  "pozostałe pomieszczenia": null;
}

interface ComputersPurposesRecord extends Record {
  "dydaktyka ogółem": number | null;
  "dydaktyka z dostępem do internetu": number | null;
  "dydaktyka  przenośne": number | null;
  "z tego w bibliotece - ogółem": number | null;
  "z tego w bibliotece - z dostępem do internetu": number | null;
  "z tego w bibliotece - przenośne": number | null;
  "z tego dostępne dla uczniów - ogółem": number | null;
  "z tego dostępne dla uczniów - z dostępem do internetu": number | null;
  "z tego dostępne dla uczniów - przenośne": number | null;
  "pozostałe - ogółem": number | null;
  "pozostałe - z dostępem do internetu": number | null;
  "pozostałe - przenośne": number | null;
}
interface StatisticsRecord {
  _id: number;
  typ: string;
  "Ogółem placówki": number | string;
  "Ogółem nauczyciele": number | string;
  "Ogółem uczniowie": number | string;
  "Publiczne JST placówki": number | string;
  "Publiczne JST nauczyciele": number | string;
  "Publiczne JST uczniowie": number | string;
  "Publ. inne ni¿ JST placówki": number | string;
  "Publ. inne ni¿ JST nauczyciele": number | string;
  "Publ. inne ni¿ JST uczniowie": number | string;
  "Niepubliczne placówki": number | string;
  "Niepubliczne nauczyciele": number | string;
  "Niepubliczne uczniowie": number | string;
}

export interface InternetAccessResponse {
  result: {
    include_total: boolean;
    resource_id: string;
    field: Field[];
    records_format: string;
    records: InternetAccessRecord[];
  };
}

export interface ComputersPurposesResponse {
  result: {
    include_total: boolean;
    resource_id: string;
    fields: Field[];
    records_format: string;
    records: ComputersPurposesRecord[];
  };
}

export class EducationService extends BaseService {
  public getInternetAccess(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<InternetAccessRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.INTERNET_ACCESS,
      },
    }) as Promise<DataStorageBaseResponse<InternetAccessRecord>>;
  }

  public getComputersPurposes(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<ComputersPurposesRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.INTERNET_ACCESS,
      },
    }) as Promise<DataStorageBaseResponse<ComputersPurposesRecord>>;
  }

  public getSchoolStatistics(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<StatisticsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.SCHOOL_STATISTICS,
      },
    }) as Promise<DataStorageBaseResponse<StatisticsRecord>>;
  }

  public getSchoolStatisticsByChilds(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<StatisticsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.SCHOOL_STATISTICS_CHILDRENS,
      },
    }) as Promise<DataStorageBaseResponse<StatisticsRecord>>;
  }

  public getSchoolStatisticsByYouth(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<StatisticsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.SCHOOL_STATISTICS_YOUTH,
      },
    }) as Promise<DataStorageBaseResponse<StatisticsRecord>>;
  }

  public getSchoolStatisticsByAdults(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<StatisticsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.SCHOOL_STATISTICS_ADULTS,
      },
    }) as Promise<DataStorageBaseResponse<StatisticsRecord>>;
  }

  public getSchoolStatisticsNoCategory(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<StatisticsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.SCHOOL_STATISTICS_NO_CATEGORY,
      },
    }) as Promise<DataStorageBaseResponse<StatisticsRecord>>;
  }

  public getEducationRooms(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<EducationRoomsRecord>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.EDUCATION_ROOMS,
      },
    });
  }

  public getFacilities(
    request: DataStorageBaseRequest
  ): Promise<DataStorageBaseResponse<Record>> {
    return this.axiosInstance.get("/action/datastore_search", {
      ...request,
      params: {
        ...request.params,
        resource_id: RESOURCE_IDS.EDUCATION_FACILITIES,
      },
    });
  }
}

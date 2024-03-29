import { AxiosRequestConfig } from "axios";
import { wfsstoreBaseHandler } from "../utils/handlers";
import { BaseService } from "../utils/helpers";
import { OTHER_IDS, WFSStoreBaseRequest, WFS_IDS } from "../utils/types";

interface HotlineCategoriesResult {
  subcategoryId: string;
  eventId: string;
  subcategoryCode: string;
  categoryName: string;
  eventDescRequired: boolean;
  eventName: string;
  subcategoryName: string;
  categoryId: string;
}

interface HotlineGetIncidentsResult {
  caseId: string;
  deviceType: string;
  street2: string;
  district: string;
  city: string;
  categoryName: string;
  subcategoryName: string;
  desc: string;
  createDate: string;
  number: string;
  lon: number;
  lat: number;
  Status: string;
}

interface HotlineCategoriesResponse {
  result: {
    totalRecords: number | null;
    message: string;
    result: HotlineCategoriesResult[];
  };
}

interface HotlineGetIncidentsResponse {
  result: {
    totalRecords: number | null;
    message: string;
    result: HotlineGetIncidentsResult[];
  };
}

interface HotlinePostIncidentsResponse {
  result: {
    success: boolean;
    result: ResultData;
  };
}

interface HotlinePostIncidentsRequest extends AxiosRequestConfig {
  data: PostRequestBody;
}

interface HotlineGetIncidentsRequest extends AxiosRequestConfig {
  incidentId: string;
  history: boolean;
}

interface ResultData {
  totalRecords: string;
  message: string;
  result: IncidentRecord[];
}

interface IncidentRecord {
  status: string;
  city: string;
  categoryName: string;
  district: string;
  createDate: string;
  lon: number;
  caseId: string;
  number: string;
  eventName: string;
  street: string;
  subcategoryName: string;
  lat: number;
  houseNumber: string;
  id: string;
  sourceType: string;
}

interface PostRequestBody {
  filters: Filter[];
  operators: string[];
  sorters: Sorter[];
  paginator: Paginator;
}

interface Filter {
  field: string;
  operator: string;
  value: string[];
}

interface Sorter {
  field: string;
  sorterType: string;
}

interface Paginator {
  resultLimit: number;
  resultOffset: number;
}

interface EventsResponse {
  result: {
    category: Array<{
      id: string;
      name: string;
    }>;
    language: string;
    lead: string;
    localization: Array<{
      id: string;
      name: string;
    }>;
    url: string;
    text: string;
    image: {
      highlighted: {
        path: string;
      };
      small: {
        path: string;
      };
    };
    title: string;
    availableLanguages: string[];
    occurrence: Array<{ to: string; from: string; daily: boolean }>;
  };
}

type Geometry = {
  type: string;
  coordinates: [number, number];
};

type Item = {
  id: string;
  name: string;
};

type Feature = {
  geometry: Geometry;
  type: string;
  properties: Record<string, unknown>;
};

interface SportActivitiesResponse {
  results: Array<{
    category: Item[];
    map: {
      type: string;
      features: Feature[];
    };
    dedicated: Item[];
    language: string;
    localization: Item[];
    url: string;
    text: string;
    image: {
      small: {
        caption?: string;
        path: string;
      };
    };
    title: string;
    availableLanguages: string[];
    time: string;
    date: string[];
    day: Record<string, unknown>[];
  }>;
}

type PublicConsultationsResult = {
  attributes: {
    "zip-code": null | string;
    subtitle: string;
    description: string;
    recipients: string;
    title: string;
    url: string;
    "start-date": string;
    "category-id": number;
    longitude: null | number;
    tags: string;
    "banner-image": null | string;
    address: string;
    latitude: null | number;
    "short-description": string;
    "district-id": number;
    "end-date": string;
    slug: string;
    "hero-image": string;
  };
  type: string;
  id: string;
};

interface PublicConsultationsResponse {
  results: PublicConsultationsResult[];
}

export class GovernmentService extends BaseService {
  /**
   * EN: Get "urzads" locations
   * PL: Zbiór danych udostępnia mapy wektorowe,
   * w formie obiektów JSON z lokalizacją biur Urzędu Miasta.
   *
   * https://api.um.warszawa.pl/files/1590c3a8-eb00-400b-92db-7b5a57decb50.pdf
   */
  public getUrzads(requestParams: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(
      this.axiosInstance,
      WFS_IDS.URZADS,
      requestParams
    );
  }

  /**
   * EN: Get 19115 categories
   * PL: Pobranie informacji o kategoriach 19115
   *
   * https://api.um.warszawa.pl/files/7da29867-40cb-4d6a-b1cf-329cccfafa08.pdf
   */
  public get19115Categories() {
    return this.axiosInstance.get<HotlineCategoriesResponse>(
      "/action/19115v2_categories"
    );
  }

  /**
   * PL: (POST) Pobranie listy zgłoszeń 19115
   *
   * https://api.um.warszawa.pl/files/7da29867-40cb-4d6a-b1cf-329cccfafa08.pdf
   */
  public post19115Incidents(
    requestBody?: HotlinePostIncidentsRequest
  ): Promise<HotlinePostIncidentsResponse> {
    return this.axiosInstance.post(
      "/action/19115v2_incidents",
      JSON.stringify(requestBody?.data)
    );
  }

  /**
   * PL: (GET) Pobieranie zgłoszenia 19115
   *
   * https://api.um.warszawa.pl/files/7da29867-40cb-4d6a-b1cf-329cccfafa08.pdf
   */
  public get19115Incidents(
    requestParams: HotlineGetIncidentsRequest
  ): Promise<HotlineGetIncidentsResponse> {
    return this.axiosInstance.get("/action/19115v2_incidents", {
      params: {
        ...requestParams,
      },
    });
  }

  /**
   * EN: Get scheduled sport activities
   * PL: API umożliwia odczyt zaplanowanych zajęć sportowych w Warszawie
   *
   * https://api.um.warszawa.pl/files/258906a5-343d-4e32-8eac-713998967eec.pdf
   */
  public getSportActivities() {
    return this.axiosInstance.get<SportActivitiesResponse>(
      "/action/events_sport",
      {
        params: {
          id: OTHER_IDS.SPORT_ACTIVITIES,
        },
      }
    );
  }
  /**
   * EN: Get scheduled city events
   * PL: API umożliwia odczyt zaplanowanych wydarzeń w Warszawie
   *
   * https://api.um.warszawa.pl/files/7a02689b-b40f-4b15-96f1-a551534d6758.pdf
   */
  public getEvents() {
    return this.axiosInstance.get<EventsResponse>("/action/events_calendar", {
      params: {
        id: OTHER_IDS.EVENTS,
      },
    });
  }
  /**
   * EN: Get data of public consultations from https://konsultacje.um.warszawa.pl
   * PL: API umożliwia pobranie danych na temat aktualnych
   * konsultacji społecznych opublikowanych nastronie https://konsultacje.um.warszawa.pl
   *
   * https://api.um.warszawa.pl/files/bd9ba5a5-d1a5-4edc-9f21-ab18efaf4e96.pdf
   */
  public getPublicConsultations() {
    return this.axiosInstance.get<PublicConsultationsResponse>(
      "/action/public_consultation"
    );
  }
}

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
  params: {
    data: PostRequestBody;
  };
}

interface HotlineGetIncidentsRequest extends AxiosRequestConfig {
  params: {
    incidentId: string;
    history: boolean;
  };
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
  public getUrzads(request: WFSStoreBaseRequest) {
    return wfsstoreBaseHandler(this.axiosInstance, request, WFS_IDS.URZADS);
  }

  public get19115Categories(
    request?: AxiosRequestConfig
  ): Promise<HotlineCategoriesResponse> {
    return this.axiosInstance.get("/action/19115v2_categories", request);
  }

  public post19115Incidents(
    request?: HotlinePostIncidentsRequest
  ): Promise<HotlinePostIncidentsResponse> {
    return this.axiosInstance.post(
      "/action/19115v2_incidents",
      JSON.stringify(request?.params.data),
      request
    );
  }

  public get19115Incidents(
    request: HotlineGetIncidentsRequest
  ): Promise<HotlineGetIncidentsResponse> {
    return this.axiosInstance.get("/action/19115v2_incidents", request);
  }

  public getSportActivities(
    request?: AxiosRequestConfig
  ): Promise<SportActivitiesResponse> {
    return this.axiosInstance.get("/action/events_sport", {
      ...request,
      params: {
        id: OTHER_IDS.SPORT_ACTIVITIES,
      },
    });
  }

  public getEvents(request?: AxiosRequestConfig): Promise<EventsResponse> {
    return this.axiosInstance.get("/action/events_calendar", {
      ...request,
      params: {
        id: OTHER_IDS.EVENTS,
      },
    });
  }

  public getPublicConsultations(
    request?: AxiosRequestConfig
  ): Promise<PublicConsultationsResponse> {
    return this.axiosInstance.get("/action/public_consultation", request);
  }
}

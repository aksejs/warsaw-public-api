import { AxiosInstance, AxiosRequestConfig } from "axios";

type LatLngLiteral = {
  lat: number;
  lng: number;
};

type Property = {
  key: string;
  value: string | number;
};

export interface TheatresResponse {
  data: {
    geometry: {
      type: string;
      coordinates: LatLngLiteral;
      properties: Property[];
    };
  };
}

export interface TheatresRequest extends Partial<AxiosRequestConfig> {
  params: {
    id: string;
    limit?: number;
    circle?: string;
    bbox?: string;
    filter?: string;
  };
}

export class Culture {
  private apiKey: string;
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance, apiKey: string) {
    this.axiosInstance = axiosInstance;
    this.apiKey = apiKey;
  }

  public getTheatres(requestParams: TheatresRequest) {
    return this.axiosInstance.get<TheatresRequest, TheatresResponse>("/action/wfsstore_get/", {
      params: {
        apiKey: this.apiKey,
        ...requestParams,
      },
    });
  }
}

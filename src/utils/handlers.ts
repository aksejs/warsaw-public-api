import { AxiosInstance, AxiosRequestConfig } from "axios";
import { GeoParams, Geometry } from "./types";

export interface WFSStoreBaseRequest extends Partial<AxiosRequestConfig> {
  params: GeoParams;
}

export interface WFSStoreBaseResponse {
  data: {
    geometry: Geometry;
  };
}

export interface DBStoreBaseRequest extends Partial<AxiosRequestConfig> {
  params: {
    page?: number;
    size?: number;
  };
}

export interface DataStorageBaseRequest extends Partial<AxiosRequestConfig> {
  params: {
    limit?: number;
    q?: string;
    filters?: {
      [key: string]: string;
    };
  };
}

export interface DataStorageBaseResponse<T> {
  result: {
    include_total: boolean;
    resource_id: string;
    records_format?: string;
    records: T[];
    limit: number;
    total: number;
  };
}

export function wfsstoreBaseHandler(
  axiosInstance: AxiosInstance,
  request: WFSStoreBaseRequest,
  id: string
): Promise<WFSStoreBaseResponse> {
  return axiosInstance.get("/action/wfsstore_get/", {
    ...request,
    params: {
      ...request.params,
      id,
    },
  }) as Promise<WFSStoreBaseResponse>;
}

export function dbstoreBaseHandler(
  axiosInstance: AxiosInstance,
  request: DBStoreBaseRequest,
  id: string
) {
  return axiosInstance.get("/", {
    ...request,
    params: {
      ...request.params,
      id,
    },
  });
}

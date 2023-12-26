import { AxiosInstance, AxiosRequestConfig } from "axios";
import { GeoParams, Geometry } from "./types";

export type WFSStoreBaseRequest = GeoParams;

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
  params: WFSStoreBaseRequest,
  id: string
) {
  return axiosInstance.get<WFSStoreBaseResponse>("/action/wfsstore_get", {
    params: {
      ...params,
      id,
    },
  });
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

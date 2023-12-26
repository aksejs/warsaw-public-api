import { AxiosInstance, AxiosRequestConfig } from "axios";
import { GeoParams, Geometry, WFSStoreBaseResponse } from "./types";

export type WFSStoreBaseRequest = GeoParams;

export interface DBStoreBaseRequest extends Partial<AxiosRequestConfig> {
  page?: number;
  size?: number;
  limit?: number;
}

export interface DBStoreBaseResponse {
  result: Array<{
    values: Array<{ id: string; name: string }>;
  }>;
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

export function wfsstoreBaseHandler<T = WFSStoreBaseResponse>(
  axiosInstance: AxiosInstance,
  params: WFSStoreBaseRequest,
  id: string
) {
  return axiosInstance.get<T>("/action/wfsstore_get", {
    params: {
      ...params,
      id,
    },
  });
}

export function dbstoreBaseHandler(
  axiosInstance: AxiosInstance,
  id: string,
  request?: DBStoreBaseRequest
) {
  return axiosInstance.get<DBStoreBaseResponse>("/action/dbstore_get", {
    params: {
      ...request,
      id,
    },
  });
}

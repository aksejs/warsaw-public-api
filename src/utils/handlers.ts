import { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  DBStoreIDS,
  RESOURCE_IDS,
  Value,
  WFSStoreBaseRequest,
  WFSStoreBaseResponse,
  WFS_IDS,
  ZTMTimetableIDS,
} from "./types";

export interface ZTMTimetableRequest {
  name?: string;
  busstopId?: number;
  busstopNr?: string;
  line?: number;
}

export interface ZTMTimetableResponse {
  result: Array<{
    values: Value[];
  }>;
}

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

export interface DataStorageBaseRequest {
  limit?: number;
  q?: string;
  filters?: {
    [key: string]: string;
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
  id: WFS_IDS,
  requestParams: WFSStoreBaseRequest = {}
) {
  return axiosInstance.get<T>("/action/wfsstore_get", {
    params: {
      ...requestParams,
      id,
    },
  });
}

export function dbstoreBaseHandler(
  axiosInstance: AxiosInstance,
  id: DBStoreIDS,
  requestParams?: DBStoreBaseRequest
) {
  return axiosInstance.get<DBStoreBaseResponse>("/action/dbstore_get", {
    params: {
      ...requestParams,
      id,
    },
  });
}

export function dataStorageBaseHandler<T>(
  axiosInstance: AxiosInstance,
  resourceId: RESOURCE_IDS,
  requestParams?: DBStoreBaseRequest
) {
  return axiosInstance.get<DataStorageBaseResponse<T>>(
    "/action/datastore_search",
    {
      params: {
        ...requestParams,
        resource_id: resourceId,
        // Cause an error, if attaching the apikey, dunno why ><
        apikey: null,
      },
    }
  );
}

export function dbTimetableBaseHandler(
  axiosInstance: AxiosInstance,
  id: ZTMTimetableIDS,
  requestParams?: ZTMTimetableRequest
) {
  return axiosInstance.get<ZTMTimetableResponse>("/action/dbstore_get", {
    params: {
      ...requestParams,
      id,
    },
  });
}

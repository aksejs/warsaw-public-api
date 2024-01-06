import {
  DataStorageBaseRequest,
  dataStorageBaseHandler,
} from "../utils/handlers";
import { BaseService } from "../utils/helpers";
import { RESOURCE_IDS } from "../utils/types";

export interface Record {
  [key: string]: number | string;
}

export class EducationService extends BaseService {
  public getInternetAccess(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.INTERNET_ACCESS,
      requestParams
    );
  }

  public getComputersPurposes(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.COMPUTER_PUPROSES,
      requestParams
    );
  }

  public getSchoolStatistics(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.SCHOOL_STATISTICS,
      requestParams
    );
  }

  public getSchoolStatisticsByChilds(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.SCHOOL_STATISTICS_CHILDRENS,
      requestParams
    );
  }

  public getSchoolStatisticsByYouth(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.SCHOOL_STATISTICS_YOUTH,
      requestParams
    );
  }

  public getSchoolStatisticsByAdults(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.SCHOOL_STATISTICS_ADULTS,
      requestParams
    );
  }

  public getSchoolStatisticsNoCategory(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.SCHOOL_STATISTICS_NO_CATEGORY,
      requestParams
    );
  }

  public getEducationRooms(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.EDUCATION_ROOMS,
      requestParams
    );
  }

  public getFacilities(requestParams: DataStorageBaseRequest) {
    return dataStorageBaseHandler<Record>(
      this.axiosInstance,
      RESOURCE_IDS.EDUCATION_FACILITIES,
      requestParams
    );
  }
}

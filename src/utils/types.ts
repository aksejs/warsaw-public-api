type LatLngLiteral = {
  lat: number;
  lng: number;
};

export type Value = {
  key: string;
  value: string | number;
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export interface IGeometry {
  type: string;
  coordinates: LatLngLiteral;
  properties: Value[];
}

export type WFSStoreBaseRequest = {
  /** {required} Api key to access */
  limit?: number;
  circle?: string;
  bbox?: string;
  filter?: string;
};

export type Field = {
  type: string;
  id: string;
};

interface FeatureMemberProperties {
  TEL_FAX?: string;
  WWW: string;
  JEDN_ADM: string;
  AKTU_DAN: string;
  OBJECTID: string;
  NUMER: string;
  KOD: string;
  OPIS: string;
  DZIELNICA: string;
  MAIL?: string;
  ULICA: string;
}

export interface Geometry {
  type: string;
  coordinates: Array<{ latitude: string; longitude: string }>;
}

interface Property {
  value: string;
  key: string;
}

interface FeatureMemberList {
  geometry: Geometry;
  properties: Property[];
}

export interface WFSStoreBaseResponse {
  result: {
    featureMemberProperties: FeatureMemberProperties[];
    featureMemberList: FeatureMemberList[];
    featureMemberCoordinates: Array<{ latitude: string; longitude: string }>;
    featureMemberPropertyKey: string[];
  };
}

export enum RESOURCE_IDS {
  INTERNET_ACCESS = "0a131e16-ec7f-4502-9b62-8f8af58d8cfd",
  COMPUTER_PUPROSES = "e22be977-f15d-42e6-843a-55fd0a0d756e",
  SCHOOL_STATISTICS = "f9f7ffd8-d268-417e-991a-1553bae5936d",
  SCHOOL_STATISTICS_CHILDRENS = "aac73e9a-c6b3-4b7e-91dd-ebb00a8cdc33",
  SCHOOL_STATISTICS_YOUTH = "33d79302-9cd9-4aeb-8bbb-d4c8fc0cb8e7",
  SCHOOL_STATISTICS_ADULTS = "0e91481e-f690-4cdf-b292-07b52beceb80",
  SCHOOL_STATISTICS_NO_CATEGORY = "ad083912-b8c7-44a4-bf7a-cd12ef84cff4",
  EDUCATION_ROOMS = "ba9dd03c-72b9-488f-9fe5-3fa10052a07f",
  EDUCATION_FACILITIES = "1cae4865-bb17-4944-a222-0d0cdc377951",
  MUNICIPAL_WASTES = "64b9d66c-d134-4a87-9f24-258676e9e498",
  BUSHES = "0b1af81f-247d-4266-9823-693858ad5b5d",
  GROUP_OF_BUSHES = "4b792a76-5349-4aad-aa16-dadaf0a74be3",
  FORESTS = "75bedfd5-6c83-426b-9ae5-f03651857a48",
  TREES = "ed6217dd-c8d0-4f7b-8bed-3b7eb81a95ba",
  GROUP_OF_TREES = "913856f7-f71b-4638-abe2-12df14334e1a",
  BUSES_AND_TRAMS = "f2e5503e-927d-4ad3-9500-4ab9e55deb59",
}

export enum ZTMTimetableIDS {
  STOPS = "b27f4c17-5c50-4a5b-89dd236b282bc499",
  LINES = "88cd555f-6f31-43ca-9de4-66c479ad5942",
  SCHEDULES = "e923fa0e-d96c-43f9-ae6e60518c9f3238",
}

export enum TransportIDS {
  BIKE_STATIONS = "8a235d27-b96a-4876-9b92-9e164940c9b6",
  BIKE_ROUTES = "d2f0c41f-cda1-440a-8a27-f01f724529f8",
  PARKINGS = "157648fd-a603-4861-af96-884a8e35b155",
  METRO_ENTRANCES = "0ac7f6d1-a26b-430f-9e3d-a41c5356b9a3",
}

export enum StopsIDS {
  STOPS_COORDS = "1c08a38c-ae09-46d2-8926-4f9d25cb0630",
  STOP_COORDS_FOR_CURRENT_DAY = "ab75c33d-3a26-4342-b36a-6e5fef0a3ac3",
}

export enum WFS_IDS {
  THEATRES = "e26218cb-61ec-4ccb-81cc-fd19a6fee0f8",
  EURONET_ATMS = "672729a7-5ff9-45de-8ae2-ffc87213b9a8",
  ENOM_ADRESS_POINTS = "e30b724d-0bac-4a4e-8ea8-085c136fe345",
  ENOM_STREETS = "8c05e43a-504d-4680-bb75-e240858aad5c",
  ENOM_SQUARES = "51ed1c43-6c3b-4c7c-9b1f-b5bd1b1dac0e",
  PHARMACIES = "fd137190-3d65-4306-a85e-5e97e7f29a23",
  BIKE_LINES = "07f8275c-7ae5-4b74-a429-da94dbfa28bd",
  BIKE_STOPS = "a08136ec-1037-4029-9aa5-b0d0ee0b9d88",
  BIKE_STATIONS = "8a235d27-b96a-4876-9b92-9e164940c9b6",
  BIKE_ROUTES = "d2f0c41f-cda1-440a-8a27-f01f724529f8",
  SOCCER_FIELDS = "9317a2dc-d08a-41bc-874d-01cc2dc88006",
  SWIMMING_POOLS = "8c34025d-df36-4507-9eae-cf714f6fc414",
  DORMITORIES = "c789b05d-31b1-4b55-970a-4d3deb923f79",
  HOTELS = "f019448f-951c-439e-bf37-c3268682752e",
  POLICE_DEPARTMENTS = "85f567f1-bb56-4657-a30e-afd80544fc7f",
  URZADS = "4e9a942e-2bf8-4c9d-ac1f-1ccc30c4f62d",
  PARKINGS = "157648fd-a603-4861-af96-884a8e35b155",
  METRO_ENTRANCES = "0ac7f6d1-a26b-430f-9e3d-a41c5356b9a3",
}

export enum OTHER_IDS {
  SPORT_ACTIVITIES = "f458bd1b-d545-407c-bf08-7315429b6fda",
  EVENTS = "fbf95b7b-ff95-48bc-afda-a16e968cc9a6",
}

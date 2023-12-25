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

export interface Geometry {
  type: string;
  coordinates: LatLngLiteral;
  properties: Value[];
}

export type GeoParams = RequireAtLeastOne<
  {
    limit?: number;
    circle?: string;
    bbox?: string;
    filter?: string;
  },
  "bbox" | "circle" | "filter" | "limit"
>;

export type Field = {
  type: string;
  id: string;
};

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
}

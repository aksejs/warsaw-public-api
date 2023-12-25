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

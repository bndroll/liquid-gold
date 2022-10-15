export enum TransportCategory {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export type TTransportGeoPoint = {
  lat: number;
  lon: number;
};

export enum TTransportType {
  Platforms = 'Platforms',
  Cranes = 'Cranes',
  Loader = 'Loader',
}

export type TTransport = {
  _id: string;
  title: string;
  description: string;
  number: string;
  category: TransportCategory;
  coordinates: TTransportGeoPoint;
  type: TTransportType;
  isFree: boolean;
};

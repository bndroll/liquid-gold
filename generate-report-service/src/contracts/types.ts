export enum UserRole {
  Customer = 'Customer',
  Driver = 'Driver',
  Dispatcher = 'Dispatcher'
}

export enum RatingLevel {
  Journeyman,
  ExperiencedMiner,
  GoldenArrow,
  Nugget,
  SandpitGeneral
}

export enum TransportCategory {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum TransportType {
  Platforms = 'Platforms',
  Cranes = 'Cranes',
  Loader = 'Loader'
}

export interface TransportGeoPoint {
  lat: number;
  lon: number;
}

export interface Transport {
  title: string;
  description: string;
  number: string;
  category: TransportCategory;
  coordinates: TransportGeoPoint;
  type: TransportType;
}

export interface User {
  username: string;
  passwordHash: string;
  fio: string;
  role: UserRole;
  rating: RatingLevel;
  categories: TransportCategory[];
  photo: string;
}

export enum TicketState {
  Open = 'Open',
  Working = 'Working',
  Close = 'Close'
}

export interface TicketGeoPoint {
  lat: number;
  lon: number;
}

export class Ticket {
  title: string;
  description: string;
  priority: number;
  destination: TicketGeoPoint;
  transport: Transport;
  driver: User;
  customer: User;
  state: TicketState;
}
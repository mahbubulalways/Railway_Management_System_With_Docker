export interface IPlatform {
  stationId: string;
  name: string;
  type: string;
  status: string;
  length: number;
  capacity: number;
  hasRoof: boolean;
}

export interface IStation {
  stationId: string;
  phone: string;
  email: string;

  type: string;
  division: string;
  district: string;
  name: string;

  status: string;
  establishedYear: number;
  notes: string;

  ticketCounter: boolean;
  onlineTicketSupport: boolean;
  foodCourt: boolean;
  parking: boolean;
  hasDisplayBoard: boolean;
  hasAnnouncementSystem: boolean;
  wheelchairAccess: boolean;
  wifi: boolean;
  washroom: boolean;
  atm: boolean;
  securityService: boolean;
  cctv: boolean;
  prayerRoom: boolean;
  escalator: boolean;
  lift: boolean;
}

export interface IStationWithPlatforms {
  station: IStation;
  platforms: IPlatform[];
}

// QUERY TYPES

export interface IQuery {
  search?: string;
  page?: string;
  limit?: string;
}

export interface IRouteStation {
  stationId: string;
  distanceFromPrevious: string;
  travelTimeFromPrevious: string;
  platform: string;
  stopTime: number;
}
export interface ICreateRoute {
  name: string;
  sourceStationId: string;
  destinationStationId: string;
  distance: number;
  routeStations: IRouteStation[];
}

import {
  IPlatform,
  IStation,
  IStationWithPlatforms,
} from "./station.interface";

export const separateStationInfo = (
  data: IStationWithPlatforms[],
): {
  stations: IStation[];
  platforms: IPlatform[];
} => {
  const stations: IStation[] = [];
  const platforms: IPlatform[] = [];

  data.forEach((item) => {
    stations.push(item.station);
    platforms.push(...item.platforms);
  });

  return {
    stations,
    platforms,
  };
};

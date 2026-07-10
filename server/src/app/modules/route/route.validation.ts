import { z } from "zod";

export const routeStationSchema = z.object({
  stationId: z.string().min(1, "Station is required"),

  distanceFromPrevious: z.string().min(1, "Distance from previous is required"),

  travelTimeFromPrevious: z
    .string()
    .min(1, "Travel time from previous is required"),

  platform: z.string().min(1, "Platform is required"),

  stopTime: z
    .number({
      error: "Stop time is required",
    })
    .min(0, "Stop time cannot be negative"),
});

export const CREATE_ROUTE_SCHEMA = z.object({
  name: z.string().min(1, "Route name is required"),

  sourceStationId: z.string().min(1, "Source station is required"),

  destinationStationId: z.string().min(1, "Destination station is required"),

  distance: z
    .number({
      error: "Distance is required",
    })
    .positive("Distance must be greater than 0"),

  routeStations: z
    .array(routeStationSchema)
    .min(2, "At least two stations are required"),
});

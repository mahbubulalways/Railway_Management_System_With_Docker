import { z } from "zod";

export const PlatformSchema = z.object({
  name: z.string({
    error: "Platform name is required",
  }),
  type: z.string({
    error: "Platform type is required",
  }),
  status: z.string({
    error: "Platform status is required",
  }),
  length: z.number({
    error: "Platform length is required",
  }),
  capacity: z.number({
    error: "Platform capacity is required",
  }),
  hasRoof: z.boolean({
    error: "Roof availability is required",
  }),
});

export const StationSchema = z.object({
  phone: z.string({
    error: "Phone number is required",
  }),
  email: z
    .string({
      error: "Email is required",
    })
    .email("Please enter a valid email address"),

  type: z.string({
    error: "Station type is required",
  }),
  division: z.string({
    error: "Division is required",
  }),
  district: z.string({
    error: "District is required",
  }),
  name: z.string({
    error: "Station name is required",
  }),

  status: z.string({
    error: "Status is required",
  }),
  established: z.string({
    error: "Established year is required",
  }),
  notes: z.string({
    error: "Notes are required",
  }),

  ticketCounter: z.boolean({
    error: "Ticket counter information is required",
  }),
  onlineTicketSupport: z.boolean({
    error: "Online ticket support information is required",
  }),
  foodCourt: z.boolean({
    error: "Food court information is required",
  }),
  parking: z.boolean({
    error: "Parking information is required",
  }),
  hasDisplayBoard: z.boolean({
    error: "Display board information is required",
  }),
  hasAnnouncementSystem: z.boolean({
    error: "Announcement system information is required",
  }),
  wheelchairAccess: z.boolean({
    error: "Wheelchair access information is required",
  }),
  wifi: z.boolean({
    error: "WiFi information is required",
  }),
  washroom: z.boolean({
    error: "Washroom information is required",
  }),
  atm: z.boolean({
    error: "ATM information is required",
  }),
  securityService: z.boolean({
    error: "Security service information is required",
  }),
  cctv: z.boolean({
    error: "CCTV information is required",
  }),
  prayerRoom: z.boolean({
    error: "Prayer room information is required",
  }),
  escalator: z.boolean({
    error: "Escalator information is required",
  }),
  lift: z.boolean({
    error: "Lift information is required",
  }),
});

export const CREATE_STATION_VALIDATION = z.object({
  data: z.object({
    station: StationSchema,
    platforms: z.array(PlatformSchema, {
      error: "Platforms are required",
    }),
  }),
});

export const STATION_VALIDATION_SCHEMA = {
  CREATE_STATION_VALIDATION,
};

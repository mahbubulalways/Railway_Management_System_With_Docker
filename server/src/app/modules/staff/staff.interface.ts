export interface ICreateStaff {
  password: string;
  data: {
    email: string;
    phone: string;
    name: string;
    avatar?: string;
    staffType: StaffType;
    shift: ShiftType;
    dutyStartTime: string;
    dutyEndTime: string;
    address: string;
    joiningDate: string;
    stationId: string;
    staffPermissions: string[];
  };
}

export enum StaffType {
  STATION_MASTER = "STATION_MASTER",
  ASSISTANT_STATION_MASTER = "ASSISTANT_STATION_MASTER",
  TICKET_CLERK = "TICKET_CLERK",
  BOOKING_ASSISTANT = "BOOKING_ASSISTANT",
  TRAIN_GUARD = "TRAIN_GUARD",
  TRAIN_DRIVER = "TRAIN_DRIVER",
  SIGNAL_OPERATOR = "SIGNAL_OPERATOR",
  POINTSMAN = "POINTSMAN",
  PLATFORM_SUPERVISOR = "PLATFORM_SUPERVISOR",
  STATION_CONTROLLER = "STATION_CONTROLLER",
  SECURITY_GUARD = "SECURITY_GUARD",
  MAINTENANCE_ENGINEER = "MAINTENANCE_ENGINEER",
  ELECTRICIAN = "ELECTRICIAN",
  TRACK_MAINTAINER = "TRACK_MAINTAINER",
  CLEANER = "CLEANER",
  OFFICE_ASSISTANT = "OFFICE_ASSISTANT",
  ACCOUNT_OFFICER = "ACCOUNT_OFFICER",
  HR_OFFICER = "HR_OFFICER",
  IT_SUPPORT = "IT_SUPPORT",
  CUSTOMER_SERVICE_OFFICER = "CUSTOMER_SERVICE_OFFICER",
}

export enum ShiftType {
  MORNING = "MORNING",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
}

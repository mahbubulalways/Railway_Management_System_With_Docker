import { CoachType } from "../../../generated/prisma/enums";

const coachTypePrefix: Record<CoachType, string> = {
  AC_CHAIR: "AC",
  SHOVON_CHAIR: "SH",
  AC_CABIN: "ACB",
  CABIN: "CB",
  SLEEPER: "SL",
};

export const generateCoachCode = (
  type: CoachType,
  lastSerial: number,
): string => {
  const prefix = coachTypePrefix[type];
  const serial = String(lastSerial + 1).padStart(6, "0");

  return `BR-${prefix}-${serial}`;
};

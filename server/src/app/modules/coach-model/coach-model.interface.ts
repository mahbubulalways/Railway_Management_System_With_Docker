import { CoachType } from "../../../generated/prisma/enums";

type ICoachLayout = {
  leftSeats: number;
  rightSeats: number;
};

export type ICreateCoachModel = {
  name: string;
  type: CoachType;
  description?: string;
  totalSeats: number;
  layout: ICoachLayout[];
};

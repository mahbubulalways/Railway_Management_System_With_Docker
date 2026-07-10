import { TrainType } from "../../../generated/prisma/enums";

export interface ITrain {
  name: string;
  type: TrainType;
  status: string;
  maxSpeed?: number | null;
  manufactureYear?: number | null;
  notes?: string | null;

  // NOT FOME FROM CLIENT
  trainId: string;
}

export interface ITrainCoach {
  trainId: string;
  coachId: string[];
}

import { Prisma } from "../../../generated/prisma/client";
import { SeatSide, SeatType } from "../../../generated/prisma/enums";

type ILayout = {
  leftSeats: number;
  rightSeats: number;
};

const getSeatType = (
  side: SeatSide,
  position: number,
  totalSeats: number,
): SeatType => {
  // Window
  if (side === SeatSide.LEFT && position === 1) {
    return SeatType.WINDOW;
  }

  if (side === SeatSide.RIGHT && position === totalSeats) {
    return SeatType.WINDOW;
  }

  // Aisle
  if (side === SeatSide.LEFT && position === totalSeats) {
    return SeatType.AISLE;
  }

  if (side === SeatSide.RIGHT && position === 1) {
    return SeatType.AISLE;
  }

  return SeatType.MIDDLE;
};

export const generateCoachModelSeats = (
  coachModelId: string,
  layout: ILayout[],
): Prisma.CoachModelSeatCreateManyInput[] => {
  const seats: Prisma.CoachModelSeatCreateManyInput[] = [];

  let label = 1;

  layout.forEach((item, rowIndex) => {
    const row = rowIndex + 1;

    // LEFT SIDE
    for (let position = 1; position <= item.leftSeats; position++) {
      seats.push({
        coachModelId,
        label: label,
        row,
        side: SeatSide.LEFT,
        position,
        seatType: getSeatType(SeatSide.LEFT, position, item.leftSeats),
      });

      label++;
    }

    // RIGHT SIDE
    for (let position = 1; position <= item.rightSeats; position++) {
      seats.push({
        coachModelId,
        label: label,
        row,
        side: SeatSide.RIGHT,
        position,
        seatType: getSeatType(SeatSide.RIGHT, position, item.rightSeats),
      });

      label++;
    }
  });

  return seats;
};

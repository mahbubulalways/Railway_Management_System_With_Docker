export const generateStaffId = (staffType: string, last: number) => {
  const prefix = staffType
    .split("_")
    .map((word) => word[0])
    .join("");

  return `STA-${prefix}-${String(last + 1).padStart(10, "0")}`;
};

export const generateTrainId = (name: string, serial: number) => {
  const prefix = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase())
    .join("");

  return `${prefix}-${serial.toString().padStart(6, "0")}`;
};

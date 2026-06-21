export const generateOtp = (minutes: number, digits: number) => {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  const code = Math.floor(min + Math.random() * (max - min + 1)).toString();

  const expiryInSeconds = minutes * 60;

  return {
    code,
    expiryInSeconds,
    expiryMinutes: minutes,
  };
};

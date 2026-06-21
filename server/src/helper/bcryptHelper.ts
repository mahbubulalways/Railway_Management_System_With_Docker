import bcrypt from "bcrypt";

const hashPassword = async (pass: string) => {
  const saltRounds = 12;
  return await bcrypt.hash(pass, saltRounds);
};

const comparePassword = async (pass: string, hashedPassword: string) => {
  return await bcrypt.compare(pass, hashedPassword);
};

export const bcryptHelper = {
  hashPassword,
  comparePassword,
};

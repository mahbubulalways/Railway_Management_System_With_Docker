import { StatusCodes } from "http-status-codes";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { ICreateAdmin } from "./user.interface";
import { bcryptHelper } from "../../../helper/bcryptHelper";
import { Prisma, USER_ROLE } from "../../../generated/prisma/client";
import { emailVerificationTemplate } from "../../../templete/emailVerificationTemplate";
import { generateOtp } from "../../../utils/generateOtp";
import redisClient from "../../../redis";
import { sendMail } from "../../../utils/sendMail";
import { ICreateStaff } from "../staff/staff.interface";
import { generateStaffId } from "../../../utils/generateStaffId";

const CreateAdminService = async (payload: ICreateAdmin) => {
  const isExists = await prisma.user.findFirst({
    where: { email: payload.data.email, phone: payload.data.phone },
  });

  if (isExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Opps! User with this email or phone is exist in database.",
    );
  }

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const hashPassword = await bcryptHelper.hashPassword(payload.password);

      // USER CREATION
      const userInfo = {
        password: hashPassword,
        role: USER_ROLE.ADMIN,
        email: payload.data.email,
        phone: payload.data.phone,
      };
      const user = await tx.user.create({ data: userInfo });

      // ADMIN CREATION
      const adminInfo = {
        name: payload.data.name,
        joiningDate: payload.data.joiningDate,
        userId: user.id,
      };
      await tx.admin.create({ data: adminInfo });

      const { password, ...rest } = user;
      return rest;
    },
  );

  // CASH EMAIL CODE AND EXPIRITY IN REDIS
  // FIRST TIME/DIGIT
  const otp = generateOtp(5, 6);
  const emailTemplete = emailVerificationTemplate({
    code: otp.code,
    expiry: otp.expiryMinutes,
  });
  // SEND MAIL TO USER
  await sendMail({
    html: emailTemplete,
    receiver: result.email,
    subject: "Email verification from Bangladesh railway",
  });
  // CASH IN REDIS
  const key = `verification:${result.email}`;
  await redisClient.setEx(key, otp.expiryInSeconds, otp.code);

  return result;
};

// CREATE STAFF
const CreateStaffService = async (payload: ICreateStaff) => {
  console.log(payload);
  const isExists = await prisma.user.findFirst({
    where: { email: payload.data.email, phone: payload.data.phone },
  });

  if (isExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Opps! User with this email or phone is exist in database.",
    );
  }

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const hashPassword = await bcryptHelper.hashPassword(payload.password);

      // USER CREATION
      const userInfo = {
        password: hashPassword,
        role: USER_ROLE.STAFF,
        email: payload.data.email,
        phone: payload.data.phone,
      };
      const user = await tx.user.create({ data: userInfo });

      // STAFF COUNT
      const count = await tx.staff.count();
      // ADMIN CREATION
      const staff = {
        name: payload.data.name,
        joiningDate: payload.data.joiningDate,
        userId: user.id,
        staffType: payload.data.staffType,
        dutyStartTime: payload.data.dutyStartTime,
        dutyEndTime: payload.data.dutyEndTime,
        shift: payload.data.shift,
        address: payload.data.address,
        stationId: payload.data.stationId,
        staffId: generateStaffId(payload.data.staffType, count),
      };
      const newStaff = await tx.staff.create({ data: staff });

      const staffPermissions = payload.data.staffPermissions.map((pr) => {
        return {
          staffId: newStaff.id,
          permissionId: pr,
        };
      });

      await tx.staffPermission.createMany({ data: staffPermissions });

      const { password, ...rest } = user;
      return rest;
    },
  );

  // CASH EMAIL CODE AND EXPIRITY IN REDIS
  // FIRST TIME/DIGIT
  const otp = generateOtp(5, 6);
  const emailTemplete = emailVerificationTemplate({
    code: otp.code,
    expiry: otp.expiryMinutes,
  });

  // SEND MAIL TO USER
  await sendMail({
    html: emailTemplete,
    receiver: result.email,
    subject: "Email verification from Bangladesh railway",
  });

  // CASH IN REDIS
  const key = `verification:${result.email}`;
  await redisClient.setEx(key, otp.expiryInSeconds, otp.code);

  return result;
};

// VERIFY USER
const VerifyUserService = async (email: string, code: string) => {
  const key = `verification:${email}`;
  const redisInfo = await redisClient.get(key);
  if (!redisInfo) {
    throw new AppError(StatusCodes.NOT_FOUND, "Verification code expired.");
  }
  if (redisInfo !== code) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid verification code.");
  }

  const updateUserStatus = await prisma.user.update({
    data: { isVerified: true, status: "ACTIVE" },
    where: { email },
  });
  await redisClient.del(key);

  return updateUserStatus;
};

//  RESEND VERIFICATION CODE
// VERIFY USER
const ResendVerificationCodeService = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email, status: "INACTIVE", isVerified: false },
    select: { email: true },
  });
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid email address.");
  }

  // CASH EMAIL CODE AND EXPIRITY IN REDIS
  // FIRST TIME/DIGIT
  const otp = generateOtp(5, 6);
  const emailTemplete = emailVerificationTemplate({
    code: otp.code,
    expiry: otp.expiryMinutes,
  });
  // SEND MAIL TO USER
  await sendMail({
    html: emailTemplete,
    receiver: user.email,
    subject: "Email verification from Bangladesh railway",
  });
  // CASH IN REDIS
  const key = `verification:${user.email}`;
  await redisClient.setEx(key, otp.expiryInSeconds, otp.code);
  return user;
};

export const UserService = {
  CreateAdminService,
  VerifyUserService,
  ResendVerificationCodeService,
  CreateStaffService,
};

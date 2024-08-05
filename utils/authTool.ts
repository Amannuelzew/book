import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "@/utils/db";
import { ROLES } from "./constants";

const createToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.SECRET!);
};
export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  const payload = jwt.verify(token.value, process.env.SECRET!) as {
    id: string;
  };

  const user = await db.user.findUnique({
    where: {
      id: payload.id,
    },
  });
  return user;
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await db.user.findFirst({
    where: { email },
  });
  if (!match) throw new Error("invalid user");
  const correctpwd = comparePassword(password, match.password);
  if (!correctpwd) throw new Error("invalid user");
  const token = createToken(match.id);
  const { password: pw, ...user } = match;
  return { user, token };
};
export const signup = async ({
  email,
  password,
  location,
  phoneNumber,
  role,
}: {
  email: string;
  password: string;
  location: string;
  phoneNumber: string;
  role: string | null;
}) => {
  const hashpwd = await hashPassword(password);

  const user = await db.user.create({
    data: {
      email: email,
      password: hashpwd,
      location: location,
      phoneNumber: phoneNumber,
      role: role ? role : undefined,
    },
  });
  //if user type is owner then create a record for this user in owners table
  if (role == ROLES.owner)
    await db.owner.create({
      data: {
        userId: user.id,
        name: email.split("@")[0],
        location: location,
      },
    });

  const token = createToken(user.id);
  return { user, token };
};

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(password, salt);
};
const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

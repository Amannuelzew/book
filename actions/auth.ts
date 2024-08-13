"use server";
import { routedefineAbilityFor } from "@/utils/ability";
import {
  comparePassword,
  hashPassword,
  signin,
  signup,
} from "@/utils/authTool";
import { COOKIE_NAME, ROLES } from "@/utils/constants";
import { User } from "@prisma/client";
import db from "@/utils/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { getCurrentUser } from "@/utils/user";

type SignupFormState = {
  error?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    confirmPassword?: string[] | undefined;
    location?: string[] | undefined;
    phoneNumber?: string[] | undefined;
    terms?: string[] | undefined;
    role?: string[] | undefined;
  } | null;
  message?: string | null;
};
type SigninFormState = {
  error?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    remember?: string[] | undefined;
  } | null;
  message?: string | null;
};
type EditFormState = {
  error?: {
    email?: string[] | undefined;
    location?: string[] | undefined;
    phoneNumber?: string[] | undefined;
    password?: string[] | undefined;
    newpassword?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  } | null;
  message?: string | null;
};

const sigupSchema = z
  .object({
    email: z.string().email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    location: z.string().min(1, { message: "This field has to be filled." }),
    phoneNumber: z.string().min(1, { message: "This field has to be filled." }),
    terms: z.string({ message: "You must agree to Terms and Conditions." }),
    role: z.string().nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passowrd don't match",
    path: ["confirmPassword"],
  });

const siginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(1, { message: "This field has to be filled." }),
  remember: z.string().nullable(),
});

const editUserSchema = z
  .object({
    email: z.string(),
    location: z.string(),
    phoneNumber: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    newpassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
  })
  .refine((data) => data.newpassword === data.confirmPassword, {
    message: "Password don't match.",
    path: ["confirmPassword"],
  });

export const registerUser = async (
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> => {
  const data = sigupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    location: formData.get("location"),
    phoneNumber: formData.get("phoneNumber"),
    terms: formData.get("terms"),
    role: formData.get("role"),
  });
  let ability = null;
  if (!data.success) return { error: data.error.flatten().fieldErrors };
  data.data.role ? (data.data.role = ROLES.owner) : null;

  try {
    const { token, user } = await signup(data.data);
    ability = routedefineAbilityFor(user! as User);
    cookies().set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    return { message: "Failed to Sign you up." };
  }

  return ability.can("read", "/dashboard")
    ? redirect("/dashboard")
    : redirect("/books");
};
export const signinUser = async (
  prevState: SigninFormState,
  formData: FormData
): Promise<SigninFormState> => {
  let ability = null;
  const data = siginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    remember: formData.get("remember"),
  });

  if (!data.success) return { error: data.error.flatten().fieldErrors };
  try {
    const { token, user } = await signin(data.data);
    ability = routedefineAbilityFor(user! as User);
    //remember me with longer cookie storage time
    cookies().set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    return { message: "Failed to Sign you in." };
  }

  return ability.can("read", "/dashboard")
    ? redirect("/dashboard")
    : redirect("/books");
};

export const editUser = async (
  prevState: EditFormState,
  formData: FormData
): Promise<EditFormState> => {
  const user = await getCurrentUser();
  const data = editUserSchema.safeParse({
    email: formData.get("email"),
    location: formData.get("location"),
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
    newpassword: formData.get("newpassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  const ability = routedefineAbilityFor(user! as User);
  if (!data.success) return { error: data.error.flatten().fieldErrors };
  try {
    if (
      data.data.password == "" &&
      data.data.confirmPassword == "" &&
      data.data.newpassword == ""
    ) {
      await db.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email: data.data.email,
          location: data.data.location,
          phoneNumber: data.data.phoneNumber,
        },
      });
    } else {
      const match = await comparePassword(data.data.password, user!.password);

      if (!match) return { message: "your old passowrd is not correct" };
      const hashedpwd = await hashPassword(data.data.newpassword);
      await db.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email: data.data.email,
          location: data.data.location,
          phoneNumber: data.data.phoneNumber,
          password: hashedpwd,
        },
      });
    }
  } catch (e) {
    console.error(e);
    return { message: "Failed to update your account." };
  }

  return ability.can("read", "/dashboard")
    ? redirect("/dashboard")
    : redirect("/books");
};

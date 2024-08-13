"use server";
import { routedefineAbilityFor } from "@/utils/ability";
import { signin, signup } from "@/utils/authTool";
import { COOKIE_NAME, ROLES } from "@/utils/constants";
import { User } from "@prisma/client";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

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

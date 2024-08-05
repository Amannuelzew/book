"use server";
import { signin, signup } from "@/utils/authTool";
import { COOKIE_NAME } from "@/utils/constants";

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
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(1, { message: "This field has to be filled." }),
    confirmPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
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

  if (!data.success) return { error: data.error.flatten().fieldErrors };
  data.data.role ? (data.data.role = "OWNER") : null;

  try {
    const { token } = await signup(data.data);
    cookies().set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    return { message: "Database Error:Failed to Sign you up." };
  }
  //since this component is a server side component cant access abilityfor
  return data.data.role ? redirect("/dashboard") : redirect("/user/books");
};
export const signinUser = async (
  prevState: SigninFormState,
  formData: FormData
): Promise<SigninFormState> => {
  let currentUser = null;
  const data = siginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    remember: formData.get("remember"),
  });

  if (!data.success) return { error: data.error.flatten().fieldErrors };
  try {
    const { token, user } = await signin(data.data);
    currentUser = user;
    //remember me with longer cookie storage time
    cookies().set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    return { message: "Database Error:Failed to Sign you in." };
  }
  //since this component is a server side component cant access abilityfor
  return currentUser.role === "USER"
    ? redirect("/user/books")
    : redirect("/dashboard");
};

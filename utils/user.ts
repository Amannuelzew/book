import { COOKIE_NAME } from "@/utils/constants";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/utils/authTool";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const token = cookies().get(COOKIE_NAME);
  if (!token) redirect("/signin");
  const user = getUserFromToken(token);
  if (!token) redirect("/signin");

  return user;
});

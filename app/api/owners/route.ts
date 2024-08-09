import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { COOKIE_NAME } from "@/utils/constants";
import { getUserFromToken } from "@/utils/authTool";
import { defineAbilityFor } from "@/utils/ability";
import { accessibleBy } from "@casl/prisma";

export const GET = async (request: NextRequest) => {
  const hascookie = request.cookies.has(COOKIE_NAME);
  if (!hascookie) return NextResponse.json({ error: "no" }, { status: 401 });
  const token = request.cookies.get(COOKIE_NAME);
  const user = await getUserFromToken(token!);
  if (!user) return NextResponse.json({ error: "no" }, { status: 401 });
  const ability = defineAbilityFor(user);

  const isallowd = ability.can("read", "Book", "");
  if (!isallowd)
    return NextResponse.json({ error: "you are not allowed" }, { status: 403 });
  const books = await db.book.findMany({
    where: accessibleBy(ability).Book,
  });

  return NextResponse.json({ data: books });
};
export const POST = async (request: NextRequest) => {
  const data = await request.json();

  //const todo = await db.owner.findMany({});
  return NextResponse.json({ message: data });
};

//can do cors too

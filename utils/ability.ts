"use client";
/* roles.js */

import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { User, Book } from "@prisma/client";
import { PureAbility, subject } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Book: Book;
    }>
  ],
  PrismaQuery
>;
export function routedefineAbilityFor(user: User) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === "ADMIN") {
    can("read", "/books");
    can("read", "/owners");
    can("read", "/dashboard");
  }

  if (user.role === "OWNER") {
    can("read", "/book");
    can("read", "/dashboard");
  }
  if (user.role === "USER") {
    can("read", "/user/books");
  }

  return build();
}
export function defineAbilityFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  can("read", "Book", { owner: { every: { id: "1" } } });

  const ability = build();
  ability.can("read", "Book");

  if (user.role === "USER") {
    can("read", "/user/books");
  }

  return build();
}

"use client";
/* roles.js */

import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { User, Book } from "@prisma/client";

export function sidebardefineAbilityFor(user: User) {
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
/* const admin = defineAbilityFor({ isAuthorised: true, role: "admin" });
admin.can("read", "article"); // true
admin.can("update", "profile"); // true
admin.can("delete", "article"); // true
admin.can("delete", "profile"); // true
admin.can("create", "profile"); // false

const manager = defineAbilityFor({ isAuthorised: true, role: "manager" });
manager.can("read", "article"); // true

const author = defineAbilityFor({ isAuthorised: true, role: "author" });
author.can("read", "article"); // true

const reader = defineAbilityFor({ isAuthorised: false });
reader.can("read", "article"); // true
 */

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
const { can, cannot, build } = new AbilityBuilder<AppAbility>(
  createPrismaAbility
);

can("read", "Book", { owner: { every: { id: "1" } } });

const ability = build();
ability.can("read", "Book");

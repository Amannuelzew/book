import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { User, Book, Owner } from "@prisma/client";
import { PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { ROLES } from "./constants";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Book: Book;
      Owner: Owner;
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

  if (user.role === ROLES.admin) {
    can("manage", "Book");
    can("manage", "Owner");
    can("manage", "User");
  } else if (user.role === ROLES.owner) {
    can("read", "Book", { owner: { userId: { equals: user.id } } });
  } else {
    can("read", "Book", { approved: true });
    can("update", "Book");
  }

  return build();
}

import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { User, Book, Owner, Category, Rental } from "@prisma/client";
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
      Category: Category;
      Rental: Rental;
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
    can("read", "/books");
    can("read", "/upload");
    can("read", "/dashboard");
    can("read", "/upload");
  }
  if (user.role === "USER") {
    can("read", "/books");
    can("read", "/user/rented");
  }

  return build();
}
//{books: {  some: {  ownerId: { equals: ""}}}}
export function defineAbilityFor(user: User, id?: string) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  if (user.role === ROLES.admin) {
    can("manage", "Book");
    can("manage", "Owner");
    can("manage", "User");
    can("manage", "Category");
  } else if (user.role === ROLES.owner) {
    can("manage", "Book", { owner: { userId: { equals: user.id } } });
    can("manage", "Owner", { userId: { equals: user.id } });
    can("read", "Category", { books: { some: { ownerId: id } } });
  } else {
    can("read", "Book", {
      AND: {
        approved: true,
        available: true,
        quantity: { gt: 0 },
        rent: { none: { userId: { equals: user.id } } },
        owner: { AND: { approved: true, disabled: false } },
      },
    });
    can("update", "Book");
    can("manage", "Rental", { userId: { equals: user.id } });
  }

  return build();
}

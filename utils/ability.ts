"use client";
/* roles.js */
import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { User } from "@prisma/client";
export function defineAbility() {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  can("read", "all");
  can("update", "article");

  return build();
}
export function defineAbilityFor(user: User) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === "ADMIN") {
    can("manage", "books");
    can("manage", "owners");
  }
  if (user.role === "OWNER") {
    //only book that are owned by his user
    can("manage", "book");
  }
  if (user.role === "USER") {
    can("read", "books");
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

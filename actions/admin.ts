"use server";
import db from "@/utils/db";
export const approveOwner = async (id) => {
  //remove owner
  //casl
  //const owner=db.owner.fin
  db.owner.update({
    where: { id },
    data: {},
  });
};

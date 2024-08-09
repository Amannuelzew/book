"use server";
import db from "@/utils/db";
import { promises as fs } from "fs";
import { getCurrentUser } from "@/utils/user";
import { redirect } from "next/navigation";
import z from "zod";
import { revalidatePath } from "next/cache";

const getOwnerId = async () => {
  const user = await getCurrentUser();
  const userOwner = await db.user.findUnique({
    where: { id: user!.id },
    include: { owners: true },
  });
  const id = userOwner?.owners[0].id;
  return id;
};
type bookFormState = {
  error?: {
    title?: string[] | undefined;
    author?: string[] | undefined;
    quantity?: string[] | undefined;
    price?: string[] | undefined;
    category?: string[] | undefined;
    file?: string[] | undefined;
  } | null;
  message?: string | null;
};
type editbookFormState = {
  error?: {
    title?: string[] | undefined;
    author?: string[] | undefined;
    quantity?: string[] | undefined;
    price?: string[] | undefined;
    category?: string[] | undefined;
    file?: string[] | undefined;
  } | null;
  message?: string | null;
};
type deletebookFormState = {
  error?: {
    currentPath?: string[] | undefined;
  } | null;
  message?: string | null;
};
const createBookSchema = z.object({
  title: z.string().min(1, { message: "This field has to be filled." }),
  author: z.string().min(1, { message: "This field has to be filled." }),
  quantity: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: "This field has to be filled." }),
  price: z.coerce
    .number()
    .positive()
    .min(1, { message: "This field has to be filled." }),
  category: z.string().min(1, {
    message: "This field has to be filled.",
  }),
  file: z
    .any()
    .refine((file) => file?.size <= 5000000, "Max file size is 5MB.")
    .refine(
      (file) => ["application/pdf"].includes(file?.type),
      "make sure you upload a file and only pdf format is supported."
    ),
});
const editBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  quantity: z.coerce.number().int().positive(),

  price: z.coerce.number().positive(),
  category: z.string().min(1, {
    message: "This field has to be filled.",
  }),
  currentPath: z.string(),
});
const deleteBookSchema = z.object({
  currentPath: z.string(),
});

export const uploadBook = async (
  prevState: bookFormState,
  formData: FormData
): Promise<bookFormState> => {
  const data = createBookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    quantity: formData.get("quantity"),
    price: formData.get("price"),
    category: formData.get("category"),
    file: formData.get("file"),
  });

  if (!data.success) return { error: data.error.flatten().fieldErrors };

  try {
    const file = await data.data.file.arrayBuffer();
    //upload file to storage server
    /* console.log(data.data.file.name);
    await fs.writeFile(
      `${process.cwd()}/temp/${data.data.file.name}`,
      Buffer.from(file)
    ); */
    const id = await getOwnerId();
    await db.book.create({
      data: {
        title: data.data.title,
        author: data.data.author,
        quantity: data.data.quantity,
        price: data.data.price,
        url: data.data.file.name,
        ownerId: id!,
        categoryId: data.data.category,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: "Database Error:Failed to create a book." };
  }

  redirect("/dashboard");
};
export const editBook = async (
  id: string,
  prevState: editbookFormState,
  formData: FormData
): Promise<editbookFormState> => {
  const data = editBookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    quantity: formData.get("quantity"),
    price: formData.get("price"),
    category: formData.get("category"),
    currentPath: formData.get("currentPath"),
  });

  if (!data.success) return { error: data.error.flatten().fieldErrors };

  try {
    await db.book.update({
      where: { id },
      data: {
        title: data.data.title,
        author: data.data.author,
        quantity: data.data.quantity,
        price: data.data.price,
        categoryId: data.data.category,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: "Database Error:Failed to edit a book." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/books");
  redirect(data.data.currentPath);
};

export const deleteBook = async (id: string) => {
  try {
    await db.book.delete({
      where: { id },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/dashboard");
  revalidatePath("/books");
};

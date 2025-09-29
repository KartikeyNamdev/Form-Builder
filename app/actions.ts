// app/actions.ts
"use server";

import { Prisma, PrismaClient } from "@prisma/client"; // Import Prisma
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { BuilderState } from "@/types";
import { getCurrentUser } from "@/lib/Session";

const prisma = new PrismaClient();

export async function saveForm(
  formId: string,
  formData: Pick<BuilderState, "title" | "fields" | "theme">
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }

  await prisma.form.update({
    where: { id: formId, userId: user.id },
    data: {
      title: formData.title,
      // This is the correct, type-safe way to handle JSON
      fields: formData.fields as unknown as Prisma.InputJsonValue,
      theme: formData.theme as unknown as Prisma.InputJsonValue,
    },
  });

  revalidatePath(`/builder/${formId}`);
}

export async function createNewForm() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }

  const newForm = await prisma.form.create({
    data: {
      userId: user.id,
      title: "Untitled Form",
      fields: [],
      theme: {
        colors: {
          primary: "#10b981",
          background: "#0a0a0a",
          text: "#f3f4f6",
          panelBg: "rgba(23, 23, 23, 0.5)",
        },
        fonts: { body: "Inter, sans-serif" },
      },
    },
  });

  redirect(`/builder/${newForm.id}`);
}

export async function deleteForm(formId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }

  await prisma.form.delete({
    where: {
      id: formId,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");
}

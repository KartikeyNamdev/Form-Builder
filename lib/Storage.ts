// app/actions.ts
"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./Session"; // Use our custom session helper
import { BuilderState } from "@/types";

const prisma = new PrismaClient();

/**
 * Creates a new, blank form for the currently logged-in user.
 */
export async function createNewForm() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
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

/**
 * Saves the current state of a form to the database.
 */
export async function saveForm(
  formId: string,
  formData: Pick<BuilderState, "title" | "fields" | "theme">
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  await prisma.form.update({
    where: { id: formId, userId: user.id }, // Security check
    data: {
      title: formData.title,
      fields: formData.fields as unknown as Prisma.InputJsonValue,
      theme: formData.theme as unknown as Prisma.InputJsonValue,
    },
  });

  revalidatePath(`/builder/${formId}`);
}

/**
 * Saves a new submission for a specific form.
 */
export async function submitForm(
  formId: string,
  answers: Record<string, string>
) {
  await prisma.submission.create({
    data: {
      formId: formId,
      answers: answers,
    },
  });
}

/**
 * Deletes a form and all of its submissions.
 */
export async function deleteForm(formId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }

  await prisma.form.delete({
    where: {
      id: formId,
      userId: user.id, // Security check
    },
  });

  revalidatePath("/dashboard");
}

// app/builder/[formId]/page.tsx

import { PrismaClient } from "@prisma/client";
import { Builder } from "@/components/builder/Builder";
import { getCurrentUser } from "@/lib/Session";

const prisma = new PrismaClient();

async function getForm(formId: string) {
  const user = await getCurrentUser();
  if (!user) return null;

  return await prisma.form.findUnique({
    where: {
      id: formId,
      userId: user.id,
    },
  });
}

// 1. The params type is a simple object
export default async function BuilderPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  // 2. Access params.formId directly
  const { formId } = await params;
  const form = await getForm(formId);

  if (!form) {
    return <div>Form not found or you do not have permission to view it.</div>;
  }

  return <Builder form={form} />;
}

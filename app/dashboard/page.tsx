// app/dashboard/page.tsx

import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/Button";

import { createNewForm } from "@/app/actions";
import { FormCard } from "@/components/dashboard/Formcard";
import { getCurrentUser } from "@/lib/Session";

const prisma = new PrismaClient();

async function getFormsForUser() {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const forms = await prisma.form.findMany({
    where: { userId: user.id },
  });
  return forms;
}

// This is now a Server Component - no 'use client' needed
export default async function DashboardPage() {
  const forms = await getFormsForUser();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Your Forms</h1>
        {/* This form calls the createNewForm Server Action */}
        <form action={createNewForm}>
          <Button type="submit" variant="primary">
            + Create New Form
          </Button>
        </form>
      </div>

      {forms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-xl">
          <h2 className="text-2xl font-semibold">No forms yet!</h2>
          <p className="text-gray-400 mt-2 mb-6">
            Click the button to create your first form.
          </p>
          <form action={createNewForm}>
            <Button type="submit" variant="primary">
              + Create New Form
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}

// app/builder/[formId]/results/page.tsx

import { PrismaClient } from "@prisma/client";
import { Panel } from "@/components/ui/Panel";
import { FormField } from "@/types";
import { getCurrentUser } from "@/lib/Session";

const prisma = new PrismaClient();

// This function securely fetches the form and all its related submissions
async function getFormWithSubmissions(formId: string) {
  const user = await getCurrentUser();
  if (!user) return null;

  return await prisma.form.findUnique({
    where: {
      id: formId,
      userId: user.id, // Security: Ensures user can only see their own form's results
    },
    include: {
      submissions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

// This is an async Server Component
export default async function ResultsPage({
  params,
}: {
  // 1. The params type is a simple object
  params: Promise<{ formId: string }>;
}) {
  // 2. Access params.formId directly
  const { formId } = await params;
  const form = await getFormWithSubmissions(formId);

  if (!form) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Form Not Found</h1>
        <p className="text-gray-400">
          This form does not exist or you do not have permission to view it.
        </p>
      </div>
    );
  }

  const fields = form.fields as unknown as FormField[];
  const fieldLabels = new Map(fields.map((f) => [f.id, f.label]));

  return (
    <div className="p-8 container mx-auto">
      <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
      <p className="text-gray-400 mb-8">Submissions</p>
      <div className="space-y-6">
        {form.submissions.length > 0 ? (
          form.submissions.map((submission) => {
            const answers = submission.answers as Record<string, string>;
            return (
              <Panel key={submission.id}>
                <ul className="space-y-2">
                  {Object.entries(answers).map(([fieldId, answer]) => (
                    <li key={fieldId} className="border-b border-white/10 py-3">
                      <strong className="block text-sm text-gray-400">
                        {fieldLabels.get(fieldId) || "Unknown Field"}
                      </strong>
                      <span className="text-lg">{answer}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            );
          })
        ) : (
          <Panel>
            <p className="text-center text-gray-400 py-8">
              No submissions yet.
            </p>
          </Panel>
        )}
      </div>
    </div>
  );
}

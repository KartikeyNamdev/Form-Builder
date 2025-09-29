// app/builder/[formId]/results/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import {
  loadFormFromLocalStorage,
  loadSubmissionsFromLocalStorage,
} from "@/lib/Storage";
import { FormField, Submission } from "@/types";
import { Panel } from "@/components/ui/Panel";

export default function ResultsPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = use(params);
  const [fields, setFields] = useState<FormField[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const savedForm = loadFormFromLocalStorage(formId);
    if (savedForm) {
      setFields(savedForm.fields);
    }
    setSubmissions(loadSubmissionsFromLocalStorage(formId));
  }, [formId]);

  // Create a map of field IDs to labels for easy lookup
  const fieldLabels = new Map(fields.map((f) => [f.id, f.label]));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Form Submissions</h1>
      <div className="space-y-6">
        {submissions.length > 0 ? (
          submissions.map((submission) => (
            <Panel key={submission.id}>
              <ul>
                {Object.entries(submission.answers).map(([fieldId, answer]) => (
                  <li key={fieldId} className="border-b border-white/10 py-2">
                    <strong className="text-gray-300">
                      {fieldLabels.get(fieldId) || "Unknown Field"}:{" "}
                    </strong>
                    {answer}
                  </li>
                ))}
              </ul>
            </Panel>
          ))
        ) : (
          <p>No submissions yet.</p>
        )}
      </div>
    </div>
  );
}

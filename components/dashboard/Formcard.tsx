// components/dashboard/FormCard.tsx

import Link from "next/link";
import { Panel } from "../ui/Panel";
import { Button } from "../ui/Button";
import { deleteForm } from "@/app/actions";
import { Form } from "@prisma/client"; // Import the Form type from Prisma

interface FormCardProps {
  form: Form;
}

export function FormCard({ form }: FormCardProps) {
  // Use a server action for deletion
  const deleteFormWithId = deleteForm.bind(null, form.id);

  return (
    <Panel>
      <h3 className="text-xl font-bold truncate mb-4">{form.title}</h3>
      <div className="flex gap-4">
        <Link href={`/builder/${form.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            Edit
          </Button>
        </Link>
        <Link href={`/form/${form.id}`} target="_blank" className="flex-1">
          <Button variant="secondary" className="w-full">
            View
          </Button>
        </Link>
      </div>
      <form action={deleteFormWithId} className="mt-4">
        <Button
          type="submit"
          className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
        >
          Delete
        </Button>
      </form>
      <Link href={`/form/${form.id}/results`}>
        <Button
          type="submit"
          className="w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 mt-4"
        >
          Answers
        </Button>
      </Link>
    </Panel>
  );
}

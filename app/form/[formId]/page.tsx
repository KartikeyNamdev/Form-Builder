// app/form/[formId]/page.tsx
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormField, FormTheme } from "@/types"; // Import your types
import { Panel } from "@/components/ui/Panel";
import { FieldWrapper } from "@/components/builder/FieldWrapper";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/builder/fields/TextInput";
import { EmailInput } from "@/components/builder/fields/EmailInput";
import { TextareaInput } from "@/components/builder/fields/TextAreaInput";
import { DropdownInput } from "@/components/builder/fields/DropdownInput";
import { CheckboxInput } from "@/components/builder/fields/CheckboxInput";
import { submitForm } from "@/lib/Storage";
const prisma = new PrismaClient();

// Data fetching function that runs on the server
async function getPublicForm(formId: string) {
  return await prisma.form.findUnique({
    where: { id: formId },
  });
}

// Helper function to render fields
function renderField(field: FormField) {
  // Pass the isPreview prop to ensure fields are interactive
  return (
    <>
      {field.type === "text" && <TextInput field={field} isPreview={true} />}
      {field.type === "email" && <EmailInput field={field} isPreview={true} />}
      {field.type === "textarea" && (
        <TextareaInput field={field} isPreview={true} />
      )}
      {field.type === "dropdown" && (
        <DropdownInput field={field} isPreview={true} />
      )}
      {field.type === "checkbox" && (
        <CheckboxInput field={field} isPreview={true} />
      )}
    </>
  );
}

// This is now an async Server Component
export default async function FormPage(props: {
  params: Promise<{ formId: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { formId } = await props.params; // 👈 await params
  const { submitted } = await props.searchParams; // 👈 await searchParams

  const form = await getPublicForm(formId);

  if (!form || !form.theme || !form.fields) {
    return <div>Form not found.</div>;
  }

  const theme = form.theme as unknown as FormTheme;
  const fields = form.fields as unknown as FormField[];

  const themeStyles = {
    "--primary-color": theme.colors.primary,
    "--text-color": theme.colors.text,
  } as React.CSSProperties;

  async function submitFormAction(formData: FormData) {
    "use server";
    const answers: Record<string, string> = {};
    if (!form) {
      return;
    }
    fields.forEach((field) => {
      answers[field.id] = formData.get(field.id) as string;
    });

    await submitForm(form.id, answers);

    revalidatePath(`/form/${form.id}`);
    redirect(`/form/${form.id}?submitted=true`);
  }

  const isSubmitted = submitted === "true";

  return (
    <main
      className="flex items-center justify-center min-h-screen p-6 md:p-8"
      style={themeStyles}
    >
      <Panel className="w-full max-w-2xl">
        {!isSubmitted ? (
          <>
            <h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              style={{ color: "var(--text-color)" }}
            >
              {form.title}
            </h2>
            <form action={submitFormAction} className="space-y-8">
              {fields.map((field) => (
                <FieldWrapper key={field.id} label={field.label}>
                  {renderField(field)}
                </FieldWrapper>
              ))}
              <div className="pt-4 flex justify-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full md:w-auto px-8 py-3 text-lg"
                >
                  Submit
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center p-8 space-y-6">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              Thank You!
            </h2>
            <p
              className="text-lg md:text-xl mb-8"
              style={{ color: "var(--text-color)" }}
            >
              Your submission has been received.
            </p>
          </div>
        )}
      </Panel>
    </main>
  );
}

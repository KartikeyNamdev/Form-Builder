// lib/storage.ts
import { BuilderState, Submission } from "@/types";

// We'll only save the fields and theme, not the actions or other state
type StoredState = Pick<BuilderState, "fields" | "theme">;

export function saveFormToLocalStorage(formId: string, state: StoredState) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      `form-builder-${formId}`,
      JSON.stringify(state)
    );
  }
}

export function loadFormFromLocalStorage(formId: string): StoredState | null {
  if (typeof window !== "undefined") {
    const storedState = window.localStorage.getItem(`form-builder-${formId}`);
    if (storedState) {
      return JSON.parse(storedState) as StoredState;
    }
  }
  return null;
}
export function saveSubmissionToLocalStorage(
  formId: string,
  submission: Submission
) {
  if (typeof window !== "undefined") {
    const submissions = loadSubmissionsFromLocalStorage(formId);
    submissions.push(submission);
    window.localStorage.setItem(
      `submissions-${formId}`,
      JSON.stringify(submissions)
    );
  }
}

export function loadSubmissionsFromLocalStorage(formId: string): Submission[] {
  if (typeof window !== "undefined") {
    const storedSubmissions = window.localStorage.getItem(
      `submissions-${formId}`
    );
    return storedSubmissions ? JSON.parse(storedSubmissions) : [];
  }
  return [];
}

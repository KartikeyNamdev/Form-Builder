// app/login/page.tsx
"use client";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include", // <-- ADD THIS LINE
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <Panel className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-page-text mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-white/5 border-white/10 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-page-text mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-white/5 border-white/10 rounded-md p-2"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full !mt-8 py-3">
            Log In
          </Button>
        </form>
      </Panel>
    </main>
  );
}

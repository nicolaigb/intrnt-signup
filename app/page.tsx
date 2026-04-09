import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SignupForm } from "./signup-form";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-md flex-col items-center justify-center px-4 sm:items-start">
        <SignupForm />
      </main>
    </div>
  );
}

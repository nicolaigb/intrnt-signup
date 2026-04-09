import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SignupForm } from "./signup-form";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-lg flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Card className="w-full">
          <CardTitle className="px-6">Sign up for the latest events</CardTitle>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

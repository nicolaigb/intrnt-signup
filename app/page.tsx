import { Button } from "@/components/ui/button";
import { SignupForm } from "./signup-form";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SignupForm />
      <Button
        variant="link"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-muted-foreground text-xs"
        nativeButton={false}
        render={<Link href="/list">Mailing list</Link>}
      />
    </>
  );
}

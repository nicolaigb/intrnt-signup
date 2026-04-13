"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

export function CopyEmailsButton({ emails }: { emails: string[] }) {
  function handleClick() {
    navigator.clipboard.writeText(emails.join(", "));
    toast("Copied comma-separated addresses to clipboard", {
      position: "bottom-center",
    });
  }

  return (
    <Button variant="outline" onClick={handleClick}>
      <CopyIcon />
      Copy addresses
    </Button>
  );
}

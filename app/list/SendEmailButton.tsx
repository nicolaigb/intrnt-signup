"use client";

import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

export function SendEmailButton({ emails }: { emails: string[] }) {
  function handleClick() {
    window.location.href = `mailto:${emails.join(",")}`;
  }

  return (
    <Button onClick={handleClick}>
      <SendIcon />
      Send email
    </Button>
  );
}

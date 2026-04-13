"use client";

import { useSyncExternalStore, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { verifyPassword } from "@/actions/auth/verifyPassword";

const STORAGE_KEY = "list-authed";

const storedAuthed = () => localStorage.getItem(STORAGE_KEY) === "true";

export function PasswordGuard() {
  const stored = useSyncExternalStore<boolean | null>(
    () => () => {},
    storedAuthed,
    () => null,
  );
  const [justAuthed, setJustAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  const authed = justAuthed || stored;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(false);
    const ok = await verifyPassword(password);
    if (ok) {
      localStorage.setItem(STORAGE_KEY, "true");
      setJustAuthed(true);
    } else {
      setError(true);
      setPending(false);
    }
  }

  if (authed === null) return null;

  return (
    <Dialog open={!authed}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Password required</DialogTitle>
          <DialogDescription>
            Enter the password to view the mailing list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-invalid={error}
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive">Incorrect password.</p>
          )}
        </form>
        <DialogFooter>
          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Checking…" : "Unlock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

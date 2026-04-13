"use client";

import { useSyncExternalStore, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { verifyPassword } from "@/actions/auth/verifyPassword";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";

const STORAGE_KEY = "list-authed";

const storedAuthed = () => localStorage.getItem(STORAGE_KEY) === "true";

const schema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .refine(async (val) => verifyPassword(val), "Incorrect password"),
});

export function PasswordGuard() {
  const stored = useSyncExternalStore<boolean | null>(
    () => () => {},
    storedAuthed,
    () => null,
  );
  const [justAuthed, setJustAuthed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const authed = justAuthed || stored;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  });

  function onSubmit() {
    localStorage.setItem(STORAGE_KEY, "true");
    setJustAuthed(true);
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
        <form
          id="password-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    aria-invalid={fieldState.invalid}
                    autoFocus
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </form>
        <DialogFooter>
          <Button
            form="password-form"
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Checking…" : "Unlock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Form, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowBigUpIcon, CornerDownLeftIcon } from "lucide-react";

const schema = z.object({
  email: z.email({ message: "Not so fast ;)" }),
});

export function SignupForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    toast("Keep it locked.", { position: "bottom-center" });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="relative">
            <FieldLabel htmlFor="email">Tap in</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="email"
                type="email"
                placeholder="Email"
                required
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? "email-error" : undefined}
                {...field}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="submit"
                  size="icon-xs"
                  disabled={fieldState.invalid}
                >
                  <ArrowBigUpIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Receive updates on our latest events. No spam. All love.
            </FieldDescription>
          </Field>
        )}
      />
    </form>
  );
}

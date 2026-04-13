"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import createSignup from "@/actions/signup/createSignup";

const schema = z.object({
  name: z.string(),
  email: z.email({ message: "Not so fast ;)" }),
});

export function SignupForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const message = await createSignup(data);
    if (message) {
      toast.error(message, { position: "bottom-center" });
      return;
    }
    toast("Keep it locked.", { position: "bottom-center" });
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Embrace Sound</CardTitle>
          <CardDescription>
            Sign up to receive updates on the latest events and happenings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="relative">
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    required
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="relative">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    required
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.error ? "email-error" : undefined
                    }
                    {...field}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type="submit">Sign up</Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}

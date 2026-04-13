"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import { SignupCreateInput } from "@/lib/generated/prisma/models";
import prisma from "@/lib/prisma";

export default async function createSignup(signup: SignupCreateInput) {
  try {
    await prisma.signup.create({
      data: signup,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return "This email is already in use.";
      }
    }
    return "Sign up failed. Please try again.";
  }
}

/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `signup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "signup_email_key" ON "signup"("email");

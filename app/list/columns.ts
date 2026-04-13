import { Signup } from "@/lib/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const signupColumns: ColumnDef<Signup>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

import { getSignups } from "@/actions/signup/getSignups";
import { SignupTable } from "./SignupTable";
import { CopyEmailsButton } from "./CopyEmailsButton";
import { SendEmailButton } from "./SendEmailButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SignupsPage() {
  const signups = await getSignups();
  const emails = signups.map((s) => s.email);
  return (
    <Card className="w-full max-w-sm gap-0 h-full max-h-[calc(100vh---spacing(46))] overflow-hidden">
      <CardHeader className="border-b">
        <CardTitle>{signups.length} Signups</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full overflow-y-scroll">
        <SignupTable signups={signups} />
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 sticky bottom-0">
        <CopyEmailsButton emails={emails} />
        <SendEmailButton emails={emails} />
      </CardFooter>
    </Card>
  );
}

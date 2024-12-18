import { ReportIssueForm } from "@/components/modules/report-issue/ReportIssueForm";
import { WrapperForm } from "@/components/Wrappers";
import { Bounded } from "@/components/Bounded";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeaderWithoutAuth from "@/components/layout/header/HeaderWithoutAuth";

export default function Page() {
  return (
    <>
      <HeaderWithoutAuth />
      <Bounded center={true}>
        <WrapperForm>
          <Card className="w-full max-w-2xl mx-auto bg-muted/50 mt-10">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Report an API Issue
              </CardTitle>
              <CardDescription>
                Fill in the details below to report an API issue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportIssueForm />
            </CardContent>
          </Card>
        </WrapperForm>
      </Bounded>
    </>
  );
}
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/atoms/card";
import SigninForm from "@/components/organisms/signin-form";
import { Toaster } from "sonner";

export default function Signin() {
  return (
    <>
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-main">Login</CardTitle>
          <CardDescription>Enter your username below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm />
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/atoms/card";
import RegisterForm from "@/components/organisms/register-form";

export default function Register() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-main">Register</CardTitle>
        <CardDescription>Sign up now to stream unlimited songs and podcasts!</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}

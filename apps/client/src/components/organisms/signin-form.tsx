import { signinBodySchema, SigninType } from "mp-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth-api";
import { useNavigate } from "react-router-dom";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/atoms/form";

const SigninForm = () => {
  const navigate = useNavigate();

  const signinForm = useForm<SigninType>({
    resolver: zodResolver(signinBodySchema),
    defaultValues: { username: "", password: "" },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (credentials: SigninType) => {
      await authApi.signin(credentials);
    },
    onSuccess: () => {
      // navigate("/");
      console.log("Success");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (credentials: SigninType) => mutateAsync(credentials);

  return (
    <Form {...signinForm}>
      <form onSubmit={signinForm.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={signinForm.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signinForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-main text-white">Login</Button>
        </div>
      </form>
    </Form>
  );
};

export default SigninForm;

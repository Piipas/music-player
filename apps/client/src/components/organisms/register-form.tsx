import { registerBodySchema, RegisterType } from "mp-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth-api";
import { useNavigate } from "react-router-dom";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../atoms/form";
import { LoaderCircle } from "lucide-react";

const RegisterForm = () => {
  const navigate = useNavigate();

  const registerForm = useForm<RegisterType>({
    resolver: zodResolver(registerBodySchema),
    defaultValues: { username: "", email: "", password: "", confirm_password: "" },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (details: RegisterType) => {
      await authApi.register(details);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit = (details: RegisterType) => mutateAsync(details);

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={registerForm.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormMessage className="font-light" />
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormMessage className="font-light" />
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormMessage className="font-light" />
                <FormControl>
                  <Input placeholder="Password" type={"password"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormMessage className="font-light" />
                <FormControl>
                  <Input placeholder="Password confirmation" type={"password"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full bg-main text-white gap-2">{isPending ? <LoaderCircle /> : "Register"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;

import { signinBodySchema, SigninType } from "mp-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth-api";
import { useNavigate } from "react-router-dom";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/atoms/form";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

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
      navigate("/");
    },
    onError: (error) => {
      toast("Error:", {
        description: error.message,
        cancel: {
          label: "Close",
          onClick: () => null,
        },
        position: "bottom-center",
        classNames: {
          toast: "bg-red-500 text-foreground",
          cancelButton: "!bg-foreground !text-red-500",
        },
      });
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
                <FormMessage className="text-sm font-light" />
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={signinForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormMessage className="text-sm font-light" />
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full bg-main text-white">
            {isPending ? <LoaderCircle className="animate-spin" /> : "Login"}
          </Button>
          <p className="text-sm text-center">
            Don't you have an account?{" "}
            <span className="text-main hover:underline cursor-pointer" onClick={() => navigate("/register")}>
              Register
            </span>{" "}
            here.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SigninForm;

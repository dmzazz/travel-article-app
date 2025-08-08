import z from "zod";

// Import Link component for navigation
import { Link } from "react-router-dom";

// Import the authentication service
import { register } from "@/services/api/auth";

// Import hooks
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/lib/form-schema";
import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdAccountCircle, MdOutlineEmail } from "react-icons/md";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the form with the login schema
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    await register(values);
  };
  return (
    <main className="relative grid min-h-screen place-items-center bg-[url('background-image-login.jpg')] bg-cover bg-center">
      <div className="relative w-full rounded-lg bg-white/80 p-5 shadow-md sm:max-w-md">
        <img
          src="/logo.png"
          alt="travel article app logo"
          className="mx-auto w-36"
        />

        {/* Render the RegisterForm component */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MdOutlineEmail className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-gray-500" />
                      <Input
                        type="text"
                        placeholder="Input email"
                        className="pl-10"
                        {...field}
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MdAccountCircle className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-gray-500" />
                      <Input
                        type="text"
                        placeholder="Input username"
                        className="pl-10"
                        {...field}
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-gray-500" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Input password"
                        className="pr-10 pl-10"
                        {...field}
                        required
                      />
                      <span
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-lg text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <HiEyeOff /> : <HiEye />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Login;

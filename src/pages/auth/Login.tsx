import type z from "zod";

// Import the login form schema
import { loginFormSchema } from "@/lib/form-schema";

// Import necessary components and hooks
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

import { setToken, setUser } from "@/lib/cookies";
import { login } from "@/services/api/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CiLock } from "react-icons/ci";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Initialize the form with the login schema
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const loginResult = await login(values);
    if (loginResult) {
      const { result, response } = loginResult;
      if (!response.ok) {
        console.error("Login failed:", result.error?.message);
        toast.error(result.error?.message);
      } else {
        // Save token jwt and user data to cookie
        setToken(result.jwt);
        setUser(result.user);

        toast.success("Login successful!");

        setTimeout(() => navigate("/articles"), 2200);
      }
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center bg-[url('background-image-login.jpg')] bg-cover bg-center">
      <span
        className="absolute text-9xl"
        style={{
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "2px white",
          color: "white",
        }}
      >
        Travel Article App
      </span>

      <div className="relative w-full rounded-lg bg-white/80 p-5 shadow-md sm:max-w-md">
        <img
          src="/logo.png"
          alt="travel article app logo"
          className="mx-auto w-36"
        />
        <p className="mb-4 text-center">
          Please enter your email and password to login.
        </p>{" "}
        {/* Render the LoginForm component */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
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
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-primary font-semibold">
                Register
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

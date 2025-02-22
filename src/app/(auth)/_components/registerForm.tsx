"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be atleast 5 character" }),
  fullname: z.string({ message: "Fullname is required" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Enter your 10 digit mobile number" })
    .max(10, { message: "Enter your 10 digit mobile number" }),
  password: z.string().min(8, "Minimum 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setError(""); // Clear previous errors

      const response = await axios.post("/api/register-user", values);

      // Check for successful registration
      if (response.status === 201) {
        router.push("/login-user");
      } else {
        // Handle other status codes (e.g., 400, 500)
        setError(
          response.data.message || "An error occurred during registration."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors (e.g., 400, 500)
        setError(
          error.response?.data.message ||
            "An error occurred during registration."
        );
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col  p-3 lg:p-0 items-center">
      <Card className="w-full m-12 lg:w-1/3">
        <CardHeader>
          <div className="flex flex-col justify-center items-center gap-3">
            <CardTitle>Register</CardTitle>
            <CardDescription className="flex flex-col justify-center items-center">
              <div>By signing up, you agree to our</div>
              <div>
                <Link href="/privacy">
                  <span className="text-blue-700">Privacy Policy</span>
                </Link>{" "}
                and{" "}
                <Link href="/terms">
                  <span className="text-blue-700">Terms of Service</span>
                </Link>
              </div>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your user name"
                        type="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        type="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your number"
                        type="text"
                        {...field}
                      />
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
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2 flex justify-center">
                <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Register"}
                </Button>
              </div>
              <div className="mt-2 flex justify-center">
                {error && <div className="text-red-500">{error}</div>}
              </div>
            </form>
          </Form>
          <CardDescription className="flex justify-center mt-1">
            <div>
              If already registered{" "}
              <Link href="/login-user">
                <span className="text-blue-700">Login</span>
              </Link>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

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
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/login-user", values);
      if (response.status === 200) {
        const role = response.data.role;
        if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/users");
        }
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.error || "An error occurred during login"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col p-3 lg:p-0 justify-center items-center">
      <Card className="w-full m-12 lg:w-1/3">
        <CardHeader>
          <div className="flex flex-col justify-center items-center gap-3">
            <CardTitle>Login</CardTitle>
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
                  {loading ? "Loading..." : "Login"}
                </Button>
              </div>
              <div className="mt-2 flex justify-center">
                {error && <div className="text-red-500">{error}</div>}
              </div>
            </form>
          </Form>
          <CardDescription className="flex justify-center mt-1">
            <div>
              If not registered{" "}
              <Link href="/register-user">
                <span className="text-blue-700">Register here</span>
              </Link>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

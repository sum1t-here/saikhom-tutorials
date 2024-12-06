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
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
  file: z
    .any()
    .refine(
      (file) =>
        file &&
        (file.type === "application/pdf" ||
          file.type === "video/mp4" ||
          file.type === "video/avi" ||
          file.type === "video/mkv" ||
          file.type === "video/mov"),
      "File must be a PDF or a video (mp4, avi, mkv, mov).",
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function FileUploadForm() {
  const [message, setMessage] = useState<string>("");
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  async function onSubmit(values: FormData) {
    const formData = new FormData();
    formData.append("file", values.file[0]);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`File uploaded successfully: ${data.filePath}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  }

  return (
    <div className="flex flex-col p-3 lg:p-0 justify-center items-center">
      <Card className="w-full m-12 lg:w-1/3">
        <CardHeader>
          <div className="flex flex-col justify-center items-center gap-3">
            <CardTitle>Upload File</CardTitle>
            <CardDescription>
              Upload a PDF or a video file (mp4, avi, mkv, mov).
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.mp4,.avi,.mkv,.mov"
                        onChange={(e) =>
                          field.onChange(e.target.files ? e.target.files : [])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4 flex justify-center">
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </Form>
          {message && (
            <CardDescription className="mt-4 text-center text-green-700">
              {message}
            </CardDescription>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

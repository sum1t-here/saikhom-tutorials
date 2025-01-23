"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCourseStore from "@/store/useCourseStore";
import { Loader } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function CourseCard({ userId }: { userId: number }) {
  const { courses, fetchCourses, loading, error } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const router = useRouter();

  const handleEnroll = async (
    courseId: number,
    userId: number,
    price: number
  ) => {
    try {
      // Step 1: Create a Razorpay order
      const createOrderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price, userId, courseId }),
      });

      if (!createOrderResponse.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const orderData = await createOrderResponse.json();
      // console.log("Order created:", orderData); // Log order data

      // Step 2: Open Razorpay payment modal
      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: "INR",
        order_id: orderData.id,
        name: "Saikhom Tutorials",
        description: "Course Enrollment",
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          console.log("Razorpay response:", response); // Log the response
          try {
            // Step 3: Verify the payment
            const verifyResponse = await fetch("/api/verify-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error("Failed to verify payment");
            }

            const verifyData = await verifyResponse.json();
            // console.log("Payment verification result:", verifyData); // Log verification result

            // Step 4: Redirect based on verification result
            if (verifyData.isOk) {
              router.push("/users");
            } else {
              router.push("/users/payment-failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            router.push("/users/payment-failed");
          }
        },
        theme: {
          color: "#3399cc", // Customize the modal theme
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payment = new (window as any).Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Error during enrollment:", error);
      router.push("/users/payment-failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error fetching courses
      </div>
    );
  }

  return (
    <div>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => console.log("Razorpay script loaded")} // Log when the script is loaded
      />
      <div className="min-h-screen sm:px-6 lg:px-8 w-full p-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
            Discover Our Courses
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="flex flex-col overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={500}
                  height={500}
                  className="w-full h-40 object-cover"
                />
                <div className="h-2 bg-blue-600"></div>
                <CardHeader className="bg-white">
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow bg-blue-50 p-6">
                  <p className="text-3xl font-bold text-blue-900">
                    ₹{course.price}
                  </p>
                </CardContent>
                <CardFooter className="bg-white">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() =>
                      handleEnroll(parseInt(course.id), userId, course.price)
                    }
                  >
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

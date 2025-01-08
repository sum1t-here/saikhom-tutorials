import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentFailed() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        {/* Payment Failed Icon */}
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Payment Failed Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong with your payment. Please try again or
          contact support if the issue persists.
        </p>

        {/* Retry Payment Button */}
        <Link href="/users/courses">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
            Retry Payment
          </Button>
        </Link>

        {/* Back to Courses Link */}
        <Link href="/users/courses">
          <span className="text-blue-600 hover:underline cursor-pointer">
            Back to Courses
          </span>
        </Link>
      </div>
    </div>
  );
}

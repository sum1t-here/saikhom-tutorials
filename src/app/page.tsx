import { Button } from "@/components/ui/button";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import CarouselComponent from "@/components/CarouselComponent";
import StudentSection from "@/components/StudentSection";
import StudentTestimonials from "@/components/StudentTestimonials";
import result1 from "../../public/result1.png";
import result2 from "../../public/result2.png";
import FacultySection from "@/components/FacultySection";
import ContactSection from "@/components/ContactSection";
import StatsSection from "@/components/StatsSection";
import ProgramsSection from "@/components/ProgramSection";
import FeeDetails from "@/components/FeeDetails";
import FaqSection from "@/components/FaqSection";
import landingpageimg from "../../public/landingimg.jpeg";
import WhatsAppButton from "@/components/WhatsappButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex-grow">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-5">
        <CarouselComponent />
      </section>
      <WhatsAppButton />
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              North-East India&apos;s Biggest &{" "}
              <span className="text-purple-600">Most Trusted</span>
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Educational Platform
            </h3>
            <p className="mb-8">
              Unlock your potential by signing up with Saikhom Tutorials - The
              most affordable learning solution
            </p>
            <Button size="lg">Get Started</Button>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <Image
              src={landingpageimg}
              alt="Students"
              width={500}
              height={300}
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow max-w-xs">
              <p className="font-bold text-sm">
                ST is North-East India&apos;s leading Edtech Company that is
                democratizing education at Scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 ">
        <div className=" mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎥"
              title="Daily Live"
              description="Interactive classes"
            />
            <FeatureCard
              icon="📝"
              title="10 Million +"
              description="Tests, sample papers & notes"
            />
            <FeatureCard
              icon="🕒"
              title="24 x 7"
              description="Doubt solving sessions"
            />
          </div>
        </div>
      </section>

      <section>
        <StudentSection />
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Academic Excellence : Results
          </h2>
          <div className="flex gap-6 mt-3">
            <Image
              src={result1}
              alt="Result"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
            />
            <Image
              src={result2}
              alt="Result"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <StudentTestimonials />
      </section>
      <StatsSection />
      <ProgramsSection />
      <FeeDetails />
      <FacultySection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

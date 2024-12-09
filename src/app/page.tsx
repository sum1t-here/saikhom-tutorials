import { Button } from "@/components/ui/button";
import Rootlayout from "./rootlayout";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <Rootlayout>
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Achieve Your NEET Aim With Us!
            </h1>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              NEET BATCHES
            </h2>
            <p className="text-xl sm:text-2xl mb-8">
              FOR CLASS 11TH, 12TH, NEET & DROPPERS
            </p>
            <Button size="lg" variant="secondary">
              EXPLORE BATCHES!
            </Button>
          </div>
        </section>

        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Bharat's Biggest &{" "}
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
                src="/placeholder.svg"
                alt="Students"
                width={500}
                height={300}
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow max-w-xs">
                <p className="font-bold text-sm">
                  ST is India's leading Edtech Company that is democratizing
                  education at Scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <FeatureCard
                icon="🏢"
                title="100 +"
                description="Offline centres"
              />
            </div>
          </div>
        </section>
      </main>
    </Rootlayout>
  );
}

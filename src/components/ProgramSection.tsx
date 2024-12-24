import { Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Program {
  title: string;
  subtitle: string;
  features: string[];
}

const programs: Program[] = [
  {
    title: "SCHOOL INTEGRATED 4 YEAR PROGRAM",
    subtitle: "TARGETING NEET (After Class VIII)",
    features: [
      "4 year program",
      "Targeting - NEET & BOARDS",
      "For class 9th moving onwards",
    ],
  },
  {
    title: "SCHOOL INTEGRATED 4 YEAR PROGRAM",
    subtitle: "TARGETING JEE (MAIN+ADVANCED) (After Class VIII)",
    features: [
      "4 year program",
      "Targeting - JEE & BOARDS",
      "For class 9th moving onwards",
    ],
  },
  {
    title: "SCHOOL INTEGRATED 2 YEAR PROGRAM",
    subtitle: "TARGETING NEET (After Class X)",
    features: [
      "2 year program",
      "Targeting - NEET & BOARDS",
      "For class 9th moving onwards",
    ],
  },
  {
    title: "SCHOOL INTEGRATED 2 YEAR PROGRAM",
    subtitle: "TARGETING JEE (MAIN+ ADVANCED) (After Class X)",
    features: [
      "2 year program",
      "Targeting - JEE & BOARDS",
      "For class 9th moving onwards",
    ],
  },
  {
    title: "REGULAR COACHING PROGRAM",
    subtitle: "FOR BOARDS + JEE/NEET CLASS 9TH – 12TH",
    features: ["After school coaching classes", "For classes 9th to 12th"],
  },
  {
    title: "1 YEAR DROPPERS",
    subtitle: "COURSE FOR JEE/NEET",
    features: ["1 year program", "Targeting - JEE/NEET", "After Class 12th"],
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {programs.map((program, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-blue-900 text-white p-6">
                <h3 className="text-xl font-bold text-center leading-tight">
                  {program.title}
                </h3>
                <p className="text-center mt-2 text-sm">{program.subtitle}</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    {program.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5 text-green-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

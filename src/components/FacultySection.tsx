import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import saikhomtiken from "../../public/saikhomtiken.png";
import ridipkalita from "../../public/ridipkalita.png";
import kishorekalita from "../../public/kishorekalita.png";
import udiptasharma from "../../public/udiptasharma.png";

interface FacultyMember {
  name: string;
  position: string;
  qualification: string;
  experience: string;
  description: string;
  image: StaticImageData | string;
}

const facultyMembers: FacultyMember[] = [
  {
    name: "SAIKHOM TIKEN",
    position: "DIRECTOR & H.O.D CHEMISTRY",
    qualification: "M.Sc BIOTECHNOLOGY",
    experience: "Experience: 15 years",
    description:
      "A Mentor, friend and guide that considers every student to be special. Tiken Sir specialize in learning in a fun easy and simple way on any given topic.",
    image: saikhomtiken,
  },
  {
    name: "RIDIP KALITA",
    position: "H.O.D MATHS",
    qualification: "",
    experience: "Experience: 10 Years",
    description:
      "A truly passionate teacher that believes in delivering his best in his every lecture. His methodology has helped many a students shine in various exams at state and national level.",
    image: ridipkalita,
  },
  {
    name: "KISHORE KALITA",
    position: "H.O.D PHYSICS",
    qualification: "",
    experience: "Experience: 7 years",
    description:
      "The Wizard of Physics, he explains Physics in a simple understandable form that will make you simply fall in love with physics.",
    image: kishorekalita,
  },
  {
    name: "UDIPTA SHARMA",
    position: "H.O.D BIOLOGY",
    qualification: "",
    experience: "Experience: 5 years",
    description:
      "Possess vast knowledge on wide array of topics of Biology. Uses various learning techniques to make the student remember the idea for a longer period of a time.",
    image: udiptasharma,
  },
];

export default function FacultySection() {
  return (
    <section className="py-12 px-4 md:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Faculty</h2>
        <div className="space-y-8 flex flex-col gap-8">
          {facultyMembers.map((faculty, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-white rounded-lg shadow"
            >
              <CardContent className="p-0">
                <div
                  className={`flex flex-col gap-3 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center`}
                >
                  {/* Image Section */}
                  <div className="w-full md:w-1/3 flex justify-center items-center">
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      height={250}
                      width={250}
                      className="rounded-full"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-2/3 p-6 bg-blue-50">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-blue-800">
                        {faculty.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {faculty.position}
                      </p>
                      {faculty.qualification && (
                        <p className="text-gray-600 italic">
                          {faculty.qualification}
                        </p>
                      )}
                      <p className="text-gray-600">{faculty.experience}</p>
                    </div>
                    <p className="text-gray-700">{faculty.description}</p>
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

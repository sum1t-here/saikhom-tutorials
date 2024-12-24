import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import hagesonia from "../../public/hagesonia.png";
import mrigankanath from "../../public/mrigankanath.png";
import sanjeetsingh from "../../public/sanjeetsingh.png";

interface Testimonial {
  name: string;
  achievement: string;
  image: StaticImageData | string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Hage Sonia",
    achievement: "40TH RANK NEET",
    image: hagesonia,
    quote:
      "I can say from my experience that SAIKHOM TUTORS is the perfect place to prepare for the NEET exams. With the constant guidance provided here, goals can be achieved, given that the student is actively putting his 100% by investing in the process. They drew plans for my standardized exam preparation without adding extra stress and disturbing my regular academics. Thank you SAIKHOM TUTORS!",
  },
  {
    name: "Mirganka Nath",
    achievement: "8TH RANK Class XII – AHSEC",
    image: mrigankanath,
    quote:
      "At the very outset, sincere gratitude and thanks to SAIKHOM TUTORS. All the faculties are amazing, they've been always there for me to help resolve my doubts. I am able to do well in both BOARDS as well as JEE exams because of the well planned course design and support provided by SAIKHOM TUTORS. All the ideas and tricks that was given in the class was immensely helpful.",
  },
  {
    name: "Sanjeet Singh",
    achievement: "100/100 Maths",
    image: sanjeetsingh,
    quote:
      "A life changing experience at SAIKHOM TUTORS. It was such a wonderful healthy competitive classroom environment, the best part was the wonderful teachers that were so caring and ever ready to help the students. Along the course lectures, the Constant motivation and guidance that was provided periodically was also of immense help. Forever Thankful to all the faculties of SAIKHOM TUTORS.",
  },
];

export default function StudentTestimonials() {
  return (
    <section className="py-12 px-4 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-blue-800 text-white border-none overflow-hidden"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-32 h-32 relative mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
                <p className="text-sm font-semibold mb-4">
                  {testimonial.achievement}
                </p>
                <p className="text-sm leading-relaxed">{testimonial.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

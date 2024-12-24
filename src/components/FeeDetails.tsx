import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "JEE/NEET COURSE FOR CLASS XI (BOARD SYLLABUS + JEE/NEET)",
    answer: "COURSE FEE: 90,000",
  },
  {
    question: "JEE/NEET COURSE FOR CLASS XII (BOARD SYLLABUS + JEE/NEET)",
    answer: "COURSE FEE: 90,000",
  },
  {
    question: "JEE-NEET CRASH COURSE For XII students (PASSED OR APPEARED)",
    answer: "COURSE FEE: 15,000",
  },
  {
    question: "MATHS AND SCIENCE or CLASS IX AND X",
    answer: "COURSE FEE: 36,000",
  },
];

export default function FeeDetails() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Courses and Fee Structure</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const planner = [
    {
      title: "Class IX",
      details: [
        {
          label: "JEE (Main+Advanced)/NEET",
          description:
            "Basic chapters of JEE/NEET syllabus (Class 11th) will be dealt with in the first year to make a solid base.",
        },
        {
          label: "NCERT Coverage",
          description:
            "Full syllabus coverage with periodic testing for complete command of the school curriculum. The planning is coherent with the board pattern.",
        },
        {
          label: "Examinations",
          description: "NTSE Stage 1 and 2, IJSO, IOQM.",
        },
      ],
    },
    {
      title: "Class X",
      details: [
        {
          label: "JEE (Main+Advanced)/NEET",
          description:
            "Basic chapters & slightly advanced chapters of JEE/NEET syllabus (Class 12th) will be dealt with to make a solid base.",
        },
        {
          label: "NCERT Coverage",
          description:
            "Full syllabus coverage with periodic testing for complete command of the school curriculum.",
        },
        {
          label: "Examinations",
          description: "NTSE Stage 1 and 2, IJSO, IOQM.",
        },
      ],
    },
    {
      title: "Class XI",
      details: [
        {
          label: "JEE (Main+Advanced)/NEET",
          description:
            "The syllabus up to the start of Class XII will be covered in this class.",
        },
        {
          label: "Various Olympiads",
          description:
            "Olympiads related to Mathematics, Physics, Chemistry, and Astronomy conducted by Homi Bhabha Centre of Science Education (HBCSE). Students clearing all stages of these examinations get the chance to represent India at the international level.",
        },
        {
          label: "NCERT Coverage",
          description:
            "Full syllabus coverage with periodic testing for complete command of the school curriculum.",
        },
      ],
    },
    {
      title: "Class XII",
      details: [
        {
          label: "JEE (Main+Advanced)/NEET",
          description:
            "With relatively less to cover in Class XII, the focus is more on revision and rank boosting with rigorous testing based on the current pattern of JEE (Main+Advanced)/NEET.",
        },
        {
          label: "Various Olympiads",
          description:
            "Olympiads related to Mathematics, Physics, Chemistry, and Astronomy conducted by Homi Bhabha Centre of Science Education (HBCSE). Students clearing all stages of these examinations get the chance to represent India at the international level.",
        },
        {
          label: "NCERT Coverage",
          description:
            "Full syllabus coverage with periodic testing for complete command of the school curriculum.",
        },
      ],
    },
  ];

  const programs = [
    {
      title: "4 Year JEE (Main+Advanced) Program",
      target: "Target Exam JEE (M+A) 2028",
      download: "Coming Soon",
    },
    {
      title: "4 Year NEET Program",
      target: "Target Exam NEET 2028",
      download: "Coming Soon",
    },
    {
      title: "3 Year JEE (Main+Advanced) Program",
      target: "Target Exam JEE (M+A) 2027",
      download: "Coming Soon",
    },
    {
      title: "3 Year NEET Program",
      target: "Target Exam NEET 2027",
      download: "Coming Soon",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our coaching programs and
            methodology.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
              About The Program
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                <p className="text-gray-700 leading-relaxed">
                  The Three/Four Year Regular Classroom Courses are specially
                  designed for JEE (Main+Advanced)/ NEET aspirants who have
                  currently enrolled in classes X and IX respectively and aspire
                  to prepare for JEE (Main+Advanced)/NEET Entrance Exams from an
                  early stage. These courses target to assist students in early
                  preparation for the Olympiads, National Talent Search
                  Examination (NTSE), Engineering Entrance Examinations (JEE
                  Main & Advanced and other State Engineering Common Entrance
                  Tests), and Medical Entrance Examinations (NEET).
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Student studies a regularly updated and standardized
                  curriculum for these three/four years, which helps them
                  develop the conceptual and analytical skills needed to succeed
                  in a variety of competitive exams.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These three/ four year program give students the opportunity
                  to prepare thoroughly while laying a strong foundation for
                  them.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              Why This Program ?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                <p>
                  The maximum number of JEE (Advanced) attempts has been limited
                  by IITs. There are now just two opportunities for students:
                  one right after the XII board examinations and the second
                  immediately in the following year. They should aim to pass the
                  JEE (Advanced) on their first attempt and should not put
                  themselves under undue pressure because appearing for the
                  second and final attempts could be too risky due to the
                  possibility of illness or accidents.
                </p>
                <p>
                  More than 18 lakh students take the NEET exam each year, one
                  of the most difficult medical entrance tests in the nation.
                  According to the number of NEET 2019 applications, 15.19 lakh
                  candidates are anticipated to take the exam to be enrolled on
                  MBBS and BDS universities across the nation.
                </p>
                <p>
                  Up until the 1990s, it was acceptable to begin your
                  preparation after grade XI and at the start of grade XII, but
                  even then, you had to start early enough to achieve Top Ranks.
                  But beginning in the early 2000s, it became customary to begin
                  JEE preparation at the start of class XI and commit at least
                  two years to intense preparation.
                </p>
                <p>
                  Now, only the talented students can succeed by beginning their
                  JEE training in XI due to the increased competition and the
                  fact that there are only two chances available. However, if
                  you lack the natural talent that would lead you to the top
                  ranks of JEE, you will have no choice but to begin your
                  preparation in class IX.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              Course Structure
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                <div>
                  <span className="font-bold">Subjects covered:</span> Physics,
                  Chemistry, Biology, Mathematics, English, Social Studies, and
                  Mental Ability will be covered for the NTSE level in classes
                  IX and X while the emphasis on the JEE Main & Advanced/ NEET
                  continues. In classes XI and XII, Physics, Chemistry, and
                  Mathematics will be covered for the JEE Main & Advanced and
                  Physics, Chemistry, and Biology for the NEET.
                </div>
                <div>
                  <span className="font-bold">Pre-defined Yearly Planner:</span>
                  The yearly planner consists of arrayed chapters for each
                  subject, a test grid of the whole session with syllabus
                  mentioned in it, a holiday schedule & homework schedule etc.
                  Extensive coverage of additional topics for JEE Main &
                  Advanced/NEET. The right balance of classes, problem-solving
                  classes and doubt clearing classes. Daily Practice Sheets
                  (DPP) for School preparations to be solved and Submitted.
                  Comprehensive Practice Sheets (CPS) for JEE/NEET preparations
                  to be solved and Submitted. Kota’s best complete Study
                  material of Class IX, X, XI & XII designed by top experienced
                  faculties to crack Olympiad, JEE/NEET entrance exam.
                </div>
                <div>
                  <span className="font-bold">All India Testing:</span> Regular
                  examinations that are listed in the yearly planner and given
                  to Motion students at all study locations are used to evaluate
                  the topics that the students have learned and practiced.
                  Students can use this to assess their national performance.
                  Periodic tests are conducted on the latest JEE pattern. Every
                  month feedback reports are shared with parents in PTM. NTSE &
                  Board Mock Test Papers.
                </div>
                <div>
                  <span className="font-bold">JEE Archive:</span> Question Bank
                  with Answers of previous year JEE (Main & Advanced)papers.
                </div>
                <div>
                  <span className="font-bold">NEET Archive:</span> Question Bank
                  with Answers of previous year NEET papers.
                </div>
                <div>
                  Dedicated academic operations team provides feedback at any
                  point in time apart from scheduled parent teachers meetings.
                </div>
                <div>
                  <span className="font-bold">
                    Relevant Competitive Examination:
                  </span>{" "}
                  National Talent Search Examination (NTSE), International
                  Junior Science Olympiads(IJSO) and Regional Mathematics
                  Olympiad (RMO), JEE Main & Advanced and NEET.
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">
              Class Wise Course Coverage (JEE Mains+Advance/ NEET)
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6">
                {planner.map((plan, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg bg-white shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      {plan.title}
                    </h3>
                    {plan.details.map((detail, idx) => (
                      <div key={idx} className="mb-3">
                        <p className="font-semibold text-gray-800">
                          {detail.label}:
                        </p>
                        <p className="text-gray-700">{detail.description}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">
              Academic Planners
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-white shadow-sm flex flex-col"
                  >
                    <h3 className="text-lg font-bold">{program.title}</h3>
                    <p className="text-gray-700 mt-2">{program.target}</p>
                    <button
                      disabled
                      className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed"
                    >
                      {program.download}
                    </button>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-semibold">
              How to Enrol in Program ?
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-inside list-disc">
                <li>Register for Motion Open Scholarship Test (MOST)</li>
                <li>Appear & qualify the test</li>
                <li>Avail scholarship & submit course fee</li>
              </ul>
              <p>
                To register, kindly call us on on : <strong>7002658011</strong>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

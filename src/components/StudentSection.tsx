import {
  BarChart2,
  FileText,
  Users2,
  Award,
  GraduationCap,
  School,
} from "lucide-react";

export default function StudentSection() {
  return (
    <section className="py-12 px-4 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Saikhom Tutors is transformational for every Student.
          </h2>
          <p className="text-xl md:text-2xl font-bold">
            And this is reflected in our results.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Achievement 1 */}
          <div className="flex gap-4 items-start">
            <div className="text-blue-600 shrink-0">
              <BarChart2 className="w-8 h-8" />
            </div>
            <p className="text-sm md:text-base">
              Since 2011, our classroom programs have consistently produced the
              highest number of selections in JEE & NEET exams.
            </p>
          </div>

          {/* Achievement 2 */}
          <div className="flex gap-4 items-start">
            <div className="text-blue-600 shrink-0">
              <Users2 className="w-8 h-8" />
            </div>
            <p className="text-sm md:text-base">
              Our classroom programs have consistently led in the Top 10, Top
              20, Top 50, Top 100, Top 200, and Top 500 rankings every year
              since 1997.
            </p>
          </div>

          {/* Achievement 3 */}
          <div className="flex gap-4 items-start">
            <div className="text-blue-600 shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <p className="text-sm md:text-base">
              Our coaching programs have consistently produced rankers of state
              as well as the northeast region in BOARDS, JEE & NEET EXAMS.
            </p>
          </div>

          {/* Achievement 4 */}
          <div className="flex gap-4 items-start">
            <div className="text-blue-600 shrink-0">
              <FileText className="w-8 h-8" />
            </div>
            <p className="text-sm md:text-base">
              Our coaching programs have has consistently produced the highest %
              of selections in JEE & NEET Exams.
            </p>
          </div>

          {/* Achievement 5 */}
          <div className="flex gap-4 items-start">
            <div className="text-blue-600 shrink-0">
              <School className="w-8 h-8" />
            </div>
            <p className="text-sm md:text-base">
              Our students has been able to perform consistently to get
              excellent scores in the BOARD Exams as well the exams conducted by
              NTA for JEE & NEET.
            </p>
          </div>

          {/* Achievement 6 */}
          <div className="flex gap-4 items-start">
            <div className="text-blue-600 shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <p className="text-sm md:text-base">
              Our students are now studying in almost every Medical and
              Engineering colleges of the region.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

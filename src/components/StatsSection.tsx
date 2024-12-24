import { Globe, GraduationCap } from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {/* Selections Stats */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 text-blue-600">
              <Globe className="w-full h-full" />
            </div>
            <h3 className="text-4xl font-bold mb-2">
              <div className="flex items-center justify-center">
                <NumberTicker value={200} /> <p>+</p>
              </div>
            </h3>
            <p className="text-gray-600 text-lg">Selections</p>
          </div>

          {/* Students Stats */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 text-blue-600">
              <GraduationCap className="w-full h-full" />
            </div>
            <h3 className="text-4xl font-bold mb-2">
              <div className="flex items-center justify-center">
                <NumberTicker value={10000} /> <p>+</p>
              </div>
            </h3>
            <p className="text-gray-600 text-lg">Students</p>
          </div>
        </div>
      </div>
    </section>
  );
}

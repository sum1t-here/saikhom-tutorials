import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PieChart from "./_components/piechart";
import LineChart from "./_components/linechart";
import AdminTable from "./courses/_components/adminTable";

export default function AdminDashBoard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold text-gray-800">
            <div className="flex flex-row justify-between items-center w-full">
              <h1>Admin Dashboard</h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col gap-8">
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 shadow-sm">
                <div className="h-64 w-full flex justify-center items-center">
                  <PieChart />
                </div>
              </Card>
              <Card className="p-4 shadow-sm">
                <div className="h-64">
                  <LineChart />
                </div>
              </Card>
            </div>

            {/* Table Section */}
            <Card className="shadow-sm">
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Admin Table
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <AdminTable />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
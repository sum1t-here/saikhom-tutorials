import GetCourses from "./_components/getCourse";

export default function Courses() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-xl"> All courses</h1>
      <GetCourses />
    </div>
  );
}

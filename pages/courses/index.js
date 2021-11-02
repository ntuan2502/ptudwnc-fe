import { useEffect, useMemo, useState } from "react";
import Table from "../../components/Table"; // new
import Nav from "../../components/Nav";
import AddCourseModal from "../../components/AddCourseModal";
import Loading, { SigninToContinue } from "../../components/Loading";
import { useSession } from "next-auth/react";
import { getApiUrl } from "../../lib/Utils";

export default function CoursesPage() {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "ClassRoom",
        accessor: "classroom.name",
      },
      {
        Header: "Subject",
        accessor: "subject.name",
      },
      {
        Header: "Program",
        accessor: "program.name",
      },
      {
        Header: "Year",
        accessor: "year.name",
      },
    ],
    []
  );
  const { data: session } = useSession();
  const [courses, setCourses] = useState();
  const [isNew, setIsNew] = useState(false);
  const [statusCode, setStatusCode] = useState(401);

  useEffect(async () => {
    const courses = await fetch(getApiUrl() + "/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.jwt}`,
      },
    });
    const coursesData = await courses.json();
    setCourses(coursesData);
    // console.log(coursesData);
    setStatusCode(courses.status);
  }, [isNew, session?.jwt]);
  // console.log(statusCode);
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-xl font-semibold">Courses</h1>
          </div>
          <div className="mt-6">
            {session?.user.role.name == "Teacher" && (
              <AddCourseModal isNew={isNew} setIsNew={setIsNew} />
            )}
          </div>
          <div className="mt-6">
            {/* {statusCode == 401 && <SigninToContinue />} */}
            <div className="my-2" />
            {statusCode == 200 ? (
              <Table columns={columns} data={courses} />
            ) : (
              <Loading />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

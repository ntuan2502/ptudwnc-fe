import { useEffect, useState } from "react";
import AddCourseModalSelectBox from "./AddCourseModalSelectBox";
import { useSession } from "next-auth/react";
import { getApiUrl } from "../lib/Utils";

export default function AddCourseModal({ isNew, setIsNew }) {
  const [selectedClassroom, setSelectedClassroom] = useState();
  const [classrooms, setClassrooms] = useState();

  const [selectedSubject, setSelectedSubject] = useState();
  const [subjects, setSubjects] = useState();

  const [selectedProgram, setSelectedProgram] = useState();
  const [programs, setPrograms] = useState();

  const [selectedYear, setSelectedYear] = useState();
  const [years, setYears] = useState();

  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (
      selectedClassroom &&
      selectedSubject &&
      selectedProgram &&
      selectedYear
    ) {
      const json = {
        name:
          selectedClassroom.name +
          "_" +
          selectedSubject.name +
          "_" +
          selectedProgram.name +
          "_" +
          selectedYear.name,
        classroom: selectedClassroom.id,
        subject: selectedSubject.id,
        program: selectedProgram.id,
        year: selectedYear.id,
      };

      const res = await fetch(getApiUrl() + "/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
        body: JSON.stringify(json),
      });
      const data = await res.json();
      console.log(res);
      if (res.ok && data) {
        setOpen(false);
        setIsNew(!isNew);
        setSelectedClassroom(null);
        setSelectedProgram(null)
        setSelectedSubject(null)
        setSelectedYear(null)
        return data;
      } else {
        console.log("Add Course failed!");
        return null;
      }
    } else {
      console.log("Null field");
      return null;
    }
  };

  useEffect(async () => {
    const classrooms = await fetch(getApiUrl() + "/classrooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    });
    const classroomsData = await classrooms.json();
    setClassrooms(classroomsData);

    const subjects = await fetch(getApiUrl() + "/subjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    });
    const subjectsData = await subjects.json();
    setSubjects(subjectsData);

    const programs = await fetch(getApiUrl() + "/programs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    });
    const programsData = await programs.json();
    setPrograms(programsData);

    const years = await fetch(getApiUrl() + "/years", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    });
    const yearsData = await years.json();
    setYears(yearsData);
    return () => {
      console.log("Clean");
    };
  }, []);

  return (
    <div>
      {open && (
        <div
          className="py-24 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
          id="modal"
        >
          <div
            role="alert"
            className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
          >
            <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
              <div className="w-full flex justify-start text-gray-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-wallet"
                  width={52}
                  height={52}
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                  <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                </svg>
              </div>
              <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                Add Course
              </h1>

              <AddCourseModalSelectBox
                selected={selectedClassroom}
                setSelected={setSelectedClassroom}
                data={classrooms}
                name="Classroom"
              />
              <AddCourseModalSelectBox
                selected={selectedSubject}
                setSelected={setSelectedSubject}
                data={subjects}
                name="Subject"
              />
              <AddCourseModalSelectBox
                selected={selectedProgram}
                setSelected={setSelectedProgram}
                data={programs}
                name="Program"
              />
              <AddCourseModalSelectBox
                selected={selectedYear}
                setSelected={setSelectedYear}
                data={years}
                name="Year"
              />

              <div className="mt-5 flex items-center justify-start w-full">
                <button
                  onClick={handleSubmit}
                  className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                >
                  Submit
                </button>
                <button
                  className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
              <div
                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Close"
                  className="icon icon-tabler icon-tabler-x"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        onClick={handleClickOpen}
      >
        Add Course
      </button>
    </div>
  );
}

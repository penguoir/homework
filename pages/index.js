import useSWR from "swr";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const IndexPage = () => {
  const { data, error } = useSWR("/api/assignments", fetcher);

  if (!data) {
    return "";
  }

  let assignments = [];
  data.allCourses.forEach((course) => {
    course.assignmentsConnection.nodes.forEach((assignment) => {
      assignments.push({
        ...assignment,
        course,
      });
    });
  });

  let futureAssignments = assignments.filter((x) =>
    dayjs(x.dueAt).isAfter(new Date())
  );
  let pastAssignments = assignments.filter((x) =>
    dayjs(x.dueAt).isBefore(new Date())
  );

  // sort assignments by date
  futureAssignments = futureAssignments.sort((a, b) =>
    dayjs(a.dueAt).isBefore(dayjs(b.dueAt)) ? 1 : -1
  );

  pastAssignments = pastAssignments.sort((a, b) =>
    dayjs(a.dueAt).isBefore(dayjs(b.dueAt)) ? 1 : -1
  );

  return (
    <>
      <main className="w-full">
        <div className="max-w-4xl mx-auto px-4 my-16">
          <h1 className="text-xl font-bold mb-4">Ori's Homework</h1>

          <ul className="">
            {futureAssignments.map((assignment) => (
              <li className="flex justify-between" key={assignment.id}>
                <div>{assignment.name}</div>
                <div className="text-gray-400">
                  {dayjs(assignment.dueAt).fromNow()}
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 mb-3 font-bold">Past assignments</h2>
          <ul className="">
            {pastAssignments.map((assignment) => (
              <li className="flex justify-between" key={assignment.id}>
                <div>{assignment.name}</div>
                <div className="text-gray-400">
                  {dayjs(assignment.dueAt).fromNow()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default IndexPage;

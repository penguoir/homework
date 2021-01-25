import useSWR from "swr";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import Assignment from '../components/assignment'

dayjs.extend(relativeTime);
dayjs.extend(calendar);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const IndexPage = () => {
  const { data, error } = useSWR("/api/assignments", fetcher);

  if (!data) {
    return "";
  }

  if (error) {
    return JSON.stringify(error);
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

  // Split into two lists
  let futureAssignments = assignments.filter((x) =>
    dayjs(x.dueAt).isAfter(new Date())
  );
  let pastAssignments = assignments.filter((x) =>
    dayjs(x.dueAt).isBefore(new Date())
  );

  // sort assignments by date
  futureAssignments = futureAssignments.sort((a, b) =>
    dayjs(a.dueAt).isAfter(dayjs(b.dueAt)) ? 1 : -1
  );

  pastAssignments = pastAssignments.sort((a, b) =>
    dayjs(a.dueAt).isBefore(dayjs(b.dueAt)) ? 1 : -1
  );

  return (
    <>
      <main className="w-full">
        <div className="max-w-4xl mx-auto px-4 my-16">
          <h2 className="mt-8 mb-5 border-b pb-3 font-bold text-lg">Upcoming assignments</h2>
          <ul>
            {futureAssignments.map(x => <Assignment {...x} />)}
          </ul>

          <h2 className="mt-16 mb-5 border-b pb-3 font-bold text-lg">Past assignments</h2>
          <ul className="">
            {pastAssignments.map(x => <Assignment {...x} />)}
          </ul>
        </div>
      </main>
    </>
  );
};

export default IndexPage;

import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import { firestore } from "../lib/firebase";

dayjs.extend(relativeTime);
dayjs.extend(calendar);

const formatCourseName = (name) => {
  name = name.replace(/Year 13/, "");
  name = name.replace(/\(.*\)/, "");
  name = name.replace(/[ \t]+$/, "");
  name = name.replace(/^\s+/, "");
  name = name.replace(/\s+$/, "");

  const map = {
    "Maths with Lewis": "Lewis",
    "Physics with Peter and Laura": "Physics",
    "Further Maths with Pany": "Pany",
    "Maths with Jeff": "Stats and Mechanics",
    "Further Maths with Jeff": "Further Mechanics"
  }

  return map[name] || name;
};

const date = new Date()
const color = (due) => {
  const days = (date - dayjs(due)) / 1000 / 60 / 60 / 24

  if (days < -7) {
    return "green-100"
  }

  if (days < -5) {
    return "yellow-100"
  }

  if (days < 0) {
    return "red-100"
  }

  return "gray-100"
}

const Assignment = ({
  id,
  htmlUrl,
  name,
  dueAt,
  submissionsConnection,
  wont_do,
  course,
  expectsSubmission,
}) => {

  const toggleDoing = () => {
    firestore.collection('metadata').doc(id).set({ wont_do: !wont_do })
    wont_do = !wont_do
  }

  return (
    <li key={id} className="grid grid-cols-12 mb-4">
      <div className="col-span-8">
        <div className="flex flex-wrap items-baseline">
          <a
            href={htmlUrl}
            className="text-gray-900 hover:underline mr-2"
            title={`Go to Canvas assignment for ${name}`}
          >
            {name}
          </a>

          <a onClick={toggleDoing} className="text-gray-200 duration-300 transition-color hover:text-indigo-600 text-sm cursor-pointer">
            { wont_do ? "Unmark" : "Mark as won't do" }
          </a>
        </div>

{!expectsSubmission && (
  <div className="text-green-500">
    Does not expect submission.
  </div>
)}

        {submissionsConnection.nodes.length > 0 && (
          <div className="text-green-500">
            Submitted{" "}
            {dayjs(submissionsConnection.nodes[0].createdAt).fromNow()}
          </div>
        )}

        {wont_do && (
          <div className="text-green-500">
            Won't do
          </div>
        )}
      </div>
      <div className="col-span-4 text-right text-gray-400">
        <span className={"bg-" + color(dueAt)}>due {dayjs(dueAt).calendar()}</span>
        <br />
        {formatCourseName(course.name)}
      </div>
    </li>
  );
};

export default Assignment;

import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(relativeTime);
dayjs.extend(calendar);

const formatCourseName = (name) => {
  name = name.replace(/Year 13/, "");
  name = name.replace(/\(.*\)/, "");
  name = name.replace(/[ \t]+$/, "");
  return name;
};

const Assignment = ({
  id,
  htmlUrl,
  name,
  dueAt,
  submissionsConnection,
  course,
}) => {
  return (
    <li key={id} className="grid grid-cols-12 mb-4">
      <div className="col-span-8">
        <a
          href={htmlUrl}
          className="text-gray-900 hover:underline"
          title={`Go to Canvas assignment for ${name}`}
        >
          {name}
        </a>

        {submissionsConnection.nodes.length > 0 && (
          <div className="text-green-500">
            Submitted{" "}
            {dayjs(submissionsConnection.nodes[0].createdAt).fromNow()}
          </div>
        )}
      </div>
      <div className="col-span-4 text-right text-gray-400">
        due {dayjs(dueAt).calendar()}
        <br />
        {formatCourseName(course.name)}
      </div>
    </li>
  );
};

export default Assignment;

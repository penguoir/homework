import { request, gql, GraphQLClient } from "graphql-request";

const CANVAS_AUTH_CODE = process.env.CANVAS_AUTH_CODE; 
const CANVAS_ENDPOINT = "https://kingalfred.instructure.com/api/graphql";

const canvas_client = new GraphQLClient(CANVAS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${CANVAS_AUTH_CODE}`,
  },
});

const canvas_query = gql`
  {
    allCourses {
      id
      name
      assignmentsConnection {
        nodes {
          id
          name
          dueAt
          htmlUrl
          expectsSubmission

          submissionsConnection {
            nodes {
              attempt
              createdAt
              id
            }
          }
        }
      }
    }
  }
`;

const FAUNA_SECRET = process.env.FAUNA_SECRET

module.exports = async (req, res) => {
  const data = await canvas_client.request(canvas_query);
  res.send(data);
};

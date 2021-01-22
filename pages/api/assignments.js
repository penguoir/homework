import { request, gql, GraphQLClient } from "graphql-request";

const AUTH_CODE = process.env.AUTH_CODE; 
const ENDPOINT = "https://kingalfred.instructure.com/api/graphql";

const client = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization: `Bearer ${AUTH_CODE}`,
  },
});

const query = gql`
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
        }
      }
    }
  }
`;

module.exports = async (req, res) => {
  const data = await client.request(query);
  res.send(data);
};

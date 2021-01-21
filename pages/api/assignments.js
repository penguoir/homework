import { request, gql, GraphQLClient } from "graphql-request";

const AUTH_CODE =
  "3088~MSfd0s6Yns1yyhSCcTbcRFbJhNwhWs2MPQwjQComCxmhz3mqegoEjDPdIlETLXdc";
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
        }
      }
    }
  }
`;

module.exports = async (req, res) => {
  const data = await client.request(query);
  res.send(data);
};

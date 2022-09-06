
import { gql, GraphQLClient } from 'graphql-request';

const RESTORE_ACCESS_TOKEN = gql`
mutation restoreAccessToken {
  restoreAccessToken {
    accessToken
  }
}
`;

export async function getAccessToken() {
try {
  const graphQLClient = new GraphQLClient(
    "https://recipemaker.shop/graphql",
    { credentials: "include" }
  );
  const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
  const newAccessToken = result.restoreAccessToken.accessToken;
  return newAccessToken;
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}
}

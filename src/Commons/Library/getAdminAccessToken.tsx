import { gql, GraphQLClient } from "graphql-request";

const RESTORE_ADMIN_ACCESS_TOKEN = gql`
  mutation restoreAdminAccessToken {
    restoreAdminAccessToken
  }
`;

export async function getAdminAccessToken() {
  try {
    const graphQLClient = new GraphQLClient(
      "https://recipemaker.shop/graphql",
      {
        credentials: "include",
      }
    );
    const result = await graphQLClient.request(RESTORE_ADMIN_ACCESS_TOKEN);

    const newAdminAccessToken: string = result.restoreAdminAccessToken;
    return newAdminAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  IQuery,
  IQueryFetchBlockUsersArgs,
} from "../../../../Commons/Types/Generated/types";
import AdminBlocksUI from "./AdminBlocks.presenter";
import { FETCH_BLOCK_USERS } from "./AdminBlocks.queries";

export default function AdminBlocks() {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery<
    Pick<IQuery, "fetchBlockUsers">,
    IQueryFetchBlockUsersArgs
  >(FETCH_BLOCK_USERS, {
    variables: { page },
  });

  return <AdminBlocksUI page={page} data={data} />;
}

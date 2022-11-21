import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  IQuery,
  IQueryFetchDogsArgs,
} from "../../../../Commons/Types/Generated/types";
import AdminDogsUI from "./AdminDogs.presenter";
import { FETCH_DOGS } from "./AdminDogs.queries";

export default function AdminDogs() {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery<Pick<IQuery, "fetchDogs">, IQueryFetchDogsArgs>(
    FETCH_DOGS,
    {
      variables: { page },
    }
  );

  return <AdminDogsUI page={page} data={data} />;
}

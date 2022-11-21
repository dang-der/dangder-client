import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  IQuery,
  IQueryFetchReportsArgs,
} from "../../../../Commons/Types/Generated/types";
import AdminReportsUI from "./AdminReports.presenter";
import { FETCH_REPORTS } from "./AdminReports.queries";

export default function AdminReports() {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery<
    Pick<IQuery, "fetchReports">,
    IQueryFetchReportsArgs
  >(FETCH_REPORTS, {
    variables: { page },
  });

  return <AdminReportsUI data={data} />;
}

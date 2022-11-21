import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  IQuery,
  IQueryFetchPaymentsArgs,
} from "../../../../Commons/Types/Generated/types";
import AdminPaymentsUI from "./AdminPayments.presenter";
import { FETCH_PAYMENTS } from "./AdminPayments.queries";

export default function AdminPayments() {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery<
    Pick<IQuery, "fetchPayments">,
    IQueryFetchPaymentsArgs
  >(FETCH_PAYMENTS, {
    variables: { page },
  });

  return <AdminPaymentsUI page={page} data={data} />;
}

import { useMutation } from "@apollo/client";

import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import { snackBarState } from "../../../../Commons/Store/Modal/SnackBarState";
import { reportContentsState } from "../../../../Commons/Store/Report/Report";
import {
  IMutation,
  IMutationCreateReportArgs,
} from "../../../../Commons/Types/Generated/types";
import Page from "../../../Commons/PageStack/Page";
import PageStack from "../../../Commons/PageStack/PageStack";
import { CREATE_REPORT } from "../Report.queries";
import DogReportCauseUI from "../reportCause/DogReportCause.presenter";
import DogReportUI from "./DogReport.presenter";

export default function DogReport() {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [reportContents, setReportContents] =
    useRecoilState(reportContentsState);
  const [, setSnackBar] = useRecoilState(snackBarState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const [createReport] = useMutation<
    Pick<IMutation, "createReport">,
    IMutationCreateReportArgs
  >(CREATE_REPORT);

  const handleClickNext = async () => {
    if (currentPageIndex === 1) {
      try {
        const result = await createReport({
          variables: {
            userId: String(router.query.id),
            targetId: String(router.query.targetId),
            reportContent: reportContents,
          },
        });

        if (!result.data?.createReport.id)
          throw Error("신고 접수에 실패했습니다. 관리자에게 문의해주세요.");

        setSnackBar({
          visible: true,
          message: "신고 내용이 정상적으로 접수되었습니다.",
        });

        router.back();

      } catch (e) {
        if (e instanceof Error) {
          setExceptionModal({
            visible: true,
            message: e.message,
          });
        }
      }
      return;
    }
    setCurrentPageIndex((p) => p + 1);
  };

  const handleChangeReport = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReportContents(e.target.value);
  };

  return (
    <>
      <PageStack currentPageIndex={currentPageIndex}>
        <Page>
          <DogReportUI handleClickNext={handleClickNext} />
        </Page>

        <Page>
          <DogReportCauseUI
            handleNextPage={handleClickNext}
            onChange={handleChangeReport}
          />
        </Page>
      </PageStack>
    </>
  );
}

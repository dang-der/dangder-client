import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import { reviewInputState } from "../../../../Commons/Store/Review/Review";
import {
  IMutation,
  IMutationCreateReviewArgs,
  IQuery,
  IQueryFetchOneDogArgs,
} from "../../../../Commons/Types/Generated/types";
import { FETCH_ONE_DOG } from "../../Chat/Chat.queries";
import { CREATE_REVIEW, FETCH_REVIEW_DETAILS } from "../Review.queries";
import ReviewWriteUI from "./ReviewWrite.presenter";

export default function ReviewWriteContainer() {
  const router = useRouter();
  const [reviewInput] = useRecoilState(reviewInputState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const { data: reviewDetailsData } =
    useQuery<Pick<IQuery, "fetchReviewDetails">>(FETCH_REVIEW_DETAILS);

  const { data: receiverData } = useQuery<
    Pick<IQuery, "fetchOneDog">,
    IQueryFetchOneDogArgs
  >(FETCH_ONE_DOG, { variables: { id: String(router.query.receive) } });

  const [createReview] = useMutation<
    Pick<IMutation, "createReview">,
    IMutationCreateReviewArgs
  >(CREATE_REVIEW);

  const handleCreateReview = async () => {
    const send = String(router.query.send);
    const receive = String(router.query.receive);

    try {
      if (!send || !receive)
        throw Error("정보를 알 수 없습니다. 다시 시도해 주세요.");

      const result = await createReview({
        variables: {
          createReviewInput: {
            sendReview: send,
            receiveReviewId: receive,
            reviewMessage: reviewInput.message,
            reviewDetail: reviewInput.details,
          },
        },
      });

      if (!result.data?.createReview.id)
        throw Error("리뷰 등록에 실패했습니다. 관리자에게 문의해주세요.");

      router.back();
    } catch (e) {
      if (e instanceof Error) {
        setExceptionModal({
          visible: true,
          message: e.message,
        });
      }
    }
  };

  return (
    <>
      {receiverData?.fetchOneDog && (
        <ReviewWriteUI
          receiver={receiverData.fetchOneDog}
          details={reviewDetailsData}
          handleCreateReview={handleCreateReview}
        />
      )}
    </>
  );
}

import { MouseEvent, ReactNode } from "react";
import { useRecoilState } from "recoil";
import {
  exceptionModalState,
  passBuyModalVisibleState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import CustomLayoutModal from "../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import BlueButton from "../../Commons/Button/BlueButton";
import * as S from "./BuyPassTicketModal.style";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreatePaymentArgs,
} from "../../../Commons/Types/Generated/types";
import { CREATE_PAYMENT } from "./Payment.queries";
import { FETCH_LOGIN_USER_IS_CERT } from "../Detail/DogDetail.queries";
import Script from "next/script";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";

declare const window: typeof globalThis & {
  IMP: any;
};

interface BuyPassTicketModalProps {
  title: string;
  icon: ReactNode;
  redirectUrl: string;
  onSuccess?: () => void;
}

export default function BuyPassTicketModal({
  title,
  icon,
  redirectUrl,
  onSuccess,
}: BuyPassTicketModalProps) {
  const [visible, setVisible] = useRecoilState(passBuyModalVisibleState);
  const [userInfo] = useRecoilState(userInfoState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const [createPayment] = useMutation<
    Pick<IMutation, "createPayment">,
    IMutationCreatePaymentArgs
  >(CREATE_PAYMENT);

  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    if (typeof visible === "boolean") {
      setVisible(visible);
      return;
    }
    if (!visible) setVisible((p) => !p);
  };

  const onClickBuyPassTicket = () => {
    const amount = 100;
    const IMP = window.IMP;
    IMP.init("imp70467342");

    IMP.request_pay(
      {
        pg: "nice",
        pay_method: "card",
        name: "댕더 패스 구매",
        amount,
        buyer_name: userInfo?.dog?.name || "",
        buyer_email: userInfo?.user?.email || "",
        m_redirect_url: redirectUrl,
      },
      async (rsp: any) => {

        setVisible(false);

        if (rsp.success) {
          try {
            const { data } = await createPayment({
              variables: {
                impUid: rsp.imp_uid,
                payMoney: amount,
              },
              refetchQueries: [{ query: FETCH_LOGIN_USER_IS_CERT }],
            });

            if (!onSuccess) return;
            onSuccess();
          } catch (e) {
            if (e instanceof Error) {
              setExceptionModal({
                visible: true,
                message: e.message,
              });
            }
          }
        } else {
          setExceptionModal({
            visible: true,
            message: "결제에 실패했습니다. <br/> 다시 시도해주세요.",
          });
        }
      }
    );
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      ></Script>

      <Script
        type="text/javascript"
        src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
      ></Script>

      <CustomLayoutModal toggleModalVisible={toggleModal} visible={visible}>
        <S.Wrapper>
          {icon}

          <S.CautionText
            dangerouslySetInnerHTML={{ __html: title }}
          ></S.CautionText>

          <S.CautionText>댕더 패스를 구매하시겠습니까?</S.CautionText>

          <S.SubCautionText>
            구매한 댕더패스는 한 달간 이용이 <br />
            가능합니다.
            <br />한 달 4900KRW
          </S.SubCautionText>

          <S.BuyButtonWrapper>
            <BlueButton
              title="구매하기"
              onClick={onClickBuyPassTicket}
              style={{ fontSize: "0.875rem", width: "100%" }}
            />
          </S.BuyButtonWrapper>
        </S.Wrapper>
      </CustomLayoutModal>
    </>
  );
}

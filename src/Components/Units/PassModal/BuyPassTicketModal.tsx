import { MouseEvent } from "react";

import { useRecoilState, useResetRecoilState } from "recoil";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

import {
  exceptionModalState,
  passBuyModalVisibleState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import CustomLayoutModal from "../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import BlueButton from "../../Commons/Button/BlueButton";
import * as S from "./BuyPassTicketModal.style";
import Head from "next/head";
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

export default function BuyPassTicketModal() {
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
    console.log("onClickBuyPassTicket");
    const amount = 100;
    const IMP = window.IMP;
    IMP.init("imp70467342");

    IMP.request_pay(
      {
        pg: "nice",
        pay_method: "card",
        name: "댕더 패스 구매",
        amount,
        buyer_email: userInfo?.user?.email || "",
        m_redirect_url: "https://dangder.shop:3000/chat",
      },
      async (rsp: any) => {
        console.log(rsp);

        if (rsp.success) {
          try {
            const { data } = await createPayment({
              variables: {
                impUid: rsp.imp_uid,
                payMoney: amount,
              },
              refetchQueries: [{ query: FETCH_LOGIN_USER_IS_CERT }],
            });

            setVisible(false);
            if (!data?.createPayment.id)
              throw Error("결제에 실패했습니다. 다시 시도해주세요.");
          } catch (e) {
            console.log("createPaymentError", e);
            if (e instanceof Error) {
              setExceptionModal({
                visible: true,
                message: "결제에 실패했습니다. <br/> 다시 시도해주세요.",
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
          <CampaignRoundedIcon />

          <S.CautionText>
            먼저 말을 걸기 위해서 <br />
            댕더 패스 구매가 필요해요!
            <br />
          </S.CautionText>

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

import { MouseEvent, useEffect } from "react";

import { useRecoilState, useResetRecoilState } from "recoil";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

import {
  exceptionModalState,
  passBuyModalVisibleState,
  selectedDogIdBuyPassState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import CustomLayoutModal from "../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import BlueButton from "../../Commons/Button/BlueButton";
import * as S from "./BuyPassTicketModal.style";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationCreatePaymentArgs,
  IMutationJoinChatRoomArgs,
  IQuery,
} from "../../../Commons/Types/Generated/types";
import { CREATE_PAYMENT } from "./Payment.queries";
import {
  FETCH_LOGIN_USER_IS_CERT,
  JOIN_CHAT_ROOM,
} from "../Detail/DogDetail.queries";
import Script from "next/script";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import { useRouter } from "next/router";
import { snackBarState } from "../../../Commons/Store/Modal/SnackBarState";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function BuyPassTicketModal() {
  const router = useRouter();

  const [seletedDogId, setSelectedDogId] = useRecoilState(
    selectedDogIdBuyPassState
  );
  const [visible, setVisible] = useRecoilState(passBuyModalVisibleState);
  const [userInfo] = useRecoilState(userInfoState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [, setSnackBar] = useRecoilState(snackBarState);

  const { data: isCertData } = useQuery<Pick<IQuery, "fetchLoginUserIsCert">>(
    FETCH_LOGIN_USER_IS_CERT
  );

  const [createPayment] = useMutation<
    Pick<IMutation, "createPayment">,
    IMutationCreatePaymentArgs
  >(CREATE_PAYMENT);

  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

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
        name: "?????? ?????? ??????",
        amount,
        buyer_name: userInfo?.dog?.name || "",
        buyer_email: userInfo?.user?.email || "",
        m_redirect_url: "https://dangder.shop:3000/chat",
      },
      async (rsp: any) => {
        console.log(rsp);

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

            setVisible(false);
            if (!data?.createPayment.id)
              throw Error("????????? ??????????????????. ?????? ??????????????????.");

            const { data: joinChatData } = await joinChatRoom({
              variables: {
                dogId: userInfo?.dog?.id || "",
                chatPairId: seletedDogId,
              },
            });

            const roomId = joinChatData?.joinChatRoom.id;
            if (!roomId) throw Error("???????????? ????????? ??? ????????????.");

            setSnackBar({
              visible: true,
              message: "?????? ??????! ??????????????? ???????????????.",
            });

            router.replace(`/chat/${roomId}`);
          } catch (e) {
            console.log("createPaymentError", e);
            setVisible(false);
            if (e instanceof Error) {
              setExceptionModal({
                visible: true,
                message: e.message,
              });
            }
          } finally {
            setSelectedDogId("");
          }
        } else {
          setExceptionModal({
            visible: true,
            message: "????????? ??????????????????. <br/> ?????? ??????????????????.",
          });
          setSelectedDogId("");
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
            ?????? ?????? ?????? ????????? <br />
            ?????? ?????? ????????? ????????????!
            <br />
          </S.CautionText>

          <S.CautionText>?????? ????????? ?????????????????????????</S.CautionText>

          <S.SubCautionText>
            ????????? ??????????????? ??? ?????? ????????? <br />
            ???????????????.
            <br />??? ??? 4900KRW
          </S.SubCautionText>

          <S.BuyButtonWrapper>
            <BlueButton
              title="????????????"
              onClick={onClickBuyPassTicket}
              style={{ fontSize: "0.875rem", width: "100%" }}
            />
          </S.BuyButtonWrapper>
        </S.Wrapper>
      </CustomLayoutModal>
    </>
  );
}

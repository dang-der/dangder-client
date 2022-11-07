import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  passBuyModalVisibleState,
  PassTickModalVisible,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import {
  IQuery,
  IQueryFetchMyDogArgs,
} from "../../../Commons/Types/Generated/types";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";
import DogProfilePageUI from "./DogProfilePage.presenter";
import {
  FETCH_LOGIN_USER_IS_CERT,
  FETCH_MY_DOG,
} from "./DogProfilePage.queries";
import PassTickModal from "./PassTicketModal/PassTicketModal";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

export default function DogProfilePage() {
  const [userInfo] = useRecoilState(userInfoState);
  const [passTicketVisible, setPassTicketVisible] =
    useRecoilState(PassTickModalVisible);
  const [buyPassModalVisible, setBuyPassModalVisible] = useRecoilState(
    passBuyModalVisibleState
  );

  const { data: userIsCert } = useQuery<Pick<IQuery, "fetchLoginUserIsCert">>(
    FETCH_LOGIN_USER_IS_CERT
  );

  const { data: myDogData } = useQuery<
    Pick<IQuery, "fetchMyDog">,
    IQueryFetchMyDogArgs
  >(FETCH_MY_DOG, {
    variables: { userId: userInfo?.user?.id || "" },
    fetchPolicy: "cache-and-network",
  });

  const checkUserIsCert = () => {
    if (!userIsCert?.fetchLoginUserIsCert) {
      setBuyPassModalVisible(true);
      return;
    }

    setPassTicketVisible(true);
  };

  return (
    <>
      {passTicketVisible && <PassTickModal />}
      {buyPassModalVisible && (
        <BuyPassTicketModal
          title="댕더패스가 아직 없으시네요! <br/> 댕더패스를 사용하면 <br/> 더 자유롭게 친구를 만날 수 있어요!"
          icon={<CampaignRoundedIcon />}
          redirectUrl="https://danger.shop/profile"
        />
      )}
      <DogProfilePageUI
        myDogData={myDogData?.fetchMyDog}
        handleClickPassTicket={checkUserIsCert}
      />
    </>
  );
}

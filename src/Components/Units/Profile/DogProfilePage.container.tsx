import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import { passBuyModalVisibleState } from "../../../Commons/Store/Modal/ModalVisibleState";
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

export default function DogProfilePage() {
  const [userInfo] = useRecoilState(userInfoState);
  const [passTicketVisible, setPassTicketVisible] = useState(false);
  const [passVisible, setVisibleBuyPass] = useRecoilState(
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

  const handlePassTicket = () => {
    if (!userIsCert?.fetchLoginUserIsCert) {
      // setVisibleBuyPass(true);
      setPassTicketVisible(true);
      // return;
      // setPassTicketVisible(true);
    }
  };

  console.log("MyDogPage", myDogData);

  return (
    <>
      {passTicketVisible && <PassTickModal />}
      {passVisible && <BuyPassTicketModal />}
      <DogProfilePageUI
        myDogData={myDogData?.fetchMyDog}
        handlePassTicket={handlePassTicket}
      />
    </>
  );
}

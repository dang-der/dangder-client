import { DimWrapper } from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import * as S from "./PassTicketModal.styles";
import { useRecoilState } from "recoil";
import { PassTickModalVisible } from "../../../../Commons/Store/Modal/ModalVisibleState";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { FETCH_PASS_TICKET } from "../DogProfilePage.queries";
import {
  IQuery,
  IQueryFetchPassTicketArgs,
} from "../../../../Commons/Types/Generated/types";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import moment from "moment";

const DeepDimWrapper = styled(DimWrapper)`
  background-color: #000000e5;
`;

export default function PassTickModal() {
  const [, setVisible] = useRecoilState(PassTickModalVisible);
  const [userInfo] = useRecoilState(userInfoState);

  const { data: fetchPassTicketData } = useQuery<
    Pick<IQuery, "fetchPassTicket">,
    IQueryFetchPassTicketArgs
  >(FETCH_PASS_TICKET, {
    variables: {
      email: userInfo?.user?.email || "",
    },
  });

  const onClickClose = () => {
    setVisible(false);
  };

  return (
    <>
      <DeepDimWrapper>
        <S.CloseIconWrapper onClick={onClickClose}>
          <CloseRoundedIcon />
        </S.CloseIconWrapper>
        <S.Wrapper>
          <S.InfoWrapper>
            <S.TextWrapper>EMAIL</S.TextWrapper>
            <S.TextWrapper>{userInfo?.user?.email || ""}</S.TextWrapper>

            <S.TextWrapper>NAME</S.TextWrapper>
            <S.TextWrapper>{userInfo?.dog?.name}</S.TextWrapper>

            <S.TextWrapper>AGE</S.TextWrapper>
            <S.TextWrapper>{userInfo?.dog?.age}</S.TextWrapper>

            <S.TextWrapper>PERIOD OF USE</S.TextWrapper>
            <S.TextWrapper>
              {moment(fetchPassTicketData?.fetchPassTicket.createdAt).format(
                "YYYY.MM.DD"
              ) +
                " ~ " +
                moment(fetchPassTicketData?.fetchPassTicket.expiredAt).format(
                  "YYYY.MM.DD"
                )}
            </S.TextWrapper>
          </S.InfoWrapper>
          <S.TextWrapper style={{ marginTop: "2rem" }}>
            WELCOME! THANK YOU TO THE
            <br /> SPECIAL MEMBER OF DANGDER
          </S.TextWrapper>
          <S.TextWrapper style={{ marginTop: "2rem" }}>
            DANGDER PASS
          </S.TextWrapper>
        </S.Wrapper>
      </DeepDimWrapper>
    </>
  );
}

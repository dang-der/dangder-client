import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";

import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import * as S from "./DeleteUserModal.styles";
import CustomLayoutModal from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import { useRouter } from "next/router";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteUserArgs,
  IQuery,
  IQueryFetchUserArgs,
} from "../../../../Commons/Types/Generated/types";
import { DELETE_USER, FETCH_LOGIN_USER, FETCH_USER } from "../Settings.queries";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { useRecoilState } from "recoil";

interface DeleteUserModalProps {
  title: string;
  subTitle?: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
export default function DeleteUserModal({
  title,
  subTitle,
  visible,
  setVisible,
}: DeleteUserModalProps) {
  const router = useRouter();
  const client = useApolloClient();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [deleteUser] = useMutation<
    Pick<IMutation, "deleteUser">,
    IMutationDeleteUserArgs
  >(DELETE_USER);
  const { data: loginData } =
    useQuery<Pick<IQuery, "fetchLoginUser">>(FETCH_LOGIN_USER);
  const { data: userData } = useQuery<
    Pick<IQuery, "fetchUser">,
    IQueryFetchUserArgs
  >(FETCH_USER, {
    variables: { email: String(router.query.dogId) },
  });

  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    if (typeof visible === "boolean") {
      setVisible(visible);
      return;
    }
    if (!visible) setVisible((p) => !p);
  };

  // console.log("fetchUser", data?.fetchUser);
  const onClickDeleteUser = async (email: string | any) => {
    if (!userInfo) return;

    try {
      const { data } = await deleteUser({
        variables: {
          email: userInfo?.email,
        },
      });
      console.log("onClickDeleteUser", data);
      router.push("/auth/login");
    } catch (e) {
      // console.log("onClickDeleteUserError", e);
      // router.push("/auth/login");
    }
    // router.push("/auth/login");
  };

  return (
    <CustomLayoutModal toggleModalVisible={toggleModal} visible={visible}>
      <S.Wrapper>
        <S.IconWrapper>
          <ErrorRoundedIcon />
        </S.IconWrapper>

        <S.CautionText dangerouslySetInnerHTML={{ __html: title }} />

        <S.SubCautionText
          dangerouslySetInnerHTML={{ __html: subTitle || "" }}
        />
        <S.DeleteButton onClick={onClickDeleteUser}>계정삭제</S.DeleteButton>
      </S.Wrapper>
    </CustomLayoutModal>
  );
}

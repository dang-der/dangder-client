import { Dispatch, MouseEvent, SetStateAction } from "react";

import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import * as S from "./DeleteUserModal.styles";
import CustomLayoutModal from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteUserArgs,
  IQuery,
  IQueryFetchUserArgs,
} from "../../../../Commons/Types/Generated/types";
import {
  DELETE_USER,
  FETCH_LOGIN_USER,
  FETCH_USER,
  USER_LOG_OUT,
} from "../Settings.queries";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { useRecoilState } from "recoil";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";

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

  const [userInfo] = useRecoilState(userInfoState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const [userLogout] = useMutation<Pick<IMutation, "userLogout">>(USER_LOG_OUT);
  const [deleteUser] = useMutation<
    Pick<IMutation, "deleteUser">,
    IMutationDeleteUserArgs
  >(DELETE_USER);

  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    if (typeof visible === "boolean") {
      setVisible(visible);
      return;
    }
    if (!visible) setVisible((p) => !p);
  };

  // console.log("fetchUser", data?.fetchUser);
  const onClickDeleteUser = async () => {
    if (!userInfo?.user) return;

    try {
      await userLogout();

      const { data } = await deleteUser({
        variables: {
          email: userInfo?.user?.email,
        },
      });
      console.log("onClickDeleteUser", data);
      router.push("/auth/login");
    } catch (e) {
      console.log("onClickDeleteUserError", e);
      if (e instanceof Error) {
        setExceptionModal({ visible: true, message: e.message });
      }
    }
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

import { useMutation, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { dogProfileEditState } from "../../../../Commons/Store/Profile/ProfileEditState";
import {
  IMutation,
  IMutationUpdateDogArgs,
  IMutationUploadFileArgs,
  IQuery,
} from "../../../../Commons/Types/Generated/types";
import {
  FETCH_CHARACTERS,
  FETCH_INTERESTS,
  UPLOAD_FILE,
} from "../Init/InitProfile.queries";
import DogProfileEditUI from "./DogProfileEditPage.presenter";
import _ from "lodash";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import { UPDATE_DOG } from "../DogProfilePage.queries";
import { snackBarState } from "../../../../Commons/Store/Modal/SnackBarState";
import { useRouter } from "next/router";

interface IUpdateDogInput {
  age?: number;
  description?: string;
  interests?: string[];
  characters?: string[];
  img?: string[];
}

export default function DogProfileEditPage() {
  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoState);
  const [inputs] = useRecoilState(dogProfileEditState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [, setSnackBar] = useRecoilState(snackBarState);

  const { data: charactersData } =
    useQuery<Pick<IQuery, "fetchCharacters">>(FETCH_CHARACTERS);

  const { data: interestsData } =
    useQuery<Pick<IQuery, "fetchInterestCategory">>(FETCH_INTERESTS);

  const [uploadFiles] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [updateDog] = useMutation<
    Pick<IMutation, "updateDog">,
    IMutationUpdateDogArgs
  >(UPDATE_DOG);

  const handleUpdateDog = async () => {
    if (!userInfo?.dog) return;

    console.log("프로필 변경", inputs);

    const updateDogInput: IUpdateDogInput = {};

    if (inputs.age !== userInfo?.dog?.age) updateDogInput.age = inputs.age;
    if (inputs.introduce !== userInfo.dog.description)
      updateDogInput.description = inputs.introduce;
    if (
      !_.isEqual(
        inputs.characters,
        userInfo.dog.characters.map((e) => e.character)
      )
    )
      updateDogInput.characters = inputs.characters;

    if (
      !_.isEqual(
        inputs.interests,
        userInfo.dog.interests.map((e) => e.interest)
      )
    )
      updateDogInput.interests = inputs.interests;

    try {
      if (
        !_.isEqual(
          inputs.imageUrls,
          userInfo.dog.img.map((e) => e.img)
        )
      ) {
        const { data: filesData } = await uploadFiles({
          variables: { files: inputs.imageFiles },
        });

        if (!filesData) {
          setExceptionModal({
            visible: true,
            message: "이미지 업로드에 실패했습니다. <br/> 다시 시도해주세요.",
          });
        }

        updateDogInput.img = filesData?.uploadFile;
      }

      const { data: updateDogData } = await updateDog({
        variables: {
          dogId: userInfo.dog.id,
          updateDogInput,
        },
      });

      if (!updateDogData?.updateDog) {
        setExceptionModal({
          visible: true,
          message:
            "댕댕이 정보 수정에 실패했습니다. <br/> 관리자에게 문의해주세요.",
        });
        return;
      }

      setSnackBar({
        visible: true,
        message: "댕댕이 정보 수정 완료!",
      });

      router.push("/profile");
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
      {userInfo?.dog && (
        <DogProfileEditUI
          myDog={userInfo.dog}
          charactersData={charactersData}
          interestsData={interestsData}
          handleUpdateDog={handleUpdateDog}
        />
      )}
    </>
  );
}

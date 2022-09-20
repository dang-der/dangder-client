import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useRecoilState } from "recoil";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";

import { IProfileInputState } from "../../../../Commons/Store/Profile/ProfileInitState";
import {
  IMutation,
  IMutationCreateDogArgs,
  IMutationGetDogInfoArgs,
  IMutationUpdateDogArgs,
  IMutationUploadFileArgs,
  IQuery,
} from "../../../../Commons/Types/Generated/types";
import ErrorModal from "../../../Commons/Modal/ErrorModal/ErrorModal";
import LoadingModal from "../../../Commons/Modal/Loading/LoadingModal";
import InitProfileUI from "./InitProfile.presenter";
import {
  CREATE_DOG,
  FETCH_CHARACTERS,
  FETCH_INTERESTS,
  GET_DOG_INFO,
  UPDATE_DOG,
  UPLOAD_FILE,
} from "./InitProfile.queries";

export default function InitProfileContainer() {
  const router = useRouter();
  const geo = useGeolocation();

  const [regNumErrorVisible, setRegNumErrorVisible] = useState(false);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [userInfo] = useRecoilState(userInfoState);


  const { data: charactersData } =
    useQuery<Pick<IQuery, "fetchCharacters">>(FETCH_CHARACTERS);

  const { data: interestsData } =
    useQuery<Pick<IQuery, "fetchInterests">>(FETCH_INTERESTS);

  const [getDogInfo] = useMutation<
    Pick<IMutation, "getDogInfo">,
    IMutationGetDogInfoArgs
  >(GET_DOG_INFO);

  const [createDog] = useMutation<
    Pick<IMutation, "createDog">,
    IMutationCreateDogArgs
  >(CREATE_DOG);

  const [uploadFiles] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [updateDog] = useMutation<
    Pick<IMutation, "updateDog">,
    IMutationUpdateDogArgs
  >(UPDATE_DOG);

  const handleCheckDogRegisterNumber = async (inputs: any) => {
    console.log("handleCheckDogRegisterNumber", inputs);

    if (
      !inputs.registerNumber ||
      !inputs.ownerBirthYear ||
      !inputs.ownerBirthMonth ||
      !inputs.ownerBirthDay
    ) {
      return false;
    }

    const birth =
      String(inputs.ownerBirthYear).substring(2) +
      String(inputs.ownerBirthMonth).padStart(2, "0") +
      String(inputs.ownerBirthDay).padStart(2, "0");

    try {
      const { data } = await getDogInfo({
        variables: {
          dogRegNum: inputs.registerNumber,
          ownerBirth: birth,
        },
      });

      console.log("getDogInfo", data);
      return true;
    } catch (e) {
      console.log("handleCheckDogRegister", e);
      setRegNumErrorVisible(true);
      return false;
    }
  };

  const handleCreateDog =
    (location: { lat: number; lng: number } | undefined) =>
    async (inputs: IProfileInputState) => {
      console.log("handleCreateDog", router.query);

      const ownerBirth =
        String(inputs.ownerBirthYear).substring(2) +
        String(inputs.ownerBirthMonth).padStart(2, "0") +
        String(inputs.ownerBirthDay).padStart(2, "0");

      const dogBirth =
        String(inputs.dogInput.dogBirthYear) +
        String(inputs.dogInput.dogBirthMonth).padStart(2, "0") +
        String(inputs.dogInput.dogBirthDay).padStart(2, "0");

      const age = moment().diff(moment(dogBirth), "years");

      try {
        const { data: filesData } = await uploadFiles({
          variables: { files: inputs.dogInput.imageFiles },
        });

        if (!filesData) {
          setExceptionModal({
            visible: true,
            message: "이미지 업로드에 실패했습니다. <br/> 다시 시도해주세요.",
          });
          return false;
        }

        if (router.query.init !== "false") {
          const { data: result } = await createDog({
            variables: {
              createDogInput: {
                age: Number(age) || 1,
                description: inputs.dogInput.introduce,
                birthday: dogBirth,
                interests: inputs.dogInput.interests,
                characters: inputs.dogInput.characters,
                avoidBreeds: ["asdfsdf", "불독"],
                locations: {
                  lat: location?.lat || 0,
                  lng: location?.lng || 0,
                },
                img: filesData.uploadFile,
                userId: String(router.query.user || ""),
              },
              dogRegNum: inputs.registerNumber,
              ownerBirth,
            },
          });
          console.log("handleCreateDog", result);
          return !!result?.createDog;
        }

        console.log("CreateDog", userInfo);
        if (!userInfo?.dog) return;

        const { data: result } = await updateDog({
          variables: {
            updateDogInput: {
              age: Number(age) || 1,
              description: inputs.dogInput.introduce,
              birthday: dogBirth,
              interests: inputs.dogInput.interests,
              characters: inputs.dogInput.characters,
              avoidBreeds: ["asdfsdf", "불독"],
              locations: {
                lat: location?.lat || 0,
                lng: location?.lng || 0,
              },
              img: filesData.uploadFile,
              userId: String(router.query.user || ""),
            },
            dogRegNum: inputs.registerNumber,
            ownerBirth,
            dogId: userInfo?.dog?.id,
          },
        });

        console.log("handleUpdateDog", result);
        return !!result?.updateDog;

      } catch (e) {
        console.log("handleClickCreateDog", e);

        if (e instanceof Error) {
          setExceptionModal({
            visible: true,
            message: e.message,
          });
        }
        return false;
      }
    };

  return (
    <>
      <ErrorModal
        title="등록된 댕댕이의 정보를 <br/> 찾을 수 없습니다."
        subTitle="입력한 정보와 등록한 정보가 일치한지 <br/> 다시 확인해주세요."
        visible={regNumErrorVisible}
        setVisible={setRegNumErrorVisible}
      />

      {!geo.latitude && <LoadingModal />}

      {geo.latitude && (
        <InitProfileUI
          selectedData={{
            characters: charactersData,
            interests: interestsData,
          }}
          handleCheckDogRegisterNumber={handleCheckDogRegisterNumber}
          handleCreateDog={handleCreateDog({
            lat: geo.latitude,
            lng: geo.longitude,
          })}
        />
      )}
    </>
  );
}

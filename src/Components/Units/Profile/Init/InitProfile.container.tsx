import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useRecoilState } from "recoil";
import {
  IProfileInputState,
  profileInputState,
} from "../../../../Commons/Store/Profile/ProfileInitState";
import {
  IMutation,
  IMutationCreateDogArgs,
  IMutationGetdoginfoArgs,
  IMutationUploadFileArgs,
  IQuery,
} from "../../../../Commons/Types/Generated/types";
import InitProfileUI from "./InitProfile.presenter";
import {
  CREATE_DOG,
  FETCH_CHARACTERS,
  FETCH_INTERESTS,
  GET_DOG_INFO,
  UPLOAD_FILE,
} from "./InitProfile.queries";

export default function InitProfileContainer() {
  const [inputs] = useRecoilState(profileInputState);

  const geo = useGeolocation();
  const { data: charactersData } =
    useQuery<Pick<IQuery, "fetchCharacters">>(FETCH_CHARACTERS);

  const { data: interestsData } =
    useQuery<Pick<IQuery, "fetchInterests">>(FETCH_INTERESTS);

  const [getDogInfo] = useMutation<
    Pick<IMutation, "getdoginfo">,
    IMutationGetdoginfoArgs
  >(GET_DOG_INFO);

  const [createDog] = useMutation<
    Pick<IMutation, "createDog">,
    IMutationCreateDogArgs
  >(CREATE_DOG);

  const [uploadFiles] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  useEffect(() => {
    console.log("input change", inputs);
  }, [inputs]);

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
          registerNumber: inputs.registerNumber,
          birth,
        },
      });

      console.log("getDogInfo", data);
      return true;
    } catch (e) {
      console.log("handleCheckDogRegister", e);
      return false;
    }
  };

  const handleCreateDog =
    (location: { lat: number; lng: number } | undefined) =>
    async (inputs: IProfileInputState) => {
      console.log("handleCreateDog", inputs);
      console.log("location", location);

      const ownerBirth =
        String(inputs.ownerBirthYear).substring(2) +
        String(inputs.ownerBirthMonth).padStart(2, "0") +
        String(inputs.ownerBirthDay).padStart(2, "0");

      const dogBirth =
        String(inputs.createDogInput.dogBirthYear) +
        String(inputs.createDogInput.dogBirthMonth).padStart(2, "0") +
        String(inputs.createDogInput.dogBirthDay).padStart(2, "0");

      const age = moment().diff(moment(dogBirth), "years");

      try {
        const { data: filesData } = await uploadFiles({
          variables: { files: inputs.createDogInput.imageFiles },
        });
        if (!filesData) {
          // todo : 이미지 등록 실패 다이얼로그 띄우기
          return false;
        }

        const { data: result } = await createDog({
          variables: {
            createDogInput: {
              age: Number(age),
              description: inputs.createDogInput.introduce,
              birthday: dogBirth,
              interests: inputs.createDogInput.interests,
              characters: inputs.createDogInput.characters,
              avoidBreeds: ["asdfsdf", "불독"],
              locations: {
                lat: location?.lat || 0,
                lng: location?.lng || 0,
              },
              img: filesData.uploadFile,
            },
            registerNumber: inputs.registerNumber,
            birth: ownerBirth,
          },
        });
        console.log("handleCreateDog", result);
      } catch (e) {
        console.log("handleClickCreateDog", e);
      }
    };

  return (
    <>
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

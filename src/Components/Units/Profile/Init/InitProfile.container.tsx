import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileInputState } from "../../../../Commons/Store/Profile/ProfileInitState";
import {
  IMutation,
  IMutationGetdoginfoArgs,
} from "../../../../Commons/Types/Generated/types";
import InitProfileUI from "./InitProfile.presenter";
import { GET_DOG_INFO } from "./InitProfile.queries";

export default function InitProfileContainer() {
  const [inputs] = useRecoilState(profileInputState);
  const [getDogInfo] = useMutation<
    Pick<IMutation, "getdoginfo">,
    IMutationGetdoginfoArgs
  >(GET_DOG_INFO);

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
    )
      return false;

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

  return (
    <InitProfileUI
      handleCheckDogRegisterNumber={handleCheckDogRegisterNumber}
    />
  );
}

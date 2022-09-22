import { atom } from "recoil";

export const authModalVisibleState = atom<boolean>({
  key: "authModalState",
  default: false,
});

export const nonmemberModalVisible = atom<boolean>({
  key: "nonmemberModalVisible",
  default: false,
});

export const matchedModalVisibleState = atom<boolean>({
  key: "matchedModalVisible",
  default: false,
});

export const passBuyModalVisibleState = atom<boolean>({
  key: "passBuyModalVisibleState",
  default: false,
});

interface IExceptionModal {
  visible: boolean;
  message: string;
}

export const exceptionModalState = atom<IExceptionModal>({
  key: "exceptionModalState",
  default: {
    visible: false,
    message: "",
  },
});


export const selectedDogIdBuyPassState = atom<string>({
  key: "selectedDogIdBuyPassState",
  default: "",
});

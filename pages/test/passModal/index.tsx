import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { passBuyModalVisibleState } from "../../../src/Commons/Store/Modal/ModalVisibleState";
import BuyPassTicketModal from "../../../src/Components/Units/PassModal/BuyPassTicketModal";

export default function PassModalPage() {
  const [, setVisible] = useRecoilState(passBuyModalVisibleState);

  useEffect(() => {
    setVisible(true);
  }, []);

  return <BuyPassTicketModal />;
}

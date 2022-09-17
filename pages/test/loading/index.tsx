import { useState } from "react";
import LoadingModal from "../../../src/Components/Commons/Modal/Loading/LoadingModal";

export default function LoadingModalPage() {
  const [visible, setVisible] = useState(true);

  return <LoadingModal visible={visible} setVisible={setVisible} />;
}

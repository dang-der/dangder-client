import { useState } from "react";
import ErrorModal from "../../../src/Components/Commons/Modal/ErrorModal/ErrorModal";

export default function ErrorModalPage() {
  const [visible, setVisible] = useState(false);
  return (
    <ErrorModal
      title="등록된 댕댕이의 정보를 <br/> 찾을 수 없습니다."
      subTitle="입력한 정보와 등록한 정보가 일치한지 <br/> 다시 확인해주세요."
      visible={visible}
      setVisible={setVisible}
    />
  );
}

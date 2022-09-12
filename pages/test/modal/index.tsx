import { useState, MouseEvent } from "react";

import CustomLayoutModal from "../../../src/Components/Commons/Modal/CustomLayoutModal/CustomLayoutModal";

export default function TestPage() {
  // 모달을 사용하는 곳에 반드시 사용해주세요.
  const [visible, setVisible] = useState(false);

  // 모달을 사용하는 곳에 반드시 사용해주세요.
  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    console.log("toggleModal", visible);
    if (typeof visible === "boolean") {
      setVisible(visible);
      return;
    }
    if (visible) setVisible((p) => !p);
  };

  const onClickModalButton = () => {
    console.log("onClickButton in Modal");
  };

  return (
    <div>
      <button onClick={toggleModal}>다이얼로그 열기 /닫기</button>
      <CustomLayoutModal visible={visible} toggleModalVisible={toggleModal}>
        {/* 모달에 그리고 싶은 내용을 그리면 됩니다. */}
        <div style={{ width: "100%", height: "100%" }}>
          <h1>안녕하세요</h1>
          <p>안녕하세요. 모달입니다.</p>
          <p>안녕하세요. 모달입니다.</p>
          <p>안녕하세요. 모달입니다.</p>
          <p>안녕하세요. 모달입니다.</p>

          <button onClick={onClickModalButton}>모달에 그려진 버튼</button>
        </div>
      </CustomLayoutModal>
    </div>
  );
}

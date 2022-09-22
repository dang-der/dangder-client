import styled from "@emotion/styled";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useRecoilState } from "recoil";
import { snackBarState } from "../../../../Commons/Store/Modal/SnackBarState";
import { DimWrapper } from "../CustomLayoutModal/CustomLayoutModal";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-288px);
  margin: 0 auto;
  max-width: 576px;
  width: 100%;
  height: 100%;
  background-color: #00000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;

  @media screen and (max-width: 576px) {
    left: 0;
    transform: translateX(0);
  }
`;

export default function SuccessSnack() {
  const [snackBar, setSnackBar] = useRecoilState(snackBarState);

  const onClose = () => {
    setSnackBar((p) => ({ ...p, visible: false }));
  };

  return (
    <>
      {snackBar.visible && (
        <Wrapper>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBar.visible}
            autoHideDuration={3000}
            onClose={onClose}
            sx={{ width: "80%" }}
          >
            <Alert
              severity={snackBar.type || "success"}
              sx={{
                width: "100%",
                marginTop: "4rem",
              }}
            >
              {snackBar.message}
            </Alert>
          </Snackbar>
        </Wrapper>
      )}
    </>
  );
}

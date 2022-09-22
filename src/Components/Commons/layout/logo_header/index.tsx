import styled from "@emotion/styled";
import Link from "next/link";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { GrayD9 } from "../../../../../styles/GlobalStyles";

export default function LogoHeader() {
  return (
    <Wrapper>
      <Link href="/">
        <Logo src="/logo.svg" />
      </Link>

      <SettingIconWrapper>
        <Link href="/settings">
          <SettingsRoundedIcon />
        </Link>
      </SettingIconWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-288px);
  margin: 0 auto;
  max-width: 576px;
  width: 100%;
  height: 4.5rem;
  @media screen and (max-width: 576px) {
    left: 0;
    transform: translateX(0);
  }
`;

const Logo = styled.img`
  width: 9.875rem;
`;

const SettingIconWrapper = styled.div`
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
  position: absolute;
  right: 2rem;

  svg {
    color: ${GrayD9};
    width: 2rem;
    height: 2rem;
  }
`;

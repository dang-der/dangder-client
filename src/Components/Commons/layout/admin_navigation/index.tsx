import Link from "next/link";
import Menu, { MenuProps } from "antd/lib/menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import ReportIcon from "@mui/icons-material/Report";
import BlockIcon from "@mui/icons-material/Block";
import PaymentIcon from "@mui/icons-material/Payment";
import { ReactElement, useState } from "react";
import styled from "@emotion/styled";

interface IProps {}

const menuItems: MenuProps["items"] = [
  {
    label: <Link href="/admin/user">유저 관리</Link>,
    key: "user",
    icon: <AccountCircleIcon />,
  },
  {
    label: <Link href="/admin/dogs">댕댕이 관리</Link>,
    key: "dogs",
    icon: <PetsIcon />,
  },
  {
    label: <Link href="/admin/report">신고 내용 관리</Link>,
    key: "report",
    icon: <ReportIcon />,
  },
  {
    label: <Link href="/admin/block">차단 유저 관리</Link>,
    key: "block",
    icon: <BlockIcon />,
  },
  {
    label: <Link href="/admin/payments">댕더패스 구매 관리</Link>,
    key: "payments",
    icon: <PaymentIcon />,
  },
];

const AdminNavigation = ({}: IProps): ReactElement => {
  const [current, setCurrent] = useState("user");

  const onMenu: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Wrapper>
        <MenuWrapper>
          <LogoImage src="/logo.svg" />
          <Menu
            onClick={onMenu}
            selectedKeys={[current]}
            items={menuItems}
            mode="inline"
          />
        </MenuWrapper>
      </Wrapper>
    </>
  );
};

export default AdminNavigation;

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
`;

const MenuWrapper = styled.nav`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`;

const LogoImage = styled.img`
  width: 150px;
  height: 100px;
  margin: 0 auto;
`;

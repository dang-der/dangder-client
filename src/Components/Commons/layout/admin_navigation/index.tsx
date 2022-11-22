import Link from "next/link";
import Menu, { MenuProps } from "antd/lib/menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import ReportIcon from "@mui/icons-material/Report";
import BlockIcon from "@mui/icons-material/Block";
import PaymentIcon from "@mui/icons-material/Payment";
import { ReactElement, useState } from "react";
import styled from "@emotion/styled";


const menuItems: MenuProps["items"] = [
  {
    label: <Link href="/admin/users">유저 관리</Link>,
    key: "users",
    icon: <AccountCircleIcon />,
  },
  {
    label: <Link href="/admin/dogs">댕댕이 관리</Link>,
    key: "dogs",
    icon: <PetsIcon />,
  },
  {
    label: <Link href="/admin/reports">신고 내용 관리</Link>,
    key: "reports",
    icon: <ReportIcon />,
  },
  {
    label: <Link href="/admin/blocks">차단 유저 관리</Link>,
    key: "blocks",
    icon: <BlockIcon />,
  },
  {
    label: <Link href="/admin/payments">댕더패스 구매 관리</Link>,
    key: "payments",
    icon: <PaymentIcon />,
  },
];

const AdminNavigation = ({}: IProps): ReactElement => {
  const [current, setCurrent] = useState("users");

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
  width: 236px;
  height: 875px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  box-shadow: 0px 1px 4px 0px #726060;
  padding: 2rem 0;
`;

const MenuWrapper = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px;
  height: 100px;
  margin-bottom: 2px;
`;

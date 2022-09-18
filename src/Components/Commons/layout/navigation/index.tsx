import styled from "@emotion/styled";
import Link from "next/link";
import { useState, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface IMenuProps {
  isActive?: any;
}

export default function Navigation() {
  const menus = ["오늘의 댕댕이", "메인", "채팅", "마이 댕댕이"];
  const urls = ["/today.svg", "/main.svg", "/chat.svg", "/mypage.svg"];
  const links = ["/today", "/", "/chat", "/profile"];

  const [isActive, setActive] = useState(1);

  const onClickToggle = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLDivElement)) return;
    const activeNav = Number(event.target.id);
    setActive(activeNav);
  };

  return (
    <Wrapper>
      <MenuItems>
        {menus.map((menu: string, index: any) => (
          <Link href={links[index]} key={uuidv4()}>
            <Menu onClick={onClickToggle}>
              <MenuIcon
                src={urls[index]}
                id={index}
                isActive={index === isActive}
              />
              <MenuTitle id={index} isActive={index === isActive}>
                {menu}
              </MenuTitle>
            </Menu>
          </Link>
        ))}
      </MenuItems>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  box-shadow: 2px 0px 4px 0px #00000040;
`;

const MenuItems = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;
  flex-basis: 0;
`;

const MenuIcon = styled.img<IMenuProps>`
  filter: ${(props) =>
    props.isActive
      ? "invert(41%) sepia(75%) saturate(7098%) hue-rotate(229deg) brightness(97%) contrast(106%)"
      : "none"};
`;

const MenuTitle = styled.span<IMenuProps>`
  color: ${(props) => (props.isActive ? "#304FFE" : "#d9d9d9")};
  font-size: 0.75rem;
`;

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState, MouseEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface IMenuProps {
  isActive?: any;
}

export default function Navigation() {
  const router = useRouter();
  const menus = ["오늘의 댕댕이", "메인", "채팅", "마이 댕댕이"];
  const urls = ["/today.svg", "/main.svg", "/chat.svg", "/mypage.svg"];
  const links = ["/today/", "/", "/chat/", "/profile/"];

  const [isActive, setActive] = useState(links.indexOf(router.asPath));

  useEffect(() => {
    setActive(links.indexOf(router.asPath));
  }, [router]);

  useEffect(() => {
    console.log("nav - active menu", isActive);
  }, [isActive]);

  const onClickToggle =
    (activeIndex: number) => (event: MouseEvent<HTMLDivElement>) => {
      setActive(activeIndex);
      router.push(links[activeIndex]);
    };

  return (
    <Wrapper>
      <MenuItems>
        {menus.map((menu: string, index: any) => (
          <Menu onClick={onClickToggle(index)} key={uuidv4()}>
            <MenuIcon
              src={urls[index]}
              id={index}
              isActive={index === isActive}
            />
            <MenuTitle id={index} isActive={index === isActive}>
              {menu}
            </MenuTitle>
          </Menu>
        ))}
      </MenuItems>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0.5rem 1rem;
  box-shadow: 2px 0px 4px 0px #00000040;
`;

const MenuItems = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Menu = styled.div`
  cursor: pointer;
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

import styled from "@emotion/styled";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Today from "/public/today.svg";
import Main from "/public/main.svg";
import Chat from "/public/chat.svg";
import Mypage from "/public/mypage.svg";
import Head from "next/head";

// interface IMenuProps {
//   isActive: boolean;
// }

export default function Navigation() {
  const menus = ["오늘의 댕댕이", "메인", "채팅", "마이 댕댕이"];
  const urls = ["/today.svg", "/main.svg", "/chat.svg", "/mypage.svg"];

  const [isActive, setActive] = useState(Array(menus.length).fill(false));

  const onClickToggle = (index: any) => {
    const newArr = Array(menus.length).fill(false);
    newArr[index] = true;
    setActive(newArr);
  };

  return (
    <>
      {/* <Head>
        <style>
          {`
            .icon true {
              fill: "#304FFE";
            }

            .icon false {
              fill: "#d9d9d9"
            }

            .title true {
              color: "#304FFE";
            }

            .title false {
              color: "#d9d9d9";
            }
          `}
        </style>
      </Head> */}
      <Wrapper>
        {/* <MenuItems>
          {menus.map((menu, index) => (
            <Menu key={uuidv4()} onClick={() => onClickToggle(index)}>
              <MenuIcon
              // src={urls[index]}
              // className={`${isActive ? "icon true" : "icon false"}`}
              />
              <MenuTitle
              // className={`${isActive ? "title true" : "title false"}`}
              // onClick={() => onClickToggle(index)}
              >
                {menu}
              </MenuTitle>
            </Menu>
          ))}
        </MenuItems> */}

        <MenuItems>
          <Menu>
            <TodayIcon src="/today.svg" />
            <MenuTitle>오늘의 댕댕이</MenuTitle>
          </Menu>
          <Menu>
            <MainIcon src="/main.svg" />
            <MenuTitle>메인</MenuTitle>
          </Menu>
          <Menu>
            <ChatIcon src="/chat.svg" />
            <MenuTitle>채팅</MenuTitle>
          </Menu>
          <Menu>
            <MypageIcon src="/mypage.svg" />
            <MenuTitle>마이 댕댕이</MenuTitle>
          </Menu>
        </MenuItems>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 4rem;
  bottom: 0;
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
`;

const MenuTitle = styled.span`
  color: #d9d9d9;
  font-size: 0.75rem;
`;

const TodayIcon = styled(Today)`
  fill: ${(props) => (props.isActive ? "#304FFE" : "#d9d9d9")};
`;

const MainIcon = styled(Main)`
  fill: ${(props) => (props.isActive ? "#304FFE" : "#d9d9d9")};
`;

const ChatIcon = styled(Chat)`
  fill: ${(props) => (props.isActive ? "#304FFE" : "#d9d9d9")};
`;

const MypageIcon = styled(Mypage)`
  fill: ${(props) => (props.isActive ? "#304FFE" : "#d9d9d9")};
`;

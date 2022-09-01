import React, { useMemo, useRef, useState } from "react";
import DogMainPageUI from "./DogMainPage.presenter";

interface DogMainPageProps {
  dogList: any;
}

// 강아지 정보 api
const dogList = [
  {
    name: "kkimi",
    age: 1,
    distance: 2,
    play: "공놀이를 좋아하는",
    url: "/dog1.jpg",
  },
  {
    name: "kkimi",
    age: 1,
    distance: 2,
    play: "공놀이를 좋아하는",
    url: "/dog1.jpg",
  },
  {
    name: "kkimi",
    age: 1,
    distance: 2,
    play: "공놀이를 좋아하는",
    url: "/dog1.jpg",
  },
];

export default function DogMainPage() {
  const [currentIndex, setCurrentIndex] = useState(dogList.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  console.log("currentIndex", currentIndex);
  console.log("currentIndexRef", currentIndexRef.current);
  const childRefs = useMemo(
    () =>
      Array(dogList.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val: any) => {
    console.log("updateCurrentIndex", val);
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const canGoBack = currentIndex < dogList.length - 1;

  // const onSwipe = (direction: any) => {
  //   console.log(`You swiped: ${direction}`);

  //   if (dogList.length < currentIndex) return;
  //   setCurrentIndex((prev) => prev + 1);
  // };

  const swiped = (direction, index) => {
    console.log("swiped", index);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: any, index: any) => {
    console.log(`${name} (${index}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= index && childRefs[index].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < dogList.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <DogMainPageUI
      dogList={dogList}
      currentIndex={currentIndex}
      lastDirection={lastDirection}
      currentIndexRef={currentIndexRef}
      canSwipe={canSwipe}
      canGoBack={canGoBack}
      swiped={swiped}
      outOfFrame={outOfFrame}
      swipe={swipe}
      childRefs={childRefs}
    />
  );
}

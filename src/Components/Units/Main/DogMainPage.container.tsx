import DogMainPageUI from "./DogMainPage.presenter";

// 강아지 정보 api
const dogList = [
  {
    name: "끼미",
    age: 1,
    distance: 2,
    play: "공놀이를 좋아하는 댕댕이입니다.",
    url: "/dog1.jpg",
  },
  {
    name: "오전이",
    age: 1,
    distance: 2,
    play: "공놀이를 좋아하는 댕댕이입니다.",
    url: "/dog1.jpg",
  },
  {
    name: "철수",
    age: 1,
    distance: 2,
    play: "공놀이를 좋아하는 댕댕이입니다.",
    url: "/dog1.jpg",
  },
];

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(position.coords.latitude + " " + position.coords.longitude);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else {
    alert("GPS를 지원하지 않습니다.");
  }
};

export default function DogMainPage() {
  return <DogMainPageUI dogList={dogList} getLocation={getLocation} />;
}

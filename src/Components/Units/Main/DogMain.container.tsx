




import { Stack } from "./Stack";

export default function DogMainContainer() {
  //   const [userInfo] = useRecoilState(userInfoState);

  const datas = [
    { id: 1, name: "끼미" },
    { id: 2, name: "오전이" },
    { id: 3, name: "끼미" },
    { id: 4, name: "오전이" },
    { id: 5, name: "끼미" },
    { id: 6, name: "오전이" },
    { id: 7, name: "끼미" },
    { id: 8, name: "오전이" },
    { id: 9, name: "끼미" },
  ];
  //   const { data } = useQuery(FETCH_AROUND_DOG, { variables: { id: "" } });

  const onVote = (
    item: any,
    result: boolean,
    direction: string | undefined
  ) => {
    console.log("DogMainContainer-onVote", item, result, direction);
  };
  return <Stack onVote={onVote} datas={datas} />;
}

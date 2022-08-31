import { useRouter } from "next/router";

export default function TestRoutePage() {
  const router = useRouter();

  return <div>테스트 {router.query.id}페이지입니다.</div>;
}

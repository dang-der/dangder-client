import { useRouter } from "next/router"
import DogReportSuccessUI from "./DogReportSuccess.presenter"


export default function DogReportSuccess() {

  const router = useRouter()

  const onClickrMainPage = () => {
    router.push('/dog')
  }

  return (
    <DogReportSuccessUI
    onClickrMainPage={onClickrMainPage}
    />
  )
}
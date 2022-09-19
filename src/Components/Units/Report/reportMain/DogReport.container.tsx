import { useRouter } from "next/router"
import DogReportUI from "./DogReport.presenter"

export default function DogReport() {

  const router = useRouter()

  const onClickNextPage = () => {
    router.push('/report/cause')
  }

  return (
    <DogReportUI
    onClickNextPage={onClickNextPage}
    />
  )
}
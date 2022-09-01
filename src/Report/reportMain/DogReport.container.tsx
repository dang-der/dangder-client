import { useRouter } from "next/router"
import DogReportUI from "./DogReport.presenter"

export default function DogReport() {

  const router = useRouter()

  const onClickNextPage = (props: any) => {
    router.push('/reportCause')
  }

  return (
    <DogReportUI
    onClickNextPage={onClickNextPage}
    />
  )
}
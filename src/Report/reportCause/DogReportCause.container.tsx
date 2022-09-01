import { useRouter } from "next/router"
import { useState } from "react"
import DogReportCauseUI from "./DogReportCause.presenter"

export default function DogReportCause() {

  const router = useRouter()
  const [isActive, setIsActive] = useState(false)

  const onClickNextPage = (props: any) => {
    if(Object.values(onClickNextPage).every((el) => el)) {
        setIsActive(true)
    } else { 
        setIsActive(false);
      }
    router.push('/reportCause')
  }

  return (
    <DogReportCauseUI 
    onClickNextPage={onClickNextPage}
    isActive={isActive}
    
    />
  )
}
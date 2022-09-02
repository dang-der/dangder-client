import { useRouter } from "next/router"
import DogDetailUI from "./DogDetail.presenter"

export default function DogDetail() {
    const router = useRouter()

    const onClickMoveBack = (props: any) => {
        router.back()
    }

    const onClickMoveReport = (props: any) => {
        router.push('/report')
    }

    const onClickLike = (props: any) => {}

    return (
        <DogDetailUI 
        onClickMoveBack={onClickMoveBack}
        onClickMoveReport={onClickMoveReport}
        onClickLike={onClickLike}
        />
    )
}
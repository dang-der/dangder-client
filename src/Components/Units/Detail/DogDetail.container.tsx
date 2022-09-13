import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { IMutation, IMutationCreateLikeArgs, IQuery, IQueryFetchDogsDistanceArgs, IQueryFetchMyDogArgs,} from "../../../Commons/Types/Generated/types"

import DogDetailUI from "./DogDetail.presenter"
import { CREATE_LIKE, FETCH_DOG_DISTANCE, FETCH_MY_DOG } from "./DogDetail.queries"

export default function DogDetail() {
    const router = useRouter()
    // const [data] = useQuery<Pick<IQuery, "fetchDogsDistance">, IQueryFetchDogsDistanceArgs>(FETCH_DOG_DISTANCE)
    // const [data] = useQuery<Pick<IQuery, "fetchMyDog">, IQueryFetchMyDogArgs>(FETCH_MY_DOG)
    
    const {data: distanceData} = useQuery<Pick<IQuery, "fetchDogsDistance">, IQueryFetchDogsDistanceArgs>(FETCH_DOG_DISTANCE)

    const {data:interestsData} = useQuery<Pick<IQuery, "fetchMyDog">, IQueryFetchMyDogArgs>(FETCH_MY_DOG)

    const [createLike] = useMutation<
    Pick<IMutation, "createLike">,
    IMutationCreateLikeArgs
  >(CREATE_LIKE);


    const handleCreateLike = async (sendId: string, receiveId: string) => {
        if (typeof router.query.dogId !== "string") return
       const result = await createLike({
            variables:{ receiveId: router.query.dogId, sendId: router.query.dogId},
            refetchQueries: [{
                query: FETCH_MY_DOG,
                variables: {receiveId: router.query.dogId, sendId: router.query.dogId}
            },
        ],
        })
    }

    return (
        <DogDetailUI 
        handleCreateLike={handleCreateLike}
        distanceData={distanceData}
        interestsData={interestsData}
        />
    )
}
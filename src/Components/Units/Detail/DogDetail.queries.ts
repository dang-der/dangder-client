import { gql } from "@apollo/client";


export const FETCH_DOG_DISTANCE = gql`
    query fetchDogsDistance($id: String!) {
        fetchDogsDistance(id: $id) {
            id
            dogId
            distance
        }
    }
`

export const FETCH_MY_DOG = gql`
    query fetchMyDog($id: String) {
        fetchMyDog(id: $id) {
            id
            name
            age
            gender
            description
            interests{
                id
                interest
            }
            characters{
                id
                character
            }
            img{
                id
                img
                isMain
                dog
            }
        }
    }
`

export const CREATE_LIKE = gql`
  mutation createLike($sendId: String, $receiveId: String) {
    createLike(sendId: $sendId, receiveId: $receiveId) {
        id
        receiveId
        sendId
    }
  }
`
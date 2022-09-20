import { gql } from "@apollo/client";

export const GET_DOG_INFO = gql`
  mutation getDogInfo($dogRegNum: String!, $ownerBirth: String!) {
    getDogInfo(dogRegNum: $dogRegNum, ownerBirth: $ownerBirth)
  }
`;

export const FETCH_CHARACTERS = gql`
  query fetchCharacters {
    fetchCharacters {
      id
      character
    }
  }
`;

export const FETCH_INTERESTS = gql`
  query fetchInterests {
    fetchInterests {
      id
      interest
    }
  }
`;

export const FETCH_AVOID_BREEDS = gql`
  query fetchAvoidBreeds {
    fetchAvoidBreeds {
      id
      avoidBreed
    }
  }
`;

export const CREATE_DOG = gql`
  mutation createDog(
    $createDogInput: CreateDogInput!
    $dogRegNum: String!
    $ownerBirth: String!
  ) {
    createDog(
      createDogInput: $createDogInput
      dogRegNum: $dogRegNum
      ownerBirth: $ownerBirth
    ) {
      id
      name
    }
  }
`;


export const UPLOAD_FILE = gql`
  mutation uploadFile($files: [Upload!]!) {
    uploadFile(files: $files)
  }
`;

export const UPDATE_DOG = gql`
  mutation updateDog(
    $dogId: String!
    $dogRegNum: String
    $ownerBirth: String
    $updateDogInput: UpdateDogInput!
  ) {
    updateDog(
      dogId: $dogId
      dogRegNum: $dogRegNum
      ownerBirth: $ownerBirth
      updateDogInput: $updateDogInput
    ) {
      id
    }
  }
`;



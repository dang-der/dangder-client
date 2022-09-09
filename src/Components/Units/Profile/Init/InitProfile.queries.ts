import { gql } from "@apollo/client";

export const GET_DOG_INFO = gql`
  mutation getdoginfo($registerNumber: String!, $birth: String!) {
    getdoginfo(registerNumber: $registerNumber, birth: $birth)
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

// todo : userId 받아오는 부분 아직 배포 안됨. 배포되면 userId 가져오는 부분 추가할 것
export const CREATE_DOG = gql`
  mutation createDog(
    $createDogInput: createDogInput!
    $registerNumber: String!
    $birth: String!
  ) {
    createDog(
      createDogInput: $createDogInput
      registerNumber: $registerNumber
      birth: $birth
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



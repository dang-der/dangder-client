export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type IAvoidBreed = {
  __typename?: 'AvoidBreed';
  avoidBreed: Scalars['String'];
  dogs: Array<IDog>;
  id: Scalars['String'];
};

export type IBlockUser = {
  __typename?: 'BlockUser';
  blockId: Scalars['String'];
  id: Scalars['String'];
  user: IUser;
};

export type IBreed = {
  __typename?: 'Breed';
  dogs: Array<IDog>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ICharacter = {
  __typename?: 'Character';
  character: Scalars['String'];
  dogs: Array<IDog>;
  id: Scalars['String'];
};

export type IChatroom = {
  __typename?: 'Chatroom';
  chatPairId: Scalars['String'];
  dog: IDog;
  id: Scalars['String'];
};

export type ICreateBlockUserInput = {
  blockId: Scalars['String'];
};

export type ICreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  pet: Scalars['Boolean'];
  phone: Scalars['String'];
};

export type IDog = {
  __typename?: 'Dog';
  age: Scalars['Int'];
  avoidBreeds: Array<IAvoidBreed>;
  birthday: Scalars['String'];
  breeds: Array<IBreed>;
  characters: Array<ICharacter>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  interests: Array<IInterest>;
  isNeut: Scalars['Boolean'];
  locations: ILocation;
  name: Scalars['String'];
  registerNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: IUser;
};

export type IInterest = {
  __typename?: 'Interest';
  dogs: Array<IDog>;
  id: Scalars['String'];
  interest: Scalars['String'];
};

export type ILocation = {
  __typename?: 'Location';
  id: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type IMutation = {
  __typename?: 'Mutation';
  createBlockUser: IBlockUser;
  createCharacter: ICharacter;
  createDog: IDog;
  createInterest: IInterest;
  createMailToken: Scalars['String'];
  createPayment: IPayment;
  createUser: IUser;
  deleteCharacter: Scalars['Boolean'];
  deleteDog: Scalars['Boolean'];
  deleteInterest: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  logout: Scalars['String'];
  restoreAccessToken: Scalars['String'];
  updateDog: IDog;
  updateUser: IUser;
  userLogin: Scalars['String'];
  verifyMailToken: Scalars['Boolean'];
};


export type IMutationCreateBlockUserArgs = {
  createBlockUserInput: ICreateBlockUserInput;
};


export type IMutationCreateCharacterArgs = {
  character: Scalars['String'];
};


export type IMutationCreateDogArgs = {
  birth: Scalars['String'];
  createDogInput: ICreateDogInput;
  registerNumber: Scalars['String'];
};


export type IMutationCreateInterestArgs = {
  interest: Scalars['String'];
};


export type IMutationCreateMailTokenArgs = {
  email: Scalars['String'];
};


export type IMutationCreatePaymentArgs = {
  impUid: Scalars['String'];
  payMoney: Scalars['Float'];
};


export type IMutationCreateUserArgs = {
  createUserInput: ICreateUserInput;
};


export type IMutationDeleteCharacterArgs = {
  id: Scalars['String'];
};


export type IMutationDeleteDogArgs = {
  id: Scalars['String'];
};


export type IMutationDeleteInterestArgs = {
  id: Scalars['String'];
};


export type IMutationDeleteUserArgs = {
  email: Scalars['String'];
};


export type IMutationUpdateDogArgs = {
  id: Scalars['String'];
  updateDogInput: IUpdateDogInput;
};


export type IMutationUpdateUserArgs = {
  email: Scalars['String'];
  updateUserInput: IUpdateUserInput;
};


export type IMutationUserLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type IMutationVerifyMailTokenArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export enum IPayment_Status_Enum {
  Cancel = 'CANCEL',
  Payment = 'PAYMENT'
}

export type IPayment = {
  __typename?: 'Payment';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  impUid: Scalars['String'];
  payMoney: Scalars['Int'];
  paymentType: IPayment_Status_Enum;
  user: IUser;
};

export type IQuery = {
  __typename?: 'Query';
  fetchBlockUser: IBlockUser;
  fetchBlockUsers: Array<IBlockUser>;
  fetchCharacters: Array<ICharacter>;
  fetchDogs: Array<IDog>;
  fetchInterests: Array<IInterest>;
  fetchLoginUser: IUser;
  fetchUser: IUser;
  fetchUsers: Array<IUser>;
};


export type IQueryFetchBlockUserArgs = {
  blockId: Scalars['String'];
};


export type IQueryFetchUserArgs = {
  email: Scalars['String'];
};

export type IUpdateDogInput = {
  age?: InputMaybe<Scalars['Int']>;
  avoidBreeds?: InputMaybe<Array<Scalars['String']>>;
  birthday?: InputMaybe<Scalars['String']>;
  characters?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Array<Scalars['String']>>;
  interests?: InputMaybe<Array<Scalars['String']>>;
};

export type IUpdateUserInput = {
  ddMoney?: InputMaybe<Scalars['Int']>;
  donateGrade?: InputMaybe<Scalars['String']>;
  donateTotal?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  isCert?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  pet?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  reportCnt?: InputMaybe<Scalars['Int']>;
};

export type IUser = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  ddMoney: Scalars['Int'];
  donateGrade: Scalars['String'];
  donateTotal: Scalars['Int'];
  email: Scalars['String'];
  id: Scalars['String'];
  isCert: Scalars['Boolean'];
  password: Scalars['String'];
  pet: Scalars['Boolean'];
  phone?: Maybe<Scalars['String']>;
  reportCnt: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type ICreateDogInput = {
  age: Scalars['Int'];
  avoidBreeds: Array<Scalars['String']>;
  birthday: Scalars['String'];
  characters: Array<Scalars['String']>;
  description: Scalars['String'];
  img: Array<Scalars['String']>;
  interests: Array<Scalars['String']>;
};

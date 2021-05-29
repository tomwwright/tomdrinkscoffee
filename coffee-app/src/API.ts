/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCoffeeInput = {
  id?: string | null,
  datetime: string,
  description: string,
  amount: number,
};

export type ModelCoffeeConditionInput = {
  datetime?: ModelStringInput | null,
  description?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  and?: Array< ModelCoffeeConditionInput | null > | null,
  or?: Array< ModelCoffeeConditionInput | null > | null,
  not?: ModelCoffeeConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Coffee = {
  __typename: "Coffee",
  id?: string,
  datetime?: string,
  description?: string,
  amount?: number,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateCoffeeInput = {
  datetime?: string | null,
  description?: string | null,
  amount?: number | null,
};

export type DeleteCoffeeInput = {
  id: string,
};

export type ModelCoffeeFilterInput = {
  datetime?: ModelStringInput | null,
  description?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  and?: Array< ModelCoffeeFilterInput | null > | null,
  or?: Array< ModelCoffeeFilterInput | null > | null,
  not?: ModelCoffeeFilterInput | null,
};

export type ModelCoffeeConnection = {
  __typename: "ModelCoffeeConnection",
  items?:  Array<Coffee | null > | null,
  nextToken?: string | null,
};

export type CreateCoffeeMutationVariables = {
  input?: CreateCoffeeInput,
  condition?: ModelCoffeeConditionInput | null,
};

export type CreateCoffeeMutation = {
  createCoffee?:  {
    __typename: "Coffee",
    id: string,
    datetime: string,
    description: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCoffeeMutationVariables = {
  input?: UpdateCoffeeInput,
  condition?: ModelCoffeeConditionInput | null,
};

export type UpdateCoffeeMutation = {
  updateCoffee?:  {
    __typename: "Coffee",
    id: string,
    datetime: string,
    description: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCoffeeMutationVariables = {
  input?: DeleteCoffeeInput,
  condition?: ModelCoffeeConditionInput | null,
};

export type DeleteCoffeeMutation = {
  deleteCoffee?:  {
    __typename: "Coffee",
    id: string,
    datetime: string,
    description: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCoffeeQueryVariables = {
  id?: string,
};

export type GetCoffeeQuery = {
  getCoffee?:  {
    __typename: "Coffee",
    id: string,
    datetime: string,
    description: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCoffeesQueryVariables = {
  filter?: ModelCoffeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoffeesQuery = {
  listCoffees?:  {
    __typename: "ModelCoffeeConnection",
    items?:  Array< {
      __typename: "Coffee",
      id: string,
      datetime: string,
      description: string,
      amount: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCoffeeSubscription = {
  onCreateCoffee?:  {
    __typename: "Coffee",
    id: string,
    datetime: string,
    description: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCoffeeSubscription = {
  onUpdateCoffee?:  {
    __typename: "Coffee",
    id: string,
    datetime: string,
    description: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCoffeeSubscription = {
  onDeleteCoffee?:  {
    __typename: "Coffee",
    id: string,
    datetime: string,
    description: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

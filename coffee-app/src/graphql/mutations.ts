/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCoffee = /* GraphQL */ `
  mutation CreateCoffee(
    $input: CreateCoffeeInput!
    $condition: ModelCoffeeConditionInput
  ) {
    createCoffee(input: $input, condition: $condition) {
      id
      datetime
      description
      amount
      createdAt
      updatedAt
    }
  }
`;
export const updateCoffee = /* GraphQL */ `
  mutation UpdateCoffee(
    $input: UpdateCoffeeInput!
    $condition: ModelCoffeeConditionInput
  ) {
    updateCoffee(input: $input, condition: $condition) {
      id
      datetime
      description
      amount
      createdAt
      updatedAt
    }
  }
`;
export const deleteCoffee = /* GraphQL */ `
  mutation DeleteCoffee(
    $input: DeleteCoffeeInput!
    $condition: ModelCoffeeConditionInput
  ) {
    deleteCoffee(input: $input, condition: $condition) {
      id
      datetime
      description
      amount
      createdAt
      updatedAt
    }
  }
`;

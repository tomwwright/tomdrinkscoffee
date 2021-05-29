/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCoffee = /* GraphQL */ `
  query GetCoffee($id: ID!) {
    getCoffee(id: $id) {
      id
      datetime
      description
      amount
      createdAt
      updatedAt
    }
  }
`;
export const listCoffees = /* GraphQL */ `
  query ListCoffees(
    $filter: ModelCoffeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoffees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        datetime
        description
        amount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

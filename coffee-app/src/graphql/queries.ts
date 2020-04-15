// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCoffee = /* GraphQL */ `
  query GetCoffee($id: ID!) {
    getCoffee(id: $id) {
      datetime
      description
      amount
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
        datetime
        description
        amount
      }
      nextToken
    }
  }
`;

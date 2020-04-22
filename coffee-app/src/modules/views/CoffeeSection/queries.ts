export const listCoffeesQuery = `query listCoffees($limit: Int!) {
  listCoffees(limit: $limit) {
    items {
      datetime
      description
      amount
    }
  }
}`;

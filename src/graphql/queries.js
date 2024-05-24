/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestionModel = /* GraphQL */ `
  query GetQuestionModel($id: ID!) {
    getQuestionModel(id: $id) {
      id
      text
      a
      b
      c
      d
      e
      reversed
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listQuestionModels = /* GraphQL */ `
  query ListQuestionModels(
    $filter: ModelQuestionModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        a
        b
        c
        d
        e
        reversed
        number
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;


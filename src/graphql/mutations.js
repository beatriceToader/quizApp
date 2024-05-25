/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createScore = /* GraphQL */ `
  mutation CreateScore(
    $input: CreateScoreInput!
    $condition: ModelScoreConditionInput
  ) {
    createScore(input: $input, condition: $condition) {
      id
      email
      score
      time
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateScore = /* GraphQL */ `
  mutation UpdateScore(
    $input: UpdateScoreInput!
    $condition: ModelScoreConditionInput
  ) {
    updateScore(input: $input, condition: $condition) {
      id
      email
      score
      time
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteScore = /* GraphQL */ `
  mutation DeleteScore(
    $input: DeleteScoreInput!
    $condition: ModelScoreConditionInput
  ) {
    deleteScore(input: $input, condition: $condition) {
      id
      email
      score
      time
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createQuestionModel = /* GraphQL */ `
  mutation CreateQuestionModel(
    $input: CreateQuestionModelInput!
    $condition: ModelQuestionModelConditionInput
  ) {
    createQuestionModel(input: $input, condition: $condition) {
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
export const updateQuestionModel = /* GraphQL */ `
  mutation UpdateQuestionModel(
    $input: UpdateQuestionModelInput!
    $condition: ModelQuestionModelConditionInput
  ) {
    updateQuestionModel(input: $input, condition: $condition) {
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
export const deleteQuestionModel = /* GraphQL */ `
  mutation DeleteQuestionModel(
    $input: DeleteQuestionModelInput!
    $condition: ModelQuestionModelConditionInput
  ) {
    deleteQuestionModel(input: $input, condition: $condition) {
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

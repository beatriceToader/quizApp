/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
      id
      text
      score
      questions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
      id
      text
      score
      questions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
      id
      text
      score
      questions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      text
      scoreReversed
      Answers {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      text
      scoreReversed
      Answers {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      text
      scoreReversed
      Answers {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createQuestionAnswer = /* GraphQL */ `
  mutation CreateQuestionAnswer(
    $input: CreateQuestionAnswerInput!
    $condition: ModelQuestionAnswerConditionInput
  ) {
    createQuestionAnswer(input: $input, condition: $condition) {
      id
      answerId
      questionId
      answer {
        id
        text
        score
        createdAt
        updatedAt
        __typename
      }
      question {
        id
        text
        scoreReversed
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateQuestionAnswer = /* GraphQL */ `
  mutation UpdateQuestionAnswer(
    $input: UpdateQuestionAnswerInput!
    $condition: ModelQuestionAnswerConditionInput
  ) {
    updateQuestionAnswer(input: $input, condition: $condition) {
      id
      answerId
      questionId
      answer {
        id
        text
        score
        createdAt
        updatedAt
        __typename
      }
      question {
        id
        text
        scoreReversed
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteQuestionAnswer = /* GraphQL */ `
  mutation DeleteQuestionAnswer(
    $input: DeleteQuestionAnswerInput!
    $condition: ModelQuestionAnswerConditionInput
  ) {
    deleteQuestionAnswer(input: $input, condition: $condition) {
      id
      answerId
      questionId
      answer {
        id
        text
        score
        createdAt
        updatedAt
        __typename
      }
      question {
        id
        text
        scoreReversed
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

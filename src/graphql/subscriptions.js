/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onCreateAnswer(filter: $filter) {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onUpdateAnswer(filter: $filter) {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onDeleteAnswer(filter: $filter) {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
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
export const onCreateQuestionAnswer = /* GraphQL */ `
  subscription OnCreateQuestionAnswer(
    $filter: ModelSubscriptionQuestionAnswerFilterInput
  ) {
    onCreateQuestionAnswer(filter: $filter) {
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
export const onUpdateQuestionAnswer = /* GraphQL */ `
  subscription OnUpdateQuestionAnswer(
    $filter: ModelSubscriptionQuestionAnswerFilterInput
  ) {
    onUpdateQuestionAnswer(filter: $filter) {
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
export const onDeleteQuestionAnswer = /* GraphQL */ `
  subscription OnDeleteQuestionAnswer(
    $filter: ModelSubscriptionQuestionAnswerFilterInput
  ) {
    onDeleteQuestionAnswer(filter: $filter) {
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

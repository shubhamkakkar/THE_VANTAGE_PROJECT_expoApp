import gql from "graphql-tag"

export const QA_QUERY = gql`
    query QA($token: String!){
        QA(token: $token){
            question,
            options,
            _id
        }
    }
`;

export const EVALUATAION_QUERY = gql`
    query evaluateQA($_id: ID!, $statedAnswerIndex: Int!){
        evaluateQA(_id:$_id,statedAnswerIndex: $statedAnswerIndex){
            recommendation,
            score,
            answerIndex
        }
    }
`

export const RANK_PREDICTION_MUTATION = gql`
    mutation rankPrediction($token: String!, $marks: Int!){
        rankPrediction(token:$token, marks: $marks){
            rank
        }
    }
`
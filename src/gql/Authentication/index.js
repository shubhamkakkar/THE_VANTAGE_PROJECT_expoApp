import gql from "graphql-tag"
export const SIGNIN_MUTATION = gql`
    mutation signin($email: String!, $password: String!){
        signin(email: $email, password: $password){
            token,
        
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token,
        
        }
    }
`;

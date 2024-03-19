import { gql } from "apollo-server";

const LikeTypedef = gql`
    type Like {
        Id: Int!
        userId: Int!
        postId: Int!
        user : User!
    }
    type Mutation {
        Like(postId: Int!): String!
    }
    type response { 
        likes: [Like!]!
        count: Int!
    }
`
export default LikeTypedef
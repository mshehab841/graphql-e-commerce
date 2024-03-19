import { gql } from "apollo-server";

const commentTypedef =gql`
    type Comment { 
        id: Int!
        content: String!
        user: User!
        post: Post!
        userId: Int!
        postId: Int!
    }
    type Query {
        getComment(id: Int!): Comment!
    }
    type Mutation {
        createComment(input: createCommentInput!): Comment!
        deleteComment(id: Int!): String!
    }
    input createCommentInput {
        content: String!
        postId: Int!
    }
    input updateCommentInput {
        content: String
    }
`
export default commentTypedef
import { gql } from "apollo-server";

const postTypeDefs = gql`
    scalar Upload
    type Post {
        id: Int!
        title: String!
        content: String!
        image: [String]
        author: User!
        userId: Int!
        comments: [Comment!]
        likes: likeResponse!
    }
    type likeResponse {
        likes: [Like!]
        count: Int!
    }
    type Query {
        getPosts: [Post!]!
        getPost(id: Int!): Post!
        getUserPosts(userId: Int!): [Post!]!
    }
    type Mutation {
        createPost(input: createPostInput!): Post!
        updatePost(id: Int!, input: updatePostInput!): updatePostRes! 
        deletePost(id: Int!): String
        uploadPhoto(file: Upload!): String!
    }
    type updatePostRes {
        data: Post!
        message: String!
    }
    input createPostInput {
        title: String!
        content: String!
        image: [String]!
    }
    input updatePostInput {
        title: String
        content: String
        image: String
    }
`

export default postTypeDefs
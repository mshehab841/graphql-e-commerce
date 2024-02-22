import gql from "graphql-tag"

const userTypedef   = gql`
 type User{
    id : ID!
    name : String 
    email : String 
    password : String 
}
input addUserInput {
    name : String!
    email : String!
    password : String! 
}
input loginInput { 
    email : String!
    password : String!
}
type userRES { 
    accessToken : String!
    refreshToken : String!
}

type Query { 
    me : User!
}
type Mutation {
    addUser(input:addUserInput!) : User!
    login(input: loginInput!) : userRES !
}
`
export default userTypedef
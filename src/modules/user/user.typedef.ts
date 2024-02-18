import { gql } from "apollo-server"

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
    email : String
    password : String
}
type userRES { 
    data : User
    message : String 
}

type Query { 
    me : User!
}
type Mutation {
    addUser(input:addUserInput!) : User!
    login(input: loginInput!) : String!
}
`
export default userTypedef
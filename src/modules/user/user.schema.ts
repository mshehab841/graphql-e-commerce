import gql from "graphql-tag"

const userTypedef   = gql`
 type User{
    id : Int!
    name : String 
    email : String 
    password : String 
    verified : Boolean

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
    login(input: loginInput!) : userRES!
    verifyEmail(verificationToken : String!) : String!
    resendVerificationEmail(email : String!) : String!
}
`
export default userTypedef
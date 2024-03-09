const { gql } = require('apollo-server-express');

const userTypedef = gql `
type User{
    id : Int!
    name : String 
    email : String 
    password : String 
    verified : Boolean
    OTP : String,
    createdAt : String
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
input resetPasswordInput { 
    password : String!
    confirmPassword : String!
}
type Query { 
    me : User!
}
type Mutation {
    addUser(input:addUserInput!) : User!
    login(input: loginInput!) : userRES!
    verifyEmail(verificationToken : String!) : String!
    resendVerificationEmail(email : String!) : String!
    resetPassword(email : String!) : String!
    confirmOTP(OTP : String!) : String!
    confirmResetPassword(password : String! , confirmPassword : String! , email : String!) : String
}
`
export default userTypedef
import { gql } from "apollo-server";
const userTypedef = gql`
  scalar Upload
   type User {
    id: Int!
    name: String!
    email: String!
    password: String
    verified: Boolean!
    OTP: String
    photo: String!
    addresses: [Addresses!]!
    posts: [Post!]!
  }
  type Addresses {
    id: Int
    city: String
    zipCode: Int
    name: String
    isDefault: Boolean
    userId: Int
  }
  input createAddressInput {
    city: String
    zipCode: Int
    name: String
    isDefault: Boolean
    userId: Int
  }
  input addUserInput {
    name: String!
    email: String!
    password: String!
    photo: String
  }
  input loginInput {
    email: String!
    password: String!
  }
  type userRES {
    accessToken: String!
    refreshToken: String!
  }
  input resetPasswordInput {
    password: String!
    confirmPassword: String!
  }
  type Query {
    me: User!
    getUserById(id: Int!): User!
  }
  type Mutation {
    addUser(input: addUserInput!): User!
    login(input: loginInput!): userRES!
    verifyEmail(verificationToken: String!): String!
    resendVerificationEmail(email: String!): String!
    resetPassword(email: String!): String!
    confirmOTP(OTP: String!): String!
    confirmResetPassword(
      password: String!
      confirmPassword: String!
      email: String!
    ): String!
    updateUsername(username: String!): String!
    createAddresses(input: createAddressInput!): Addresses!
    enable2FA(email: String!): String!
    UploadPhoto(file: Upload!): String
  }
`;
export default userTypedef;

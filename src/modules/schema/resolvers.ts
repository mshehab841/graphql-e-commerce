import userResolvers from "../user/user.mutation";

const resolvers = {
    Query : {
        ...userResolvers.Query
    }
    ,
    Mutation : {
        ...userResolvers.Mutation
    }
}
export default resolvers
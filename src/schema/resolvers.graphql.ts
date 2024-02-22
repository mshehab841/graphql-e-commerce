import userResolvers from "../modules/user/user.resolver";

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
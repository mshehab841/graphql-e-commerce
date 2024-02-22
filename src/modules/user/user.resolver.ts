import userServices from "./user.service";
import userRepository from "./user.repo";
import auth from "../../middleware/context";
import {LoginInput, Resolvers , AddUserInput, User, UserRes} from "../../types"
const userRepo = new userRepository()
const service = new userServices(userRepo)

const userResolvers : Resolvers = {
    Query: {
        me: async(_  : {}, __ : {} , context ) : Promise<User>=>{
            const user = auth(context)
            if (!user) {
                throw new Error("Not authorized")
            }
            return user 
        }
    },
    Mutation : {
        addUser :async (_  : {}, {input} : {input : AddUserInput}) : Promise<User>=>{
            const user = await service.addUserServices(input.email , input.name , input.password)
            return  user 
        },
        login : async (_ : {} , {input}: {input : LoginInput}) : Promise<UserRes>=>{
            const token = await service.loginServices(input.email , input.password)
            console.log(token);
            return token 
        }

    }
}

export default userResolvers
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
        },
        verifyEmail : async (_ : {} , {verificationToken})=>{
            const response =  await service.verifyEmailServices(verificationToken)
            return response
        },
        resendVerificationEmail : async (_ : {} , {email})=>{
            const response =  await service.resendVerificationEmailServices(email)
            return response
        }
    }
}

export default userResolvers
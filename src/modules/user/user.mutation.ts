import userServices from "./user.service";
import userRepository from "./user.repo";
import auth from "../../middleware/context";

const userRepo = new userRepository()
const service = new userServices(userRepo)
const userResolvers = {
    Query: {
        me: async(_ , __ , context )=>{
            const user = auth(context)
            if (!user) {
                throw new Error("here")
            }
            return user
        }
    },
    Mutation : {
        addUser :async (_ : string, {input} )=>{
            const user = await service.addUserServices(input.email , input.name , input.password)
            return  user 
        },
        login : async (_  :string , {input})=>{
            const token = await service.loginServices(input.email , input.password)
            console.log(token);
            return token
        }

    }
}

export default userResolvers
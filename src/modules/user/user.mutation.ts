import User from "./user.model";
import userServices from "./user.service";
import userRepository from "./user.repo";

const userRepo = new userRepository()
const service = new userServices(userRepo)
const userResolvers = {
    Query: {
        me: (_ : string, {id})=>{
            const user = User.findByPk(id)
            return user
        }
    },
    Mutation : {
        addUser :async (_ : string, {input} )=>{
            const user = await service.addUserServices(input.email , input.name , input.password)
            return  user 
        },
        login : async (_  :string , {in : {email ,password }})=>{
            const id = await service.loginServices(email , password)
            return id
        }

    }
}

export default userResolvers
import auth from "../../middleware/context";
import { Resolvers, User } from "../../types";
import userRepository from "../user/user.repo";
import userServices from "../user/user.service";
import likeRepository from "./like.repo";
import likeServices from "./like.service";
const repository = new likeRepository
const service = new likeServices(repository)
const UserRepo = new userRepository
const userService = new userServices(UserRepo)
const likeResolvers : Resolvers = {
    Post : {
        likes : async ({id})=>{
            return await  service.getPostLikes(id)
        }
    },
    Like:{
        user : async ({userId})=>{
            return userService.getUserByIdServices(userId)
        }
    },
    Mutation : {
        Like : async (_ : {} , {postId} , context)=>{
            const user : User = await auth(context)
            if(!user){
                throw new Error("Not authorized")
            }
            return service.addLike(postId , user.id)
        },
    }
}

export default likeResolvers
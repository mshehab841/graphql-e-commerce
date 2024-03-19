import auth from "../../middleware/context";
import { Resolvers, User } from "../../types";
import userRepository from "../user/user.repo";
import PostRepo from "./post.repo";
import postServices from "./post.service";

const repository = new PostRepo
const UserRepo = new userRepository
const services = new postServices(repository)

const postResolvers : Resolvers = {
    Post : { 
        author : ({userId})=>{
            console.log(userId);
            return UserRepo.getUserById(userId)
        }
    },
    Query :{
        getPost : (_:{} , {id})=>{
            return services.getPostByIdServices(id)
        },
        getPosts : ()=>{
            return services.getPostsServices()
        },
        getUserPosts : (_:{} , {userId})=>{
            return services.getUserPostsServices(userId)
        }
    },
    Mutation :{
        createPost : async  (_:{} , {input} , context)=>{
            const user : User = await auth(context)
            if(!user){
                throw new Error("Not authorized")
            }
            return services.createPostServices(input , user.id)
        },
        updatePost : (_:{} , {id , input} )=>{
            return services.updatePostServices(id , input)
        },
        deletePost :async (_:{} , {id} , context)=>{
            const user : User = await auth(context)
            if(!user){
                throw new Error("Not authorized")
            }
            return services.deletePostServices(id , user.id)
        },
        UploadPhoto : async (_ : {} , {file} , context )=>{
            const user : User = await auth(context)
            if (!user) {
                throw new Error("Not authorized")
            }
            const res = await services.uploadPhotoServices(file , user.id)
            return res
        }
    }
    

} 
export default postResolvers
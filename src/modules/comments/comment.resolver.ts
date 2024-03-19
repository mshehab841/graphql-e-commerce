import auth from "../../middleware/context";
import { Resolvers } from "../../types";
import commentRepo from "./comment.repo";
import commentServices from "./comment.service";

const repository = new commentRepo
const services = new commentServices(repository)

const commentResolver : Resolvers = {
    Post : {
        comments : ({id})=>{
            return services.getCommentsByPostId(id)
        }
    },
    Query:{
        getComment : (_:{} , {id})=>{
            return services.getCommentServices(id)
        }
    },
    Mutation : {
        createComment : async(_:{} , {input} , context)=>{
            const user = await auth(context)
            if(!user){
                throw new Error("Not authorized")
            }

            return await services.createCommentServices(input , user.id)
        },
        deleteComment : async (_:{} , {id} , context)=>{
            const user = await auth(context)
            if(!user){
                throw new Error("Not authorized")
            }
            return await services.deleteCommentServices(id , user.id)
        }
    }
} 


export default commentResolver
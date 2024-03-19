import { Comment, CreateCommentInput } from "../../types"
import Comments from "./comment.model"

class commentRepo {
    async createComment (input: CreateCommentInput, userId : number ): Promise<Comment>{
        const comment = await Comments.create({
            content : input.content,
            userId : userId,
            postId : input.postId
        })
        if(!comment){
            throw new Error("Comment not created")
        }
        return comment.toJSON()
    } 
    async getCommentById(commentId : number):Promise<Comment>{
        const comment = await Comments.findByPk(commentId)
        if(!comment){
            throw new Error("Comment not found")
        }
        return comment.toJSON()
    }
    async deleteComment(commentId : number):Promise<void>{
        const comment = await Comments.findByPk(commentId)
        if(!comment){
            throw new Error("Comment not found")
        }
        await comment.destroy()
    }
    async getCommentsByPostId(postId : number):Promise<Comment[]>{
        const comments :any = await Comments.findAll({
            where : {
                postId
            }
        })
        if(!comments){
            throw new Error("Comments not found")
        }
        return comments as Comment[]
    }
}

export default commentRepo
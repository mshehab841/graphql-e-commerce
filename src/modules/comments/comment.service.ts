import { Comment, CreateCommentInput } from "../../types";
import commentRepo from "./comment.repo";

class commentServices {
    private readonly CommentRepo : commentRepo
    constructor(commentRepo : commentRepo){
        this.CommentRepo = commentRepo
    }
    async createCommentServices (input : CreateCommentInput , userId : number):Promise<Comment>{
        console.log("here");
        const comment = await this.CommentRepo.createComment(input , userId)
        if (!comment) {
            throw new Error("Comment not created")
        }
        return comment
    }
    async deleteCommentServices(commentId : number , userId : number):Promise<string>{
        const comment : Comment = await this.CommentRepo.getCommentById(commentId)
        if(!comment){
            throw new Error("Comment not found")
        }
        if(comment.userId !== userId){
            throw new Error("You are not authorized to delete this comment")
        }
        await this.CommentRepo.deleteComment(commentId)
        return "Comment deleted successfully"
    }
    async getCommentsByPostId(postId : number):Promise<Comment[]>{
        const comments = await this.CommentRepo.getCommentsByPostId(postId)
        if(!comments){
            throw new Error("Comments not found")
        }
        return comments
    }
    async getCommentServices(commentId : number):Promise<Comment>{
        const comment = this.CommentRepo.getCommentById(commentId)
        if(!comment){
            throw new Error("Comment not found")
        }
        return comment
    }
}
export default commentServices
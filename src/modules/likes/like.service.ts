import { LikeResponse } from "../../types";
import likeRepository from "./like.repo";

class likeServices  {
    constructor(private readonly likeRepo : likeRepository){
        this.likeRepo = likeRepo
    }
    async addLike(PostedId : number , userId : number):Promise<string>{
        const found = await this.likeRepo.checkLike(PostedId , userId)
        if(found){
            await this.likeRepo.deleteLike(PostedId , userId)
            return "unliked" 
        }else{
            await this.likeRepo.addLike(PostedId , userId)
            return "liked"
        }
    }
    async getPostLikes(PostId : number):Promise<LikeResponse>{
        const Likes = await this.likeRepo.getLikes(PostId)
        return {
            count : Likes.count,
            likes : Likes.rows.map(like=>{
                return {
                    userId : like.userId,
                    postId : like.postId,
                    Id : like.id
                }
            })
        }
    }
}
export default likeServices
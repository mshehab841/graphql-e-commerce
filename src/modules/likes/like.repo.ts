import { Like } from "../../types";
import like from "./like.model";

export interface LikeResponse {
    likes : Like[]
    count : number
}

class likeRepository {
    async addLike(postId : number , userId : number):Promise<void>{
        await like.create({
            postId,
            userId
        })
    }
    async checkLike(postId : number , userId : number):Promise<boolean>{
        const found = await like.findOne({
            where : {
                postId,
                userId
            }
        })
        if(found){
            return true
        }
        return false
    }

    async deleteLike(postId : number , userId : number):Promise<Boolean>{
       const res =  await like.destroy({
            where :{
                userId,
                postId
            }
        })
        if (!res){
            throw new Error("Like not found")
        }
        return true

    }
    async getLikes(PostId : number) : Promise<any>{
        const Likes  = await like.findAndCountAll({
            where : {
                postId : PostId
            }
        })
        return Likes 
    }
}

export default likeRepository   
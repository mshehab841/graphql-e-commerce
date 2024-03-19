import { CreatePostInput, Post, UpdatePostInput, UpdatePostRes } from "../../types";
import PostRepo from "./post.repo";
class postServices {
    private readonly postRepo : PostRepo 

    constructor(postRepo : PostRepo) {
        this.postRepo = postRepo
    }
    async getPostByIdServices  (id : number):Promise<Post>{
        const post = await this.postRepo.getPostById(id)
        if(!post){
            throw new Error("Post not found")
        }
        return post
    }
    async createPostServices (input : CreatePostInput , userId : number):Promise<Post>{
        const post = await this.postRepo.createPost(input , userId)
        if(!post){
            throw new Error("Post not created")
        }
        return post
    }
    async updatePostServices (id : number , input : UpdatePostInput):Promise<UpdatePostRes>{
        const post = await this.postRepo.updatePost(id , input)
        if(!post){
            throw new Error("Post not updated")
        }
        return {data : post , message :"updated Successfully"}
    }
    async deletePostServices (id : number , userId : number):Promise<string>{
        const post : Post = await this.postRepo.getPostById(id)
        if(!post){
            throw new Error("Post not found")
        }
        if(post.userId !== userId){
            throw new Error("You are not authorized to delete this post")
        }
            await this.postRepo.deletePost(id)
            return "Post deleted successfully"
    }
    async getPostsServices ():Promise<Post[]>{
        const posts = await this.postRepo.getPosts()
        if(!posts){
            throw new Error("Posts not found")
        }
        return posts
    }
    async getUserPostsServices (userId : number):Promise<Post[]>{
        const posts = await this.postRepo.getUserPosts(userId)
        if(!posts){
            throw new Error("Posts not found")
        }
        return posts
    }
    async uploadPhotoServices (file : any , userId : number):Promise<string>{
        const response = await this.postRepo.uploadPhoto(file , userId)
        if (!response) {
            throw new Error("Photo not uploaded")
        }
        return "Photo uploaded successfully"
    }
}
export default postServices
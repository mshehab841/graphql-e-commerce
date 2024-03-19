import { CreatePostInput, Post, UpdatePostInput } from "../../types";
import Posts from "./post.model";
import path from "path";
import cloudinary from "../../utils/cloudinary";
class PostRepo {
    async getPostById (id : number) : Promise<Post > {
        const post  = await  Posts.findByPk(id)
        if(!post){
            throw new Error("Post not found")
        }
        return post.toJSON()
    }
    async createPost (input: CreatePostInput, userId : number):Promise<Post>{
        const mainDir = path.dirname(require.main!.filename)
        const images = input.image.map(async (Image)=>{
            const imagePath = `${mainDir}/uploads/${Image}`;
            const result = await cloudinary.uploader.upload(imagePath)
            return result.secure_url
        })
        const imageURLs = await Promise.all(images)
        const Post =await Posts.create({
            title : input.title,
            content : input.content,
            image : imageURLs,
            userId : userId
        })
        if(!Post){
            throw new Error("Post not created")
        }
        return Post.toJSON()
    }
    async updatePost (id : number , input : UpdatePostInput):Promise<Post>{
        const post = await Posts.findByPk(id)
        if(!post){
            throw new Error("Post not found")
        }
        await post.update(input)
        return post.toJSON()
    }
    async deletePost (id : number) : Promise<void>{
        const post = await Posts.findByPk(id)
        if(!post){
            throw new Error("Post not found")
        }
        await post.destroy()
    }
    async getPosts ():Promise<Post[]>{
        const posts  : any = await Posts.findAll()
        if(!posts){
            throw new Error("Posts not found")
        }
        return posts as Post[]
    }
    getUserPosts (userId : number):Promise<Post[]>{
        const posts : any = Posts.findAll({
            where : {
                userId
            }
        })
        if(!posts){
            throw new Error("Posts not found")
        }
        return posts 
    }
    async uploadPhoto (file : any , userId : number):Promise<boolean>{
        const mainDir = path.dirname(require.main!.filename)
        const imagePath = `${mainDir}/uploads/${file}`;
        const result = await cloudinary.uploader.upload(imagePath)
        const imageURL = result.secure_url

        const response = await Posts.update({
            photo : imageURL
        }, {
            where : {
                userId
            }
        })
        if (!response) {
            throw new Error("Photo not uploaded")
        }
        return true
    }
}
export default PostRepo
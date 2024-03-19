import Users from "./user.model"
import { Address } from "./user.model"
import { Addresses, Post } from "../../types"
import { CreateAddressInput, User } from "../../types"
import Posts from "../post/post.model"
import cloudinary from "../../utils/cloudinary"
import path from "path"
class userRepository {
    async createUser (email : string , name : string  , photo : string, password : string) : Promise<User> {
        const user = await Users.create({
            email,
            name,
            photo,
            password,
        })
        return user.toJSON()
    }
     getUserByEmail  = async (email : string)  : Promise<User | null>=>{

        const user  = await Users.findOne({
            where : {
                email
            }
        })
        if (!user) {
            return null; // Return null if user is not found
        }
        return user!.toJSON()
    }
    async getUserById(id : number ) : Promise<User>{
        const user  = await  Users.findByPk(id)
        if (!user) {
            throw new Error("User not found")
        }
        return user.toJSON()
    }
    async verifiedUser(id : number) : Promise<void>{
        const user : any = await Users.findByPk(id)
        if (!user) {
            throw new Error("User not found")
        }
        user.verified = true
        await user.save()
    }
    async saveOTP(OTP :string  , user :any): Promise<void>{
        user.OTP  = OTP
        await user.save()
    }
    async changePassword(password : string , email : string):Promise<void>{
       const user : any =  await this.getUserByEmail(email)
        user.password = password 
        await user.save()
    }
    async updateUsername(username : string , id : number):Promise<User>{
        const user : any =  await Users.findByPk(id)
        user.name = username
        await user.save()
        return user.toJSON()
    }
    async createAddresses(input : CreateAddressInput , userId : number):Promise< Addresses| null>{
        const address = await Address.create({
            ...input,
            userId
        })
        if (!address) {
            throw new Error("Address not created")
        }
        return address.toJSON()
    }
    async getDefaultAddress(userId : number):Promise<Addresses | null>{
        const address = await Address.findOne({
            where : {
                userId,
                isDefault : true
            }
        })
        if (!address) {
            return null
        }
        return address.toJSON()
    }
    async updateDefaultAddress(id : number):Promise<void>{
        const address : any = await Address.findByPk(id)
        if (!address) {
            throw new Error("Address not found")
        }
        address.isDefault = false
        await address.save()
    }
    async getAddressByUserId(id : number):Promise<Addresses[] | null>{
        const address = await Address.findAll({
            where : {
                userId : id
            }
        })
        if (!address) {
            return null
        }
        return address as Addresses[]
    }
    async getPostByUserId(id : number):Promise<Post[] | null >{
        const Post : any  = await Posts.findAll({
            where : {
                userId : id
            }
        })
        if (!Post) {
            return null
        }
        return Post as Post[]
    }
    async uploadPhoto (file : any , userId : number):Promise<Boolean>{
        const mainDir = path.dirname(require.main!.filename)
        const imagePath = `${mainDir}/uploads/${file}`;
        const result = await cloudinary.uploader.upload(imagePath)
        const imageURL = result.secure_url

        const response = await Users.update({
            photo : imageURL
        }, {
            where : {
                id : userId
            }
        })
        if (!response) {
            throw new Error("Photo not uploaded")
        }
        return true
    }
}
export type userRepoType =  userRepository
export default userRepository
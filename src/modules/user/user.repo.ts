import Users from "./user.model"

import { User } from "../../types"

class userRepository {
    async createUser (email : string , name : string , password : string) : Promise<User> {
        const user = await Users.create({
            email,
            name,
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
        const user = await  Users.findByPk(id)
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
}
export type userRepoType =  userRepository
export default userRepository
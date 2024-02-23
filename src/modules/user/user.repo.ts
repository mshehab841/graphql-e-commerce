import Users from "./user.model"

import { User } from "../../types"

class userRepository {
    async createUser (email : string , name : string , password : string) : Promise<User> {
        const user = await Users.create({
            email,
            name,
            password
        })
        return user.toJSON()
    }
    async getUserByEmail (email : string) : Promise<User> {

        const user = await Users.findOne({
            where : {
                email
            }
        })
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
}
export type userRepoType =  userRepository
export default userRepository
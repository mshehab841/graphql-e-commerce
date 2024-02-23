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
}
export type userRepoType =  userRepository
export default userRepository
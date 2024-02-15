import { userType } from "../../utils/type"
import User from "./user.model"


class userRepository {
    async createUser (email : string , name : string , password : string) : Promise<userType> {
        const user = await User.create({
            email,
            name,
            password
        })
        return user.toJSON()
    }
    async getUserByEmail (email : string) : Promise<any | null> {
        const user = await User.findOne({
            where : {
                email
            }
        })
        return user
    }
}
export type userRepoType =  userRepository
export default userRepository
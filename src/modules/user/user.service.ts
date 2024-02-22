import bcrypt from "bcrypt"
import  { userRepoType } from "./user.repo";
import { generateTwoToken } from "../../middleware/deserialize-user";
import { User, UserRes } from "../../types";



class userServices { 
    private readonly userRepo: userRepoType;

    constructor (userRepo : userRepoType) {
        this.userRepo = userRepo
    }
    async addUserServices (email : string , name : string , password : string):Promise<User>{
        if (!email || !name || !password) {
            throw new Error("All fields are required")
        }
        const userFound = await this.userRepo.getUserByEmail(email)
        if (userFound) {
            throw new Error("User already exists")
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        const user = await this.userRepo.createUser(email , name , hashedPassword)
        return user
    }
    async loginServices (email : string , password : string ):Promise<UserRes> {
        if (!email || !password){
            throw new Error("All fields are required")
        }
        const user = await this.userRepo.getUserByEmail(email)
        if (!user){
            throw new Error("User not found")
        }
        const match = await bcrypt.compare(password , user.password)
        if (!match){
            throw new Error("Wrong password")
        }
        const token = generateTwoToken(user.id)
        return token
    }
}
export default userServices
import userServices from "./user.service";
import userRepository from "./user.repo";
import auth from "../../middleware/context";
import {LoginInput, Resolvers , AddUserInput, User, UserRes, Addresses, Post} from "../../types"
const userRepo = new userRepository()
const service = new userServices(userRepo)

const userResolvers : Resolvers = {
    User:{
        addresses : async ({id} : {id : number}) : Promise<Addresses[]>=>{
            const address = await service.getAddressServices(id)
            return address
        },
        posts: async ({ id }: { id: number }): Promise<Post[]> => {
            const post = await userRepo.getPostByUserId(id);
            if (!post) {
                throw new Error("Post not found");
            }
            return post; // Should be fine now
        }
    },

    Query: {
        me: async(_  : {}, __ : {} , context ) : Promise<User>=>{
            const user : User  = await auth(context)
            if (!user) {
                throw new Error("Not authorized")
            }
            return user
        },
        getUserById : async (_ : {} , {id} : {id : number}) : Promise<User>=>{
            const user = await service.getUserByIdServices(id)
            return user
        }

    },
    Mutation : {
        addUser :async (_  : {}, {input} : {input : AddUserInput}) : Promise<User>=>{
            const user = await service.addUserServices(input)
            return  user 
        },
        login : async (_ : {} , {input}: {input : LoginInput}) : Promise<UserRes>=>{
            const token = await service.loginServices(input.email , input.password)
            console.log(token);
            return token 
        },
        verifyEmail : async (_ : {} , {verificationToken})=>{
            const response =  await service.verifyEmailServices(verificationToken)
            return response
        },
        resendVerificationEmail : async (_ : {} , {email})=>{
            const response =  await service.resendVerificationEmailServices(email)
            return response
        },
        resetPassword : async (_ : {} , {email})=>{
            const res = await service.PasswordResetServices(email)
            return res
        },
        confirmOTP : async (_ : {} , {OTP} , context)=>{
            const user : User = await auth(context)
            if (!user) {
                throw new Error("Not authorized")
            }
            await service.confirmOtpServices(OTP , user.email!)
            return "OTP Confirmed"

        },
        confirmResetPassword : async (_ : {} ,{password , confirmPassword ,email})=>{
            const res = await service.resetServices(password,confirmPassword,email)
            return res
        },
        updateUsername : async(_ : {}  , {username} , context)=>{
            const user : User = await auth(context)
            if (!user) {
                throw new Error("Not authorized")
            }
            const res = await service.updateUsernameServices(username , user.id)
            return res
        },
        createAddresses : async (_ : {} , {input} , context)=>{
            const user : User = await auth(context)
            if (!user) {
                throw new Error("Not authorized")
            }
            const res = await service.createAddressServices(input , user.id)
            return res
        },
        enable2FA : (_:{} , {email})=>{
            const res = service.enable2FAservices(email)
            return res
        },
        UploadPhoto : async (_ : {} , {file} , context )=>{
            const user : User = await auth(context)
            if (!user) {
                throw new Error("Not authorized")
            }
            const res = await service.uploadPhotoServices(file , user.id)
            return res
        }
    },

}

export default userResolvers
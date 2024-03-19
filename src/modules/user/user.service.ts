import bcrypt from "bcrypt";
import { userRepoType } from "./user.repo";

import { decodedEmailVerification, generateOTP, generateTwoToken, verificationToken } from "../../middleware/deserialize-user";
import { AddUserInput, Addresses, CreateAddressInput, User, UserRes } from "../../types";
import { sendForgetPasswordEmail, sendVerificationEmail } from "../../middleware/send-email";
import { generateImageWithText } from "../../middleware/image-generator";

/**
 * in Register :- 
 * verification email{
 *  send email in user gmail
 *  and if he confirm clint side will return a token in query
 *  and should i take this token and extract id 
 * and go to DB and find user and 
 * make filed verified = true
 * and token for verify will be expire after 3m 
 * if expired will click in button resend verification email to resend 
 * and i will take an email  from body  
 * }
 */

class userServices {
    private readonly userRepo: userRepoType;

    constructor(userRepo: userRepoType) {
        this.userRepo = userRepo;
    }
    async addUserServices(input : AddUserInput ): Promise<User> {

        if (!input.email || !input.name || !input.password) {
            throw new Error("All fields are required");
        }
        const userFound = await this.userRepo.getUserByEmail(input.email);
        if (userFound) {
            throw new Error("User already exists");
        }
        const image =await generateImageWithText(input.name || "")
        input.photo = image
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await this.userRepo.createUser(input.email, input.name,input.photo, hashedPassword);
        const token = verificationToken(user.id)
        sendVerificationEmail(input.email,token)
        return user;
    }
    async loginServices(email: string, password: string): Promise<UserRes> {
        if (!email || !password) {
            throw new Error("All fields are required");
        }
        const user  = await this.userRepo.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");

        }
        console.log(user);
        const match = await bcrypt.compare(password, user.password!);
        if (!match) {
            throw new Error("Wrong password");
        }
        if(!user.verified){
            throw new Error("Please Verify Your Email")
        }
        const token = generateTwoToken(user.id);
        return token;
    }
    async getUserByIdServices(id : number ):Promise<User>{
        const user = await this.userRepo.getUserById(id)
        if (!user) {
            throw new Error("User not found");
        }
        return user
    }
    async verifyEmailServices(verificationToken : string): Promise<string> {
        const decoded = decodedEmailVerification(verificationToken)
        await this.userRepo.verifiedUser(decoded.userId)
        return "Email Verified"
    }
    async resendVerificationEmailServices(email : string):Promise<string> {
        const user = await this.userRepo.getUserByEmail(email)
        if (!user) {
            throw new Error("User not found");
        }
        if(user.verified){
            throw new Error("Email already verified")
        }
        const token = verificationToken(user.id)
        sendVerificationEmail(email,token)
        return "Email Sent"
    }
    async PasswordResetServices(email : string): Promise<string>{
        const user = await this.userRepo.getUserByEmail(email)
        if (!user){
            throw new Error("User not found")
        }
        const OTP = generateOTP()
        await this.userRepo.saveOTP(OTP , user)
        sendForgetPasswordEmail(email ,OTP )
        return "check your email and reset password"
    }
    async confirmOtpServices(OTP : string , email : string) : Promise<string>{
        const user = await this.userRepo.getUserByEmail(email)
        if(!user ){
            throw new Error("Email not found")
        }
        if(user && user.OTP === OTP ){

            return "confirmation success"
        }
        return "Confirmation fail"
    } 
    async resetServices(password : string  , confirmPassword : string , email : string  ):Promise<string>{
        const user  = await this.userRepo.getUserByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        if(password === confirmPassword){
            const hashedPassword = await bcrypt.hash(password, 10);
            this.userRepo.changePassword(hashedPassword , email)
            return "password updated successfully"
        }else{
            return"something caused Error"
        }
    }
    async updateUsernameServices(username : string , userId : number) : Promise<string>{
       const response =  await this.userRepo.updateUsername(username , userId)
       if (!response) {
        throw new Error("User not found")
        }else{
        return "username updated successfully"
        }
    }
    async createAddressServices(input : CreateAddressInput , userId : number ): Promise<Addresses>{
        if (!input) {
            throw new Error("All fields are required");
        }
        if(input.isDefault === true){
            const defaultAddress : any = await this.userRepo.getDefaultAddress(userId)
            console.log(defaultAddress);
            if(defaultAddress){
                await this.userRepo.updateDefaultAddress(defaultAddress.id)
            }
        }
        const newAddress = await this.userRepo.createAddresses(input , userId)
        if (!newAddress) {
            throw new Error("Address not created")
        }
        return newAddress
    }
    async getAddressServices(userId : number):Promise<Addresses[]>{
        const address = await this.userRepo.getAddressByUserId(userId)
        if (!address) {
            throw new Error("Address not found")
        }
        return address
    }
    async enable2FAservices(email : string):Promise<string>{
        const user = await this.userRepo.getUserByEmail(email)
        if(!user){
            throw new Error("User not found")
        }
        const token = verificationToken(user.id)
        sendVerificationEmail(email,token)
        return "2FA enabled"
    }
    async uploadPhotoServices(file : any , userId : number ): Promise<string>{
        const response = await this.userRepo.uploadPhoto(file , userId)
        if (!response) {
            throw new Error("Photo not uploaded")
        }
        return "Photo uploaded successfully"
    }

}
export default userServices;

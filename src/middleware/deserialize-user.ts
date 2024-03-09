import  jwt, { JwtPayload }  from "jsonwebtoken"
interface TwoToken { 
    accessToken : string
    refreshToken : string
}
export function generateTwoToken (id : number):TwoToken{
    const accessToken = jwt.sign( {id}  , process.env.TOKEN_Auth as string , {expiresIn : "1m"})
    const refreshToken = jwt.sign( {id}, process.env.TOKEN_REFRESH  as string , {expiresIn : "1d"})
    return {
        accessToken,
        refreshToken
    }
}
export function verifyAccessToken (accessToken :string ): string | JwtPayload {
       const decoded =  jwt.verify(accessToken , process.env.TOKEN_AUTH as string)
       return decoded
}
export function validateRefreshToken (refreshToken :string ):number {
    const decoded =  jwt.verify(refreshToken , process.env.TOKEN_REFRESH as string) as {id : number}
    if (!decoded) {
        throw new Error('Invalid refresh token')
    }
    return decoded.id
}
export function generateNewAccessToken (userId : number ):string {
    const accessToken = jwt.sign( {userId}  , process.env.TOKEN_AUTH as string , {expiresIn : "1m"})
    return accessToken
}

export function verificationToken(userId : number ){
    const verificationToken = jwt.sign( {userId}  , process.env.VERIFICATION_TOKEN as string , {expiresIn : "1h"})
    return verificationToken
}

export function decodedEmailVerification(token : string){
    const decoded = jwt.verify(token , process.env.VERIFICATION_TOKEN as string) as {userId : number}
    return decoded
}
export function generateOTP (){
    const digits = '0123456789'
    let OTP = ''
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)]
    }
    return OTP
}
import  jwt, { JwtPayload }  from "jsonwebtoken"
interface TwoToken { 
    accessToken : string
    refreshToken : string
}
export function generateTwoToken (id : string):TwoToken{
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
export function validateRefreshToken (refreshToken :string ):string {
    const decoded =  jwt.verify(refreshToken , process.env.TOKEN_REFRESH as string) as {id : string}
    if (!decoded) {
        throw new Error('Invalid refresh token')
    }
    return decoded.id
}
export function generateNewAccessToken (userId : string ):string {
    const accessToken = jwt.sign( {userId}  , process.env.TOKEN_AUTH as string , {expiresIn : "1m"})
    return accessToken
}
import User from '../modules/user/user.model'
import { generateNewAccessToken, validateRefreshToken, verifyAccessToken } from './deserialize-user'

const auth = async ({req , res })=>{
    const accessToken : string = req.headers.authorization.split(' ')[1]
    const refreshToken : string = req.headers['x-refresh-token']
    if (!accessToken && !refreshToken){
        throw new Error('Not authorized')
    }
    if(accessToken){
        try {
            const decoded  : any = verifyAccessToken(accessToken)
            const user = await User.findByPk(decoded.id)
            if(!user){
                throw new Error('user not found')
            }
            return user
        } catch (err) {
            if(!refreshToken){
                throw new Error('Not authorized')
            }
            const userId = validateRefreshToken(refreshToken)
            const newAccessToken = generateNewAccessToken(userId)
            res.setHeader('authorization' , `Bearer ${newAccessToken}`)
            const user = await User.findByPk(userId)
            if(!user){
                throw new Error('user not found')
            }
            return user 
        }
    }
    if(refreshToken){
        const userId = validateRefreshToken(refreshToken)
        const newAccessToken = generateNewAccessToken(userId)
        res.setHeader('authorization' , `Bearer ${newAccessToken}`)
        const user = await User.findByPk(userId)
        if(!user){
            throw new Error('user not found')
        }
        return user
    }
 
}

export default auth
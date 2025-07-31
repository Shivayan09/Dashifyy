import jwt from 'jsonwebtoken'

const userAuth = async(req, res, next) => {
    const {token} = req.cookies
    if(!token) {
        return res.json({
            success: false,
            message: "Log in again!"
        })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id) {
            req.body = req.body || {}
            req.body.userId = tokenDecode.id
        } else {
            return res.json({
                success: false,
                message: "Log in again!"
            })
        }
        next()
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export default userAuth
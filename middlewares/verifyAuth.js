const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.sendStatus(401)
    }

    const decoded = jwt.decode(token)

    if (!decoded?.user) {
        return res.sendStatus(401)
    }
    
    req.user = decoded.user

    next()
}
module.exports = (req, res, next) => {    
    if (req.user.type === 'admin') {
        return next()
    }

    return res.sendStatus(403)
}
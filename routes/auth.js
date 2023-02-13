const { check } = require('express-validator')
const { login, register, auth } = require('../controllers/auth.js')
const verifyAuth = require('../middlewares/verifyAuth.js')

const router = require('express').Router()

router.get('/', verifyAuth, auth)

router.post(
    '/login',
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must contain minimum 6 characters').isLength({ min: 6 })
    ],
    login
)

router.post(
    '/register',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must contain minimum 6 characters').isLength({ min: 6 })
    ],
    register
)



module.exports = router
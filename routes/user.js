const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.js')
const { check } = require('express-validator')
const catchErrors = require('../middlewares/catchErrors.js')
const User = require('../models/User.js')

const router = require('express').Router()

router.get('/', getUsers)
router.post('/',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must contain minimum 6 characters').isLength({ min: 6 })
    ],
    catchErrors,
    createUser
)

router.put('/:id',
    [
        check('name', 'Name is required').notEmpty(),
        check('email')
            .isEmail().withMessage('Email is not valid')
            .custom(async (email, { req }) => {
                const user = await User.findOne({ where: { email } });

                if (!user || user.id == req.params.id) {
                    return Promise.resolve();
                }
                return Promise.reject();
            }).withMessage('Email already exists')
        ,
    ],
    catchErrors,
    updateUser
)

router.delete('/:id', deleteUser)


module.exports = router
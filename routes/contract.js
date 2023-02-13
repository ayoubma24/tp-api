const { getContracts, createContract, updateContract, deleteContract } = require('../controllers/contract.js')
const { upload } = require('../middlewares/multer.js')
const { check } = require('express-validator')
const catchErrors = require('../middlewares/catchErrors.js')

const router = require('express').Router()

router.get('/', getContracts)
router.post('/',
    upload.single('document'),
    [
        check('title', 'title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('ClientId', 'Client is required').notEmpty(),
        check('amount').isNumeric().withMessage('Amount is must be avalid number').isLength({ min: 1 }).withMessage('Minimum amount is 1'),
        check('document').custom((value, { req }) => {
            if (req?.file !== undefined) {
                return Promise.resolve()
            }
            return Promise.reject()
        }).withMessage('Document is requried'),
        check('document').custom((value, { req }) => {
            if (req?.file && (req?.file?.size / (1024 * 1024)) > 20) {
                return Promise.reject()
            }
            return Promise.resolve()
        }).withMessage('Document maximum size is 20MB')
    ],
    catchErrors,
    createContract
)
router.put('/:id',
    upload.single('document'),
    [
        check('title', 'title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('ClientId', 'Client is required').notEmpty(),
        check('amount').isNumeric().withMessage('Amount is must be avalid number').isLength({ min: 1 }).withMessage('Minimum amount is 1'),
        check('document').custom((value, { req }) => {
            if (req?.file && (req?.file?.size / (1024 * 1024)) > 20) {
                return Promise.reject()
            }
            return Promise.resolve()
        }).withMessage('Document maximum size is 20MB')
    ],
    catchErrors,
    updateContract
)
router.delete('/:id', deleteContract)


module.exports = router
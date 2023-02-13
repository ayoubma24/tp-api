const { getTransactions, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.js')
const { check } = require('express-validator')
const catchErrors = require('../middlewares/catchErrors.js')
const router = require('express').Router()

router.get('/', getTransactions)
router.post('/',
    [
        check('name', 'Name is requried').notEmpty(),
        check('description', 'Description is requried').notEmpty(),
        check('amount').isNumeric().withMessage('Amount is must be avalid number').isLength({ min: 1 }).withMessage('Minimum amount is 1'),
        check('date', 'Date is requried').notEmpty(),
        check('type', 'Type is requried').notEmpty(),
        check('monthOfArjudication', 'Month of arjudication is required').notEmpty(),
        check('clasification', 'Clasification is required').notEmpty(),
    ],
    catchErrors,
    createTransaction
)
router.put('/:id',
    [
        check('name', 'Name is requried').notEmpty(),
        check('description', 'Description is requried').notEmpty(),
        check('amount').isNumeric().withMessage('Amount is must be avalid number').isLength({ min: 1 }).withMessage('Minimum amount is 1'),
        check('date', 'Date is requried').notEmpty(),
        check('type', 'Type is requried').notEmpty(),
        check('monthOfArjudication', 'Month of arjudication is required').notEmpty(),
        check('clasification', 'Clasification is required').notEmpty(),
    ],
    catchErrors,
    updateTransaction
)
router.delete('/:id', deleteTransaction)


module.exports = router
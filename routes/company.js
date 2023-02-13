const { getCompanies, createCompany, updateCompany, deleteCompany } = require('../controllers/company.js')
const { check } = require('express-validator')
const catchErrors = require('../middlewares/catchErrors.js')


const router = require('express').Router()

router.get('/', getCompanies)
router.post('/',
    [
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('UserId', 'User is required').notEmpty(),
    ],
    catchErrors,
    createCompany
)
router.put('/:id', updateCompany)
router.delete('/:id', deleteCompany)


module.exports = router
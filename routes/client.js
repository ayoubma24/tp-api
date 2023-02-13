const { getClients, createClient, updateClient, deleteClient } = require('../controllers/client.js')
const { check } = require('express-validator')
const catchErrors = require('../middlewares/catchErrors.js')
const router = require('express').Router()

router.get('/', getClients)
router.post('/',
    [
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('CompanyId', 'Company is required').notEmpty(),
    ],
    catchErrors,
    createClient
)
router.put('/:id',
    [
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('CompanyId', 'Company is required').notEmpty(),
    ],
    catchErrors,
    updateClient
)
router.delete('/:id', deleteClient)


module.exports = router
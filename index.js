require('dotenv').config()

const express = require('express')
const cors = require('cors')
const db = require('./db/index.js')
const verifyAuth = require('./middlewares/verifyAuth.js')
const verifyAdmin = require('./middlewares/verifyAdmin.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//database connect_
db
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Unable to connect to the database:', err));
db.sync()
    .then(() => console.log('All tables synced successfully'))
    .catch(err => console.error('Error syncing tables:', err));





//routes
app.use('/auth', require('./routes/auth.js'))
app.use('/clients', verifyAuth, verifyAdmin, require('./routes/client.js'))
app.use('/companies', verifyAuth, verifyAdmin, require('./routes/company.js'))
app.use('/contracts', verifyAuth, verifyAdmin, require('./routes/contract.js'))
app.use('/transactions', verifyAuth, verifyAdmin, require('./routes/transaction.js'))
app.use('/users', verifyAuth, verifyAdmin, require('./routes/user.js'))



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(['Server running at port:', PORT].join('')))
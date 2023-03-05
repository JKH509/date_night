const express = require('express')
const app = express()
const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' })
} else { 
  dotenv.config()
}
const PORT = process.env.PORT || 5001

// const dbConfig = require('./db/connections.js')


const usersRouter = require('./src/routes/userRoutes/userRoutes')();
const registrationsRouter = require('./src/routes/loginRoutes/registrationRoutes')();
const loginRouter = require('./src/routes/loginRoutes/loginRoutes')();


app.use('/api', usersRouter);
app.use('/api', registrationsRouter);
app.use('/api', loginRouter);








app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
const express = require('express')
const app = express()
const cors = require('cors'); // add this line to import the cors module
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' })
} else { 
  dotenv.config()
}
const PORT = process.env.PORT || 5001;
// const corsOptions = {
//   origin: process.env.FRONTEND_URL, // set a specific origin (or use a function to dynamically determine it)
//   methods: ['GET', 'POST', 'PUT'], // specify which HTTP methods are allowed
//   allowedHeaders: ['Content-Type', 'Authorization'], // specify which headers are allowed
//   exposedHeaders: ['Content-Length'], // specify which headers are exposed to the client
//   credentials: true, // enable sending cookies from the client to the server
//   maxAge: 86400 // cache the preflight result for 1 day (in seconds)
// };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Enable CORS for all routes
// app.use(cors(corsOptions));

const usersRouter = require('./src/routes/userRoutes/userRoutes')();
const advertiserRouter = require('./src/routes/advertiserRoutes/advertiserRoutes')();
const registrationsRouter = require('./src/routes/loginRoutes/registrationRoutes')();
const loginRouter = require('./src/routes/loginRoutes/loginRoutes')();

// enable CORS for all routes
// app.use(cors());

app.use('/api', usersRouter);
app.use('/api', advertiserRouter);
app.use('/api', registrationsRouter);
app.use('/api', loginRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
const express = require('express');
const loginRouter = express.Router();
const loginController = require('../../controllers/loginControllers/loginController');

function router() {
  const {  login } = loginController();

loginRouter.route('/login').post(login);


return loginRouter;
}

module.exports = router;
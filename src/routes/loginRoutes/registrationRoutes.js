const express = require('express');
const registerRouter = express.Router();

const registrationController = require('../../controllers/registrationConrollers/registrationsController');

function router() {
  const {  register } = registrationController();
// Route for registering a new user
   registerRouter.route('/register').post(register);
// router.post('/register', registrationController.register);

return registerRouter;
}

module.exports = router;
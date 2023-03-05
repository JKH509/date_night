const express = require('express');
const userRouter = express.Router();
const userController = require('../../controllers/userControllers/usersControllers');

function router() {
  const { 
    getAllUserAccounts,
    getUserAccountById,
    createUserAccount,
    updateUserAccountById,
    deleteUserAccountById
   } = userController();


  userRouter.route('/users').get(getAllUserAccounts);

  userRouter.route('/users-create').post(createUserAccount)

  userRouter.route('/user/:id')
  .get(getUserAccountById)
  .put(updateUserAccountById)
  .delete(deleteUserAccountById);

return userRouter;
}

module.exports = router;
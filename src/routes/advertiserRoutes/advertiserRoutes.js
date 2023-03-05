const express = require('express');
const advertiserRouter = express.Router();
const advertiserController = require('../../controllers/advertiserControllers/advertiserControllers');

function router() {
  const { 
    getAllAdvertiserAccounts,
    getAdvertiserAccountById,
    createAdvertiserAccount,
    updateAdvertiserAccountById,
    deleteAdvertiserAccountById
   } = advertiserController();


   advertiserRouter.route('/advertisers').get(getAllAdvertiserAccounts);

   advertiserRouter.route('/advertisers-create').post(createAdvertiserAccount)

   advertiserRouter.route('/advertiser/:id')
  .get(getAdvertiserAccountById)
  .put(updateAdvertiserAccountById)
  .delete(deleteAdvertiserAccountById);

return advertiserRouter;
}

module.exports = router;
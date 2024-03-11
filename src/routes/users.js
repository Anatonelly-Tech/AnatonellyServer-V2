const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/user').post((req, res) => userController.create(req, res));

router.route('/user').get((req, res) => userController.getAll(req, res));

router
  .route('/user/:idUser')
  .get((req, res) => userController.getById(req, res));

router
  .route('/userAuth/:email')
  .get((req, res) => userController.getByEmail(req, res));

router
  .route('/user/:idUser')
  .delete((req, res) => userController.delete(req, res));

router
  .route('/user/:idUser')
  .put((req, res) => userController.update(req, res));

router
  .route('/userAtt/:email')
  .put((req, res) => userController.updateByEmail(req, res));

module.exports = router;

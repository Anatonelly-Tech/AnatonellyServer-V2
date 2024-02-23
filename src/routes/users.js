const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/users').post((req, res) => userController.create(req, res));

router.route('/users').get((req, res) => userController.getAll(req, res));

router.route('/users').get((req, res) => userController.getById(req, res));

router.route('/user').get((req, res) => userController.getQueryParms(req, res));

router.route('/users').delete((req, res) => userController.delete(req, res));

router.route('/users').put((req, res) => userController.update(req, res));

module.exports = router;

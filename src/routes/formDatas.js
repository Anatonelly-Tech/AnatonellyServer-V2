const router = require('express').Router();

const formDataController = require('../controllers/formDataController');

router
  .route('/formData')
  .post((req, res) => formDataController.create(req, res));

router
  .route('/formData')
  .get((req, res) => formDataController.getAll(req, res));

router
  .route('/formData/:idForm')
  .get((req, res) => formDataController.getById(req, res));

router
  .route('/formDataName/:name')
  .get((req, res) => formDataController.getByName(req, res));

router
  .route('/formData/:idForm')
  .delete((req, res) => formDataController.delete(req, res));

router
  .route('/formData')
  .put((req, res) => formDataController.update(req, res));

module.exports = router;

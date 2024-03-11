const router = require('express').Router();

const responsibleController = require('../controllers/responsibleController');
router
  .route('/responsible')
  .post((req, res) => responsibleController.create(req, res));

router
  .route('/responsible')
  .get((req, res) => responsibleController.getAll(req, res));

router
  .route('/responsibleAuth/:email')
  .get((req, res) => responsibleController.getByEmail(req, res));

router
  .route('/responsible/:idResponsible')
  .get((req, res) => responsibleController.getById(req, res));

router
  .route('/responsible/:idResponsible')
  .delete((req, res) => responsibleController.delete(req, res));

router
  .route('/responsible/:idResponsible')
  .put((req, res) => responsibleController.update(req, res));

module.exports = router;

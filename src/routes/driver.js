const router = require('express').Router();

const driverController = require('../controllers/driverController');
router
  .route('/driver')
  .post((req, res) => driverController.create(req, res));

router
  .route('/driver')
  .get((req, res) => driverController.getAll(req, res));

router
  .route('/driverAuth/:cpf')
  .get((req, res) => driverController.getByCpf(req, res));

router
  .route('/driver/:idDriver')
  .get((req, res) => driverController.getById(req, res));

router
  .route('/driver/:idDriver')
  .delete((req, res) => driverController.delete(req, res));

router
  .route('/driver/:idDriver')
  .put((req, res) => driverController.update(req, res));

router
  .route('/driverUpdateCPF/:idDriver')
  .put((req, res) => driverController.updateByCpf(req, res));

module.exports = router;

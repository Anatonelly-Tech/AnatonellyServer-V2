const router = require('express').Router();

const usersRouter = require('./users');
const responsibleRouter = require('./responsible');
const formDataRouter = require('./formDatas');
const driverRouter = require('./driver');

router.use('/', usersRouter);
router.use('/', responsibleRouter);
router.use('/', formDataRouter);
router.use('/', driverRouter);

module.exports = router;

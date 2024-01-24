const router = require('express').Router();

const usersRouter = require('./users');
const responsibleRouter = require('./responsible');
const formDataRouter = require('./formDatas');


router.use('/',usersRouter);
router.use('/',responsibleRouter);
router.use('/',formDataRouter)

module.exports = router;
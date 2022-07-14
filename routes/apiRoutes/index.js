const router = require('express').Router();
const { route } = require('../apiRoutes/animalRoutes');
const animalRoutes = require('../apiRoutes/animalRoutes');


router.use(animalRoutes);
router.use(require('./zookeeperRoutes'));
module.exports = router;
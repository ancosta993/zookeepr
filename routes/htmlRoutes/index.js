const router = require('express').Router();
const path = require('path');



// serve the index.html
router.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// serve the animals.html
router.get('/animals', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

// serve the zookepers.html
router.get('/zookeepers', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// wildcard route
router.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
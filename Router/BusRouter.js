const express = require('express');
const router = express();

const { BusController,GetBusController } = require('../Controller/BusController');

router.post('/bus-details',BusController);
router.get('/get-details',GetBusController)


module.exports = router;
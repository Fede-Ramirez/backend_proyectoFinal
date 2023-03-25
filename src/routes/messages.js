const { Router } = require('express');
const { MessageController } = require('../controllers');

const router = new Router();

router.get('/', MessageController.getMessages);
router.post('/', MessageController.createMessage);

module.exports = router;
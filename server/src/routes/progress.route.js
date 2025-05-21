const express = require('express');
const CraftController = require('../controllers/CraftController');
const validateId = require('../middlewares/validateId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const craftRouter = express.Router();

craftRouter.get('/', CraftController.getCrafts);

craftRouter.post('/', verifyAccessToken, CraftController.createCraft);

craftRouter.get('/:id', validateId, CraftController.getCraftById);

craftRouter.patch('/:id', validateId, CraftController.updateCraft);

craftRouter.delete('/:id', validateId, verifyAccessToken, CraftController.deleteOneCraft);

module.exports = craftRouter;
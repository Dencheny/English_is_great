const formatResponse = require('../utils/formatResponse');
const isValidId = require('../utils/isValidId');

module.exports = (req, res, next) => {
  const { id } = req.params;
  if (isValidId(id)) {
    return res.status(400).json(formatResponse(400, 'Put number id'));
  }
  res.locals.id = id;
  return next();
};
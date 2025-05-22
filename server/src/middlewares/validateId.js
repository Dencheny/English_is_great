const formatResponse = require('../utils/formatResponse');
const isValidId = require('../utils/isValidId');

module.exports = (req, res, next) => {
  const { themeId } = req.params;
  //  console.log(typeof(themeId))
    // console.log('test', themeId)
  if (isValidId(themeId)) {
   
    return res.status(400).json(formatResponse(400, 'Put number id'));

  }
  res.locals.id = themeId;
  return next();
};
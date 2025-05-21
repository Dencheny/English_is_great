function isValidId(id) {
  return Number.isNaN(+id);
}

module.exports = isValidId;

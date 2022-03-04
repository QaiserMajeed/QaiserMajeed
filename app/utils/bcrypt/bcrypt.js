const bcrypt = require('bcryptjs');

exports.getHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

exports.comparePassword = async (password, hash) => bcrypt.compare(password, hash);

const EPATeam = require('../../models/EPATeam');

/**
 * @param doc
 * @return {Promise<*>}
 */
exports.create = (doc = {}) => (new EPATeam(doc)).save();

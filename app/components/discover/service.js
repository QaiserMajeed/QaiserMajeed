const discoverIdentityRepository = require('./discover-identity.repository');

exports.getImpacts = async (body) => {
  const ids = body.impacts.map((item) => item._id);
  const impacts = await discoverIdentityRepository.count({
    _id: {
      $in: ids,
    },
    status: 1,
  });
  if (impacts !== ids.length) {
    return false;
  }
  return body.impacts.map((impact) => ({
    _id: impact._id,
    rank: impact.rank || 0,
  }));
};

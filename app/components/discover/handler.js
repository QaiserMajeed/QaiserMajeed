const validator = require('./validator');
const discoverIdentityRepository = require('./discover-identity.repository');
const discoverRepository = require('./repository');
const userRepository = require('../../repositories/user.repository');
const discoverService = require('./service');
const responses = require('../../utils/responses/responses');

exports.getDiscovers = async (req, res) => discoverRepository
  .find({ status: 1 }, { identity_name: 1, description: 1, _id: 1 })
  .then((discovers) => res.json(responses.successful({ discovers })))
  .catch((e) => res.json(responses.error(e.message)));

exports.getIdentities = async (req, res) => {
  try {
    const user = await userRepository.find(
      { _id: req.user._id, status: 1 },
      { _id: 0, identities: 1 },
    );
    if (!user) {
      return res.json(responses.error('User_not_found'));
    }
    const identities = await discoverRepository.findByIds(
      user.identities,
      { status: 1 },
      { identity_name: 1, description: 1 },
    );
    if (identities.length) {
      const impactsIds = identities.map((identity) => identity.discoverIdentity_id);
      const impacts = discoverIdentityRepository.findByIds(
        impactsIds,
        { status: 1 },
        {
          name: 1, _id: 1, discover_id: 1,
        },
      );
      impacts.forEach((impact) => {
        const imp = user.impacts
          .find((e) => e.discoverIdentity_id.toString() === impact._id);
        impact.rank = imp && imp.hasOwnProperty('rank') ? imp.rank : 0;
      });
      user.identities = identities.map((identity) => ({
        ...identity,
        impacts: impacts
          .filter((impact) => impact.discover_id.toString() === identity._id.toString()),
      }));
    }
    res.json(responses.successful({ selected: user }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

// create discover identity (identities) and get discover identities
exports.createDiscoverIdentity = async (req, res) => {
  try {
    const { identities } = await validator.createDiscoverIdentity().validateAsync(req.body);
    if (identities.length) {
      await userRepository.updateOne(
        { _id: req.user._id, status: 1 },
        { $set: { identities: identities.flat().map((item) => item._id) } },
        { upsert: true, setDefaultsOnInsert: true },
      );
      res.json(responses.successful([]));
    } else {
      res.json(responses.error('wrong_identity_id'));
    }
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// post top three Identities impacts
exports.createDiscoverImpact = async (req, res) => {
  try {
    const body = await validator.createDiscoverImpact().validateAsync(req.body);

    const validImpacts = await discoverService.getImpacts(body);
    if (validImpacts) {
      await userRepository.updateOne(
        { _id: req.user._id, status: 1 },
        { $set: { impacts: validImpacts } },
        { upsert: true, setDefaultsOnInsert: true },
      );
      res.json(responses.successful([]));
    } else {
      res.json(responses.error('wrong_impact_id.'));
    }
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// and get selected impacts and selected identities
exports.getDiscoverImpacts = async (req, res) => {
  try {
    const user = await userRepository.findOne(
      { _id: req.user._id, status: 1 },
      { _id: 0, impacts: 1 },
    );
    if (!user) return res.json(responses.error('user_not_found'));
    const impacts = await discoverIdentityRepository.findByIds(
      user.impacts.map((impact) => impact.discoverIdentity_id),
      { status: 1 },
      {
        name: 1, _id: 1, discover_id: 1, status: 1,
      },
    );
    impacts.forEach((impact) => {
      impact.rank = user.impacts.find((e) => e._id.toString() === impact._id.toString());
    });
    res.json(responses.successful({ impacts }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getImpactById = async (req, res) => {
  try {
    const { id } = await validator.getImpactById(req.params).validateAsync();

    const user = await userRepository.findOne(
      { _id: req.user._id, status: 1 },
      { _id: 0, impacts: 1 },
    );
    if (!user) return res.json(responses.error('user_not_found'));
    const userImpact = user.impacts
      .find((impact) => impact.discoverIdentity_id.toString() === id.toString());

    if (!userImpact) return res.json(responses.error('impact_not_found'));
    const impact = await discoverIdentityRepository.findById(id,
      {},
      {
        name: 1, _id: 1, discover_id: 1, status: 1,
      });
    impact.rank = userImpact.rank;
    res.json(responses.successful({ impact }));
  } catch (e) {
    return res.json(responses.error(e.message));
  }
};

exports.getImpactList = async (req, res) => discoverIdentityRepository
  .find({}, {
    name: 1, status: 1, _id: 1, discover_id: 1,
  })
  .then((impacts) => res.json(responses.successful({ impacts })))
  .catch((e) => res.json(responses.error(e.message)));

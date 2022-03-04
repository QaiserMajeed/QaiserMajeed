const responses = require('../../utils/responses/responses');
const validator = require('./validator');
const defineRepository = require('./repository');

// create and update defines (for three users admin, manager and employee)
exports.createOrUpdateDefine = async (req, res) => {
  try {
    const defines = await validator.createOrUpdateDefine().validateAsync(req.body);

    const createOrUpdate = await defineRepository.updateOne(
      { user_id: req.user._id },
      defines,
      { upsert: true, setDefaultsOnInsert: true },
    );
    if (
      createOrUpdate.hasOwnProperty('upserted')
    ) {
      req.user.defines = createOrUpdate.upserted[0]._id;
      req.user.save();
    }
    res.json(responses.successful([]));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// get defines (for three users admin, manager and employee)
exports.getDefines = async (req, res) => defineRepository
  .findOne({ user_id: req.user._id, status: 1 })
  .then((defines) => res.json(responses.successful({ defines })))
  .catch((e) => res.json(responses.error(e.message)));

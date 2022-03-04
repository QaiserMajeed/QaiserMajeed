const responses = require('../../utils/responses/responses');
const validator = require('./validator');
const registrationCodeRepository = require('./repository');
const { selectCode } = require('../../constants/code');
const mongodbResponseValidator = require('../../utils/responses/mongodb');
const { pagination } = require('../../utils/responses/pagination');
const { addUserProfileToCode, generateAdvCode, isUniqueCode } = require('./service');

exports.create = async (req, res) => {
  try {
    const registrationCode = await validator.create().validateAsync(req.body);

    registrationCodeRepository.create({
      ...registrationCode,
      initialLicensesCount: registrationCode.availableCount,
      userId: req.user._id,
    })
      .then(() => res.json(responses.successful([])))
      .catch((e) => res.json(responses.error(e.code === 11000 ? 'dublicated_adv_key' : e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
exports.getCodes = async (req, res) => {
  try {
    const {
      skip = 0,
      limit = 10,
      search,
    } = await validator.getCodes().validateAsync(req.query);

    let filters = {};
    if (search) {
      filters = {
        $or: [
          { code: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const count = await registrationCodeRepository.count(filters);

    const codes = await registrationCodeRepository
      .findWithPagination(filters, skip, limit, selectCode);

    for (let code of codes) {
      code = await addUserProfileToCode(code);
    }
    return res.json(responses.successful(
      pagination(codes, count, skip, limit),
    ));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getCode = async (req, res) => {
  try {
    const { id } = await validator.getCode().validateAsync(req.params);
    const code = await registrationCodeRepository.findById(
      id,
      {},
      undefined,
      { select: selectCode },
    );
    addUserProfileToCode(code)
      .then((result) => res.json(responses.successful(result)))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
exports.changeCode = async (req, res) => {
  try {
    const {
      codeId, code, name, availableCount,
    } = await validator.changeCode().validateAsync(req.body);
    registrationCodeRepository.updateById(codeId, {}, {
      code,
      name,
      availableCount,
    })
      .then((result) => res.json(mongodbResponseValidator.validResponse(result)))
      .catch((e) => res.json(responses.error(e.code === 11000 ? 'dublicated_adv_key' : e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.deleteCodes = async (req, res) => {
  try {
    const { ids } = await validator.deleteCodes().validateAsync(req.query);

    const errors = [];
    for (const id of ids) {
      const count = await registrationCodeRepository.count({ userId: req.user._id });
      if (count === 1) return res.json(responses.error('You can`t remove the last element'));
      const deletedResult = await registrationCodeRepository.deleteByID(id, req.user._id);
      if (!mongodbResponseValidator.remove(deletedResult, 1)) errors.push(id);
    }
    return res.json(
      errors.length
        ? responses.error(`Codes with ids not removed: ${JSON.stringify(errors)}`)
        : responses.successful([]),
    );
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.generateCode = (req, res) => {
  try {
    res.json(responses.successful({ code: generateAdvCode() }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.checkCode = async (req, res) => {
  try {
    const { code } = await validator.checkCode().validateAsync(req.query);

    isUniqueCode(code)
      .then((result) => res.json(responses.successful({ unique: !result })))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

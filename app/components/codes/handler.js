const responses = require('../../utils/responses/responses');
const validator = require('./validator');
const companyRepository = require('../companies/repository');
const RegistrationCode = require('../../models/RegistrationCode');
const codeRepository = require('./repository');

exports.getCohorts = (req, res) => codeRepository
  .find(
    { owner: req.user._id },
    {
      code: 1,
      title: 1,
    },
  )
  .then((cohorts) => res.json(responses.successful({ cohorts })))
  .catch((e) => res.json(responses.error(e.message)));

exports.getCodes = async (req, res) => {
  try {
    const registrationCodes = await RegistrationCode
      .find(
        { owner: req.user._id },
        {
          code: 1,
          title: 1,
          available_count: 1,
          company_id: 1,
          _id: 1,
        },
      );
    const companyIds = registrationCodes.map((code) => code.company_id);
    const companies = await companyRepository.findByIds(companyIds);
    registrationCodes.forEach((code) => {
      code.company_id = companies
        .find((company) => company._id.toString() === code.company_id.toString());
    });
    res.json(responses.successful({ codes: registrationCodes }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.newRegistrationCode = async (req, res) => {
  try {
    const {
      initialCount, title, companyId, owner, code,
    } = await validator.newRegistrationCode().validateAsync(req.body);

    const registrationCode = await codeRepository.count({ code });

    if (!registrationCode) {
      const newCode = await codeRepository.create({
        code,
        initial_count: initialCount,
        available_count: initialCount,
        title,
        company_id: companyId,
        owner,
      });
      await companyRepository.updateOne(
        { _id: companyId },
        { $push: { registration_codes: newCode._id } },
      );

      return res.json(responses.successful([]));
    }
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

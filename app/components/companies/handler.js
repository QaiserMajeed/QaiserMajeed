const responses = require('../../utils/responses/responses');
const companyRepository = require('./repository');
const validator = require('./validator');

exports.createCompany = async (req, res) => {
  try {
    const {
      company_name: companyName, owner,
    } = await validator.createCompany().validateAsync(req.body);

    const value = await companyRepository.count({ company_name: companyName, owner });

    if (value) {
      return res.json(responses.error('Client Name already exists'));
    }
    const company = await companyRepository.create({
      company_name: companyName,
      owner,
    });
    return res.json(responses.successful({ company_id: company._id }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getCompanies = async (req, res) => companyRepository
  .find(
    { owner: req.user._id },
    {
      company_name: 1,
      _id: 1,
    },
  )
  .then((companies) => res.json(responses.successful({ companies })))
  .catch((e) => res.json(responses.error(e.message)));

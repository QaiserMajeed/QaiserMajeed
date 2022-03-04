const sgMail = require('@sendgrid/mail');
const validator = require('./validator');
const IndividualEpa = require('../../models/IndividualEpa');
const EPATeam = require('../../models/EPATeam');
const EPARegistrationCode = require('../../models/EPARegistrationCode');
const epaRegistrationCodeRepository = require('./epa-registration-code.repository');
const epaTeamRepository = require('./epa-team.repository');
const { apiKey } = require('../../constants/sgMail');
const epaService = require('./service');
const responses = require('../../utils/responses/responses');

exports.createEPAcode = async (req, res) => {
  try {
    const {
      code,
      initial_count: initialCount,
      title,
      owner,
      company_id: companyId,
    } = await validator.createEPAcode().validateAsync(req.body);

    const count = epaRegistrationCodeRepository.count({ code });
    if (!count) {
      await epaRegistrationCodeRepository.create({
        code,
        initial_count: initialCount,
        available_count: initialCount,
        title,
        company_id: companyId,
        owner,
      });

      return res.json(responses.successful([]));
    }
    res.json(responses.error('Code already exists'));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.checkEPAcode = async (req, res) => {
  try {
    const { code } = await validator.checkEPAcode().validateAsync(req.body);

    return epaRegistrationCodeRepository
      .findOne({ code })
      .then((result) => {
        if (result === null) {
          return res.json(responses.error('Code does not exist'));
        }
        if (result.available_count === 0) {
          return res.json(responses.error('All licenses used for this code'));
        }
        return res.json(responses.successful({ code_id: result._id }));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.createTeam = async (req, res) => {
  try {
    const {
      teamName,
      members,
    } = await validator.createTeam().validateAsync(req.body);

    const team = await epaTeamRepository.create({
      team_name: teamName,
      members,
      owner: req.user._id,
    });
    res.json(responses.successful({ received: true, id: team._id }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getTeamResults = async (req, res) => {
  try {
    const { id } = await validator.getTeamResults().validateAsync(req.params);

    return EPATeam
      .findOne({ _id: id })
      .populate('members')
      .then((report) => res.json(responses.successful({ report })))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.createIndividualReport = async (req, res) => {
  try {
    const {
      formResponse,
    } = await validator.createIndividualReport().validateAsync(req.body);

    const results = epaService.getResult(formResponse);
    EPARegistrationCode.findOne(
      { _id: results.registration_code },
      (err, code) => {
        if (!err) {
          code.users.push(results._id);
          code.available_count -= 1;
          results.owner = code.owner;
          code.save();
          results.save((err) => {
            if (err) {
              res.json(responses.error(err));
            } else {
              sgMail.setApiKey(apiKey);
              const msg = {
                to: results.email,
                from: 'support@trygobeyond.com',
                name: 'GoBeyond Energy + Purpose Audit™',
                subject: 'GoBeyond: Energy + Purpose Audit™ Results',
                text:
                 `Hi ${
                   results.name
                 }, \n\n`
                 + 'Congratulations on completing the GoBeyond Energy + Purpose Audit™ \n\nBelow is a link that contains your results across the 6 factors and 24 subfactors that we measure.\n\n'
                 + `https://app.gojourneylife.com/epa/${
                   results._id
                 }\n\n`
                 + 'Thank you\n\n'
                 + 'GoBeyond Team \n\n',
              };
              sgMail.send(msg).then(() => {
                res.json(responses.successful([]));
              });
            }
          });
        }
      },
    );
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getIndividualEpaReport = async (req, res) => {
  try {
    const { epa_id: id } = await validator.getIndividualEpaReport().validateAsync(req.params);

    return IndividualEpa
      .findOne(
        { _id: id },
        {},
        { sort: { created_at: -1 } },
      )
      .then((epa) => res.json(responses.successful({ epa })))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getEpaCohorts = async (req, res) => epaRegistrationCodeRepository
  .find(
    { owner: req.user._id },
    {
      code: 1,
      title: 1,
    },
  )
  .then((cohorts) => res.json(responses.successful({ cohorts })))
  .catch((e) => res.json(responses.error(e.message)));

exports.getEPAResults = async (req, res) => {
  try {
    const { cohort } = await validator.getEPAResults().validateAsync(req.query);

    if (!cohort) {
      IndividualEpa.find(
        { owner: req.user._id },
        {
          _id: 1, createdAt: 1, name: 1, email: 1, registration_code: 1,
        },
        {
          sort: { createdAt: -1 },
          lean: true,
        },
      )
        .populate('registration_code')
        .exec((err, eparesults) => {
          if (!err) {
            res.json(responses.successful({
              eparesults,
              result_count: eparesults.length,
            }));
          } else {
            res.json(responses.error(err.message));
          }
        });
    } else {
      EPARegistrationCode.findOne({ code: cohort }, (err, code) => {
        if (!err) {
          IndividualEpa.find(
            { registration_code: code._id },
            {
              _id: 1, createdAt: 1, name: 1, email: 1, registration_code: 1,
            },
            {
              sort: { createdAt: -1 },
              lean: true,
            },
          )
            .populate('registration_code')
            .exec((err, eparesults) => {
              if (err) {
                return res.json(responses.error(err.message));
              }
              return res.json(responses.successful({
                eparesults,
                result_count: eparesults.length,
              }));
            });
        }
      });
      // TODO: Handle cohort search
    }
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
exports.getTeamReports = async (req, res) => {
  try {
    const { cohort } = await validator.getTeamReports().validateAsync(req.body);

    return EPATeam
      .find(
        cohort === null ? { owner: req.user._id } : { registration_code: cohort },
        {
          _id: 1, createdAt: 1, team_name: 1, members: 1,
        },
        {
          sort: { createdAt: -1 },
          lean: true,
        },
      )
      .then((teamreports) => res.json(responses.successful({ teamreports })))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.getEPACodes = async (req, res) => EPARegistrationCode
  .find(
    { owner: req.user._id },
    {
      code: 1,
      title: 1,
      available_count: 1,
      company_id: 1,
      _id: 1,
    },
  )
  .populate('company_id')
  .exec()
  .then((codes) => res.json(responses.successful({ codes })))
  .catch((e) => res.json(responses.error(e.message)));

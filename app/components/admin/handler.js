const userRepository = require('../../repositories/user.repository');
const { getQuery, getPages } = require('../../utils/helpers/helper');
const validator = require('./validator');
const responses = require('../../utils/responses/responses');

exports.getAllAdmin = async (req, res) => userRepository
  .find({
    _id: { $nin: req.user._id },
    user_type: 1,
    status: 1,
  },
  { email: 1 })
  .then((admins) => res.json(responses.successful({ admins })))
  .catch((e) => {
    res.json(responses.error(e.message));
  });
// SETTING SECTION
// get all admin (for setting Section with Pagination)
// and matching login admin company name
exports.getAllAdminWithPagination = async (req, res) => {
  try {
    const params = await validator.getAllAdminWithPagination().validateAsync(req.params);
    const { record, query } = getQuery(params);
    const counts = await userRepository.count({
      user_type: 1, company: req.user.company, status: 1,
    });
    res.json(responses.successful({
      pages: getPages(counts, record),
      counts,
      admins: await userRepository.find(
        { user_type: 1, company: req.user.company, status: 1 },
        {
          _id: 1,
          first_name: 1,
          last_name: 1,
          phone: 1,
          company: 1,
          email: 1,
        },
        query,
      ),
    }));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// sorting with admin name and admin email id with Pagination (setting Section)
// and matching login admin company name
exports.sortingAdmin = async (req, res) => {
  try {
    const params = await validator.sortingAdmin().validateAsync(req.params);

    const { record, query, sort } = getQuery(params);
    const totalCount = await userRepository.count({
      user_type: 1, company: req.user.company, status: 1,
    });
    userRepository.find(
      { user_type: 1, company: req.user.company, status: 1 },
      {
        _id: 1,
        first_name: 1,
        last_name: 1,
        phone: 1,
        company: 1,
        email: 1,
      },
      query,
    )
      .sort(sort)
      .collation({ locale: 'en' })
      .then((admins) => {
        res.json(responses.successful({
          pages: getPages(totalCount, record),
          counts: totalCount,
          admins: admins.map((admin) => ({
            _id: admin._id,
            first_name: admin.first_name,
            last_name: admin.last_name,
            phone: admin.phone,
            company: admin.company,
            email: admin.email,
          })),
        }));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// delete admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = await validator.deleteAdmin().validateAsync(req.params);

    const admin = await userRepository.findOne(
      { _id: id, user_type: 1, status: 1 },
      { _id: 1 },
    );
    if (admin) {
      if (req.user._id.equals(admin._id)) {
        return res.json(responses.error('you_can\'t_delete_own_account.'));
      }
      await userRepository.updateOne({ _id: admin._id }, { $set: { status: 0 } });
      return res.json(responses.successful([]));
    }
    res.json(responses.error('wrong_admin_id'));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// search admin with email id and get data with matching
// login admin company name (for setting Section)
exports.searchAllAdmin = async (req, res) => {
  try {
    const { query } = await validator.searchAllAdmin().validateAsync(req.params);

    userRepository
      .find(
        {
          email: { $regex: `.*${query}.*`, $options: 'i' },
          user_type: 1,
          company: req.user.company,
          status: 1,
        },
        {
          _id: 1, first_name: 1, last_name: 1, phone: 1, company: 1, email: 1,
        },
      )
      .then((admins) => res.json(responses.successful({
        admins,
      })))
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

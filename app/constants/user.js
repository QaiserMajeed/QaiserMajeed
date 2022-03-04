module.exports = {
  userTypes: {
    SUPERADMIN: 0,
    USER: 1,
    PARTNER: 2,
  },
  getUserObject: {
    _id: 1,
    first_name: 1,
    last_name: 1,
    email: 1,
    user_type: 1,
    createdAt: 1,
  },
  getUserForPagination: {
    _id: 1,
    first_name: 1,
    last_name: 1,
    email: 1,
  },
  userStringType: {
    0: 'superadmin',
    1: 'user',
    2: 'partner',
  },
  paymentStatus: {
    PAYED: 'payed',
    NOT_PAYED: 'not_payed',
    PENDING: 'pending',
  },
};

const code = {
  CODE: 'code',
  NAME: 'name',
  AVAILABLE_COUNT: 'availableCount',
};

module.exports = {
  selectCode: {
    _id: 1,
    code: 1,
    name: 1,
    userId: 1,
    createdAt: 1,
    availableCount: 1,
    initialLicensesCount: 1,
  },
  fields: code,
  allCodeFields: {
    ...code,
    INITIAL_LICENSES_COUNT: 'initialLicensesCount',
  },
  withList: {
    full: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
    short: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  },
};

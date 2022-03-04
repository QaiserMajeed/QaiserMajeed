/**
 * @param {{page, orderby, type} } params,
 * @return {{record: number, query: {limit: number, skip: number}}}
 */
exports.getQuery = (params) => {
  const pageNumber = parseInt(params.page, 10);
  if (pageNumber <= 0) {
    throw 'Invalid page number, should start with 1.';
  }
  const record = 10;
  let orderBy = null;
  if (params.orderby) orderBy = params.orderby === 'desc' ? -1 : 1;

  return {
    record,
    query: {
      skip: 10 * (pageNumber - 1),
      limit: record,
    },
    ...(params.type && {
      sort: {
        [params.type === 'email' ? 'email' : 'first_name']: orderBy,
      },
    }),
    ...(!params.type && params.orderby && {
      orderBy,
    }),
  };
};

/**
 *
 * @returns { number }
 */
exports.calcOtp = () => Math.floor(100000 + Math.random() * 900000);

/**
 * @param { number }totalCount
 * @param { number } record
 * @return {number}
 */
exports.getPages = (totalCount, record) => Math.ceil(totalCount / record);

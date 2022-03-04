/**
 *
 * @param items
 * @param totalCount
 * @param skip
 * @param limit
 * @returns {{pagination: {perPage, page, totalCount}, rows}}
 */
exports.pagination = (items, totalCount, skip, limit = 10) => ({
  pagination: {
    totalCount,
    page: Math.ceil(skip / limit),
    totalPages: Math.ceil(totalCount / limit),
    perPage: limit,
  },
  items,
});

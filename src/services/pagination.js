module.exports = async (model, options = {}, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  // options contém os 'where', 'include', 'order', etc.
  const { count, rows } = await model.findAndCountAll({
    ...options,
    limit,
    offset,
  });

  return {
    data: rows,
    meta: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      perPage: parseInt(limit)
    }
  };
};
module.exports = function paginate(model) {
  return async ({ page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await model.findAndCountAll({
      limit,
      offset
    });

    return {
      page,
      total: count,
      perPage: limit,
      data: rows
    };
  };
};

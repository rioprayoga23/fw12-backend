const { errorHandler } = require("./errorHandler.helper");

const filter = (data, sortable, countModel, res, callback) => {
  data.page = parseInt(data.page) || 1;
  data.limit = parseInt(data.limit) || 5;
  data.search = data.search || "";
  data.sortBy = (data.sortBy && sortable.includes(data.sortBy)) || "createdAt";
  data.sort = data.sort || "ASC";
  data.month =
    data.month || new Date().toLocaleString("default", { month: "long" });
  data.year = data.year || new Date().getFullYear();

  const params = {
    limit: data.limit,
    offset: (parseInt(data.page) - 1) * data.limit,
    search: data.search,
    sortBy: data.sortBy,
    sort: data.sort,
    month: data.month,
    year: data.year,
  };

  const pageInfo = {
    page: data.page,
  };

  countModel(params, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }

    pageInfo.totalData = parseInt(results.rows[0].totalData);
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / data.limit);
    pageInfo.nextPage = data.page < pageInfo.totalPage ? data.page + 1 : null;
    pageInfo.prevPage = data.page > 1 ? data.page - 1 : null;

    callback(params, pageInfo);
  });
};

module.exports = filter;

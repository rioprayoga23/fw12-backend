const { errorHandler } = require("./errorHandler.helper");

const filter = (data, sortable, countModel, res, callback) => {
  data.page = parseInt(data.page) || 1;
  data.limit = parseInt(data.limit) || 5;
  data.search = data.search || "";
  data.sortBy = (sortable.includes(data.sortBy) && data.sortBy) || "createdAt";
  data.sort = data.sort || "ASC";

  const params = {
    limit: data.limit,
    offset: (parseInt(data.page) - 1) * data.limit,
    search: data.search,
    sortBy: data.sortBy,
    sort: data.sort,
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

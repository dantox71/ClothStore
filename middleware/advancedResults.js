const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  //Fields to remove from query
  const fieldsToRemove = ["select", "sort", "page", "limit"];

  fieldsToRemove.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|lt|gte|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryStr));

  if (req.query.select) {
    const select = req.query.select.split(",").join(" ");
    query = query.select(select);
  }

  if (req.query.sort) {
    const sort = req.query.sort.split(",").join(" ");
    query = query.sort(sort);
  } else {
    //Sort in descending order by createdAt field
    query.sort("-createdAt");
  }

  //pagination
  let pagination = {};
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (startIndex > 0) {
    pagination.prev = {
      limit,
      page: page - 1,
    };
  }

  if (endIndex < total) {
    pagination.next = {
      limit,
      page: page + 1,
    };
  }

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;

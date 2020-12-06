const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  const removeFields = ['select', 'sort', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  //creates a query String
  let queryStr = JSON.stringify(reqQuery);
  //creates operators ($gt, $gte, $lt, $lte)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  //finding the resource
  console.log(" queryStr ____", queryStr)

  query = model.find(JSON.parse(queryStr));

  //select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt');
  }

  //pargination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit; //
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = model.find();
  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate)
  }

  const results = await query;
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0 ) {
    pagination.prev = {
      page: page -1,
      limit
    };
  }

  console.log("results ____", results)

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next()
};

module.exports = advancedResults;
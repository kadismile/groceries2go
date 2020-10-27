exports.ProductBeforeSave = async (data) => {
  if (data.productTypeId) {
    const productType = await data.model('ProductType').findOne({productTypeId: data.productTypeId})
    data.productType = productType.name
  }
  return data
}
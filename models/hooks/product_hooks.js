exports.ProductBeforeSave = async (data) => {
  if (data.productTypeId) {
    const productType = await data.model('ProductType').findOne({ _id: data.productTypeId})
    data.productType = productType.name
  }
  return data
}
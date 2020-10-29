import React, {useEffect,useState} from 'react'
import Select from "react-select";
import Swal from 'sweetalert2'
import {Redirect} from "react-router-dom";
import {getCategory, createProduct, getProductType} from "../../utils/auth-client";
import toastr from "toastr";
import {AddProductVariant} from "../../components/modals/product_variant/add_product_variant";
import {EditProductVariant} from "../../components/modals/product_variant/edit_product_variant";

function AddProduct() {
  const $ = window.$;

  useEffect(()=> {
    $('.dropify').dropify({
      messages: {
        'default': 'Drag and drop a file here or click',
        'replace': 'Drag and drop or click to replace',
        'remove':  'Remove',
        'error':   'Ooops, something wrong happended.'
      }
    });
  },[])

  const [submit, setSubmit] = useState(false)

  const [categories, setCategories] = useState([]);

  const [productType, setProductType] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    productTypeId: [],
    productType: "",
    categoryId: [],
    category: "",
    productVariants: [],
    productImage:"",
    errors: {}
  });

  const [showModal, setShowModal] = useState(false);

  const [variantToEdit, setVariantToEdit] = useState([])

  const [showEditModal, setEditModal] = useState(false);

  const productTypeOptions = productType.map((pt)=> {
    return {value: pt.name, label: pt.name, id: pt._id}
  });

  const categoryOptions = categories.map((cat)=> {
    return { value: cat.name, label: cat.name, id: cat._id }
  });

  const handleChange = event => {
    event.preventDefault();
    let { name, value, files } = event.target;
    let errors = formValues.errors;
    errors[name] = "";
    setFormValues(prevState => {
      return {
        ...prevState,
        errors,
        [name]: value && !files ? value : files ? files : ''
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let errors = formValues.errors;
    validateForm(errors);
    for (let val of Object.values(formValues.errors)) {
      if (val) {
        setLoading(false)
        return
      }
    }
    delete formValues.errors
    const {productVariants} = formValues
    if (!productVariants.length) {
      toastr.error("Kindly add product variants")
      setLoading(false)
      return
    }
    let variantImages = []
    productVariants.forEach((pVariants) => {
      variantImages.push(pVariants.productVariantImage)
    })
    let formFiles = [formValues.productImage[0], ...variantImages[0]]

    let formData = new FormData();
    formData.append('name',formValues.name);
    formData.append('description',formValues.description);
    formData.append('productTypeId',formValues.productTypeId);
    formData.append('productType',formValues.productType);
    formData.append('categoryId',formValues.categoryId);
    formData.append('category',formValues.category);
    formData.append('productVariants', JSON.stringify(formValues.productVariants));
    formData.append('fileCount',formValues.productImage.length);
    for(var x = 0; x < formFiles.length; x++) {
      formData.append('file', formFiles[x])
    }
    let data = await createProduct(formData);
    setLoading(false)
    return
    console.log("status ___", data)
    if (data.status === "Success") {
      toastr.success("Product Created Successfully");
      setLoading(false)
      //setSubmit(true)
    } else {
      toastr.error("Product Created Failed");
    }
  }

  const validateForm = errors => {
    const { name, description, productTypeId, categoryId, productImage, productVariants } = formValues;
    for (let val in formValues) {
      if (val === "name") {
        if (name.length <= 3) {
          errors.name = "variant name must be more than 3 characters long!";
        }
      }

      if (val === "description") {
        if (description.length <= 3) {
          errors.description = "description of product must be more than 3 characters long!";
        }
      }

      if (val === "productTypeId") {
        if (!productTypeId.length) {
          errors.productTypeId = "product type can't be empty";
        }
      }

      if (val === "categoryId") {
        if (!categoryId.length) {
          errors.categoryId = "category can't be empty";
        }
      }

      if (val === "productImage") {
        if (!productImage) {
          errors.productImage = "kindly upload an Image";
        }
      }
    }
    setFormValues(prevState => {
      return {
        ...prevState,
        errors
      };
    });
  };

  const displayModal = (value) => {
    setShowModal(value)
  };

  const displayEditModal = (value) => {
    setEditModal(value)
  };

  const variants = (variants) => {
    variants = variants || []
    let { productVariants } = formValues
    if (productVariants.length) {
      variants = variants.map((val)=> {
        return {...val, id: productVariants.length - 1}
      })
      productVariants = [...productVariants, ...variants]
    } else {
      productVariants = variants
    }
    setFormValues((prevState)=> {
      return {
        ...prevState,
        productVariants: productVariants
      }
    })
  }

  const deleteVariant = (index) => {
    const {productVariants} = formValues
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product variant!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        for(let variant of productVariants) {
          productVariants.splice(index, 1);
        }
        setFormValues((prevState)=> {
          return {
            ...prevState,
            productVariants
          }
        })
      }
    })
  }

  const editVariant = (index, variant) => {
    const {productVariants} = formValues
    if (variant) {
      const objIndex = productVariants.findIndex((obj => obj.id === index));
      productVariants[objIndex].name = variant.name
      productVariants[objIndex].price = variant.price
      productVariants[objIndex].code = variant.code
      productVariants[objIndex].quantityInCase = variant.quantityInCase
      productVariants[objIndex].inventory = variant.inventory
      productVariants[objIndex].uom = variant.uom
      productVariants[objIndex].upc = variant.upc
      productVariants[objIndex].description = variant.description
      setFormValues((prevState) => {
        return {
          ...prevState,
          productVariants: productVariants
        }
      })
    } else {
      setEditModal(true)
      setVariantToEdit(productVariants[index])
    }
  }

  const { errors, productVariants} = formValues;

  return (
    !submit ?
    <div className="main-content">

      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">Add a Prouct</h4>

                <div className="page-title-right">
                  <div className="btn-group" role="group" style={{marginRight: "80px"}}>
                    <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary dropdown-toggle"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Action <i className="mdi mdi-chevron-down"></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1" x-placement="bottom-start"
                         style={{position: "absolute", willChange: "transform", top: "0px", left: "-70px", transform: "translate3d(0px, 36px, 0px)"}}>
                      <a className="dropdown-item" href="#">Upload Csv</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body" style={{padding: "4.25rem"}}>
                  <form className="needs-validation" noValidate>
                    <div className="form-row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label" style={{paddingLeft: "0px"}}>Product Name</label>
                        <input type="text" onChange={handleChange} name="name" className="form-control" id="colFormLabel"/>
                        {errors.name && errors.name.length > 0 && (
                          <span className="addGroup__error">{errors.name}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label" style={{paddingLeft: "0px"}}>Product Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" onChange={handleChange} name="description" rows="3"></textarea>
                        {errors.description && errors.description.length > 0 && (
                          <span className="addGroup__error">{errors.description}</span>
                        )}
                      </div>

                    </div>

                    <div className="form-row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label" style={{paddingLeft: "0px"}}>Product Image</label>
                        <input type="file" multiple name="productImage" onChange={handleChange} className="dropify" data-height="150" data-allowed-file-extensions="jpg png jpeg" data-max-file-size="500K"/>
                        {errors.productImage && errors.productImage.length > 0 && (
                          <span className="addGroup__error">{errors.productImage}</span>
                        )}
                      </div>

                    </div>

                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label" style={{paddingLeft: "0px"}}>Product Type</label>
                        <Select
                          value={{ label: formValues.productType || "Product Type" }}
                          onMenuOpen={ async ()=>{
                            let data = await getProductType();
                            setProductType(data.data);
                          }}
                          onChange={ async (option)=> {
                            setFormValues(prevState => {
                              prevState.errors.productTypeId = ""
                              return {
                                ...prevState,
                                productTypeId: option.id,
                                productType: option.value
                              }
                            })
                          }}
                          options={productTypeOptions}
                          name="productTypeId"
                        />
                        {errors.productTypeId && errors.productTypeId.length > 0 && (
                          <span className="addGroup__error">{errors.productTypeId}</span>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label" style={{paddingLeft: "0px"}}>Category</label>
                        <Select
                          value={{ label: formValues.category || "Category" }}
                          onMenuOpen={ async ()=>{
                            let data = await getCategory();
                            setCategories(data.data);
                          }}
                          onChange={ async (option)=> {
                            setFormValues(prevState => {
                              prevState.errors.categoryId = ""
                              return {
                                ...prevState,
                                categoryId: option.id,
                                category: option.value,
                              }
                            })
                          }}
                          options={categoryOptions}
                          name="categoryId"
                        />
                        {errors.categoryId && errors.categoryId.length > 0 && (
                          <span className="addGroup__error">{errors.categoryId}</span>
                        )}
                      </div>


                    </div>

                    <br/>
                    <button type="button" onClick={e => { setShowModal(true) }}  className="btn btn-success waves-effect waves-light" style={{float: "right"}}> <i className='bx bx-plus'></i> Add Variant </button>
                    {errors.productVariants && errors.productVariants.length > 0 && (
                      <span className="addGroup__error">{errors.productVariants}</span>
                    )}
                    <br/>
                    <br/>
                    <br/>

                    {
                      productVariants.length ?
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="thead-light">
                                <tr>
                                  <th>#</th>
                                  <th>Variant Name</th>
                                  <th>Code</th>
                                  <th>Price</th>
                                  <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {productVariants.map((variant, index)=> {
                                  return (
                                    <tr key={index}>
                                      <th scope="row">{index + 1}</th>
                                      <td>{variant.name}</td>
                                      <td>{variant.code}</td>
                                      <td>{variant.price}</td>

                                      <td style={{float: "right"}}>
                                        <a onClick={() => editVariant(index)} style={{color: "#767c82", cursor: "pointer"}}>
                                          <i className="fa fa-fw fa-edit" data-toggle="tooltip" data-placement="top" title=""data-original-title="edit"></i>
                                        </a>
                                      </td>

                                      <td style={{float: "right"}}>
                                        <a onClick={()=> deleteVariant(variant.id)} style={{color: "#767c82", cursor: "pointer"}}>
                                          <i className="fa fa-fw fa-trash" data-toggle="tooltip" data-placement="top" title=""data-original-title="remove"></i>
                                        </a>
                                      </td>

                                    </tr>
                                  )
                                })}

                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div> :
                      ""
                    }


                    <br/>
                    <br/>

                    {!loading ?
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary btn-large waves-effect waves-light"
                        style={{ margin: "auto", display: "block", width: "200px" }}
                      >
                        Add Product
                      </button> :
                      <button type="button"
                              className="btn btn-primary btn-large waves-effect waves-light"
                              style={{margin: "auto", display: "block", width: "200px", opacity: "0.4"}}>
                        Adding Product .....
                      </button>
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      {showModal ? <AddProductVariant toggleModal={displayModal} productVariants={variants} /> : ""}
      {showEditModal ? <EditProductVariant toggleModal={displayEditModal} productVariant={variantToEdit} updateVariant={editVariant} /> : ""}
    </div>
      :
     <Redirect to="/products" />
  )
}

export {AddProduct}
import React, {useEffect,useState} from 'react'
import Select from "react-select";
import {Link, Redirect, useHistory} from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {getCategory, registerUser, getProductType} from "../../utils/auth-client";
import LaddaButton, {SLIDE_UP, XXL} from "react-ladda";
import toastr from "toastr";
import validator from "validator";
import {useAuth} from "../../context/auth-context";
import {AddProductVariant} from "../../components/modals/product_variant/add_product_variant";

function AddProduct() {
  const  histoy = useHistory()
  const $ = window.$;
  const {user} = useAuth();

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

  const [submitForm, setSubmitForm] = useState(false)
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
    submitForm: true,

    errors: {
      name: "",
      description: "",
      productType: "",
      category: "",
      productVariants: []
    }});
  const [showModal, setShowModal] = useState(false);

  const productTypeOptions = productType.map((pt)=> {
    return {value: pt.name, label: pt.name, id: pt._id}
  });
  const categoryOptions = categories.map((cat)=> {
    return {value: cat.name, label: cat.name, id: cat._id}
  });

  const disableForm = () => {
    let newValues = {...formValues, ...formValues.address};
    delete newValues.errors;
    delete newValues.loading;
    delete newValues.submitForm;
    delete newValues.address;

    let isError = false;
    for (let val of Object.values(newValues)) {
      if (val === "") {
        isError = true
      }
    }

    if (isError === true && formValues.submitForm === true) {
      console.log("Form is not Valid!");
      return  true
    }

    if (isError === false && formValues.submitForm === true ) {
      console.log("Form is not Valid!");
      return true
    }

    if (isError === true && formValues.submitForm === false ) {
      console.log("Form is not Valid!");
      return true
    }
    if (isError === false && formValues.submitForm === false ) {
      console.log("Form is Valid!");
      return false
    }
  };

  const handleChange = event => {
    event.preventDefault();
    let { name, value } = event.target;
    let errors = formValues.errors;
    validateForm(name, errors, value);
    setFormValues(prevState => {
      return {
        ...prevState,
        errors,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    const {errors} = formValues;
    e.preventDefault();
    setFormValues(prevState => {
      return {
        ...prevState,
        loading: true
      }
    });

    let newValues = {...formValues,};
    delete newValues.errors;
    delete newValues.loading;
    delete newValues.submitForm;
    const data = await registerUser(newValues);
    setFormValues(prevState => {
      return {...prevState, loading: false}
    });

    console.log("DATA +++ DATA ", data)
    if (data.success === false) {
      toastr.error(data.error);
      setFormValues(prevState => {
        return {
          ...prevState,
          loading: false
        }
      });
    }
    if (data.success === "Success") {
      toastr.success("church member added successfully");
      setFormValues(prevState => {
        return {
          ...prevState,
          loading: false
        }
      });
      return <Redirect to="/church-members" />
      /*histoy.push({
        pathname: '/church-members'
      })*/
    }
  }

  const validateForm = (name, errors, value) => {
    switch (name) {
      case "name":
        errors.name = "";
        if (value.length && value.length <= 3) {
          errors.name = "name must be more than 3 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.name;

      default:
        setSubmitForm(false);
        break;
    }

  };

  const displayModal = (value) => {
    setShowModal(value)
  };

  const { errors} = formValues;
  return (
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
                        {errors.name.length > 0 && (
                          <span className="addGroup__error">{errors.name}</span>
                        )}
                      </div>

                    </div>

                    <div className="form-row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label" style={{paddingLeft: "0px"}}>Product Description</label>
                        <input type="text" onChange={handleChange} name="description" className="form-control" id="colFormLabel"/>
                        {errors.name.length > 0 && (
                          <span className="addGroup__error">{errors.description}</span>
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
                        {errors.name.length > 0 && (
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
                        {errors.name.length > 0 && (
                          <span className="addGroup__error">{errors.categoryId}</span>
                        )}
                      </div>


                    </div>

                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label" style={{paddingLeft: "0px"}}>Large Image</label>
                        <input type="file" className="dropify" data-height="300" data-allowed-file-extensions="jpg png jpeg" data-max-file-size="500K"/>
                        {errors.name.length > 0 && (
                          <span className="addGroup__error">{errors.productTypeId}</span>
                        )}
                      </div>


                        <div className="col-md-6 mb-3">
                          <label htmlFor="colFormLabel" className="col-sm-2 col-form-label" style={{paddingLeft: "0px"}}>Medium Image</label>
                          <input type="file" className="dropify" data-height="300" data-allowed-file-extensions="jpg png jpeg" data-max-file-size="500K"/>
                          {errors.name.length > 0 && (
                            <span className="addGroup__error">{errors.productTypeId}</span>
                          )}
                        </div>


                    </div>

                    <button type="button" onClick={e => { setShowModal(true) }}  className="btn btn-success waves-effect waves-light" style={{float: "right"}}> <i className='bx bx-plus'></i> Add Variant </button>


                    <br/>
                    <br/>
                    <button type="button" className="btn btn-success btn-large waves-effect waves-light" style={{margin: "auto", display: "block", width: "200px"}}> Submit </button>

                  </form>
                </div> {/* end card-body*/}
              </div> {/* end card*/}
            </div> {/* end col */}
          </div>



          {/*<div className="row">
            <div className="col-12">


              <div className="card">
                <div className="card-body" style={{ padding: "4.25rem"}}>

                  <form className="form-horizontal">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Product Name</label>
                          <div className="col-sm-8 mb-2">
                            <input type="text" onChange={handleChange} name="name" className="form-control" id="colFormLabel" placeholder="Product Name"/>
                            {errors.name.length > 0 && (
                              <span className="addGroup__error">{errors.name}</span>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="col-md-12">
                        <div className="form-group row">
                          <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Product Description</label>
                          <div className="col-sm-8 mb-2">
                            <input type="text" onChange={handleChange} name="name" className="form-control" id="colFormLabel" placeholder="Product Description"/>
                            {errors.name.length > 0 && (
                              <span className="addGroup__error">{errors.name}</span>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="col-md-12">
                        <div className="form-group row">
                          <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Tags</label>
                          <div className="col-sm-8 mb-2">
                            <input type="text" onChange={handleChange} name="name" className="form-control" id="colFormLabel" placeholder="vintage, cotton,"/>
                            {errors.name.length > 0 && (
                              <span className="addGroup__error">{errors.name}</span>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-form-label">Brand</label>
                            <div className="col-sm-6 mb-2">
                              <input type="text" onChange={handleChange} name="name" className="form-control" id="colFormLabel" placeholder="vintage, cotton,"/>
                              {errors.name.length > 0 && (
                                <span className="addGroup__error">{errors.name}</span>
                              )}
                            </div>
                          </div>

                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className=" col-form-label">Category</label>
                            <div className="col-sm-6 mb-2">
                              <input type="text" onChange={handleChange} name="name" className="form-control" id="colFormLabel" placeholder="vintage, cotton,"/>
                              {errors.name.length > 0 && (
                                <span className="addGroup__error">{errors.name}</span>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className="register-user col-md-12 col-md-offset-4 pull-right">
                        <LaddaButton
                          loading={loading}
                          disabled={disableForm()}
                          onClick={handleSubmit}
                          data-size={XXL}
                          data-style={SLIDE_UP}
                          data-spinner-size={30}
                          data-spinner-color="#ddd"
                          data-spinner-lines={12}
                        >
                          Submit
                        </LaddaButton>

                         <button type="submit" className="btn btn-primary waves-effect waves-light addChurchMember">Submit</button>
                      </div>
                    </div>

                  </form>

                </div>
              </div>

            </div>

          </div>*/}

        </div>

      </div>

      {showModal ? <AddProductVariant toggleModal={displayModal}/> : ""}
    </div>

  )
}

export {AddProduct}
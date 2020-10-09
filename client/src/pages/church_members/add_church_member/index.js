import React, {useEffect,useState} from 'react'
import Select from "react-select";
import {Link, Redirect, useHistory} from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {getCategory, registerUser} from "../../../utils/auth-client";
import LaddaButton, {SLIDE_UP, XXL} from "react-ladda";
import toastr from "toastr";
import validator from "validator";
import {useAuth} from "../../../context/auth-context";
import {validPhoneNumber} from "../../../utils/validPhoneNumber";

function AddChurchMember() {
  const  histoy = useHistory()
  const $ = window.$;
  const {user} = useAuth();
  
  useEffect(()=> {
    $('#datePicker').datepicker({
      format: 'dd/mm/yyyy',
    }).on('changeDate', function(e){
      setFormValues(prevState => {
        return {
          ...prevState,
          dob: e.date
        }
      });
      $(this).datepicker('hide');
    });
    
  },[]);
  
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    church_group: 'kkkkk',
    loading: false,
    gender: "",
    email: "",
    phoneNumber: "",
    password: "111222",
    maritalStatus: "",
    dob: '',
    category: "",
    address: {
      country: "",
      fullAddress: "",
      countryCode: "",
      latitude: "",
      longitude: ""
    },
    submitForm: true,
    
    errors: {
      name: '',
      church_group: '',
      gender: "",
      email: "",
      phoneNumber: "",
      password: "",
      maritalStatus: "",
      dob: "",
      category: "",
      address: {
        country: "",
        fullAddress: "",
        countryCode: "",
        latitude: "",
        longitude: ""
      },
    }});
  
  const genderOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' }
  ];
  const maritalOptions = [
    { value: 'single', label: 'Single'},
    { value: 'married', label: 'Married' }
  ];
  const categoryOptions = categories.map((cat)=> {
    return {value: cat.name, label: cat.name}
  });
  
  //#########MAP FORM INPUTS
  //====================================================>
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
  
  const handleMapInput = (e) => {
    setValue(e.target.value);
  };
  const handleSelect = ({ description }) => () => {
    console.log("description ", description)
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();
    // Get latitude and longitude via utility functions
    getGeocode ({ address: description })
        .then( async (results) => {
          
          const latLng = await getLatLng(results[0]);
          const {lat, lng } = latLng;
          
          const result = results[0].address_components;
          let countryData = result.find((res)=> { return (res.types).includes('country', 'political') });
          const {long_name, short_name} = countryData;
          
          setFormValues( prevState => {
            return {
              ...prevState,
              address: {
                country: long_name,
                fullAddress: description,
                countryCode: short_name,
                longitude: lng,
                latitude: lat
              },
            };
          });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
  };
  
  const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          reference,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
        
        return (
            <li className="list-search" key={reference} onClick={handleSelect(suggestion)}>
              <b><i className="bx bx-map-pin"></i> {main_text}</b> <small>{secondary_text}</small>
            </li>
        );
      });
  //### END OF MAP FORM INPUTS
  //====================================================>
  
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
    const church_group = user[0].church_group;
    setFormValues(prevState => {
      return {
        ...prevState,
        errors,
        [name]: value,
        church_group
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
   
   let countryCode = user[0].address[0].countryCode;
   if (formValues.address.countryCode) {
     countryCode = formValues.address.countryCode
   }
    const setSubmitForm = (v) => {
      return setFormValues((formerState)=> {
        return {
          ...formerState,
          submitForm: v
        }
      });
    };
    
    switch (name) {
      case "name":
        errors.name = "";
        if (value.length && value.length <= 3) {
          errors.name = "name must be more than 3 characters long!";
          setSubmitForm(true);
        } else {
          setSubmitForm(false);
        }
        return errors.name;
        
      case "email":
        errors.email = "";
        if (value.length >1 && value.length <= 3) {
          errors.email = "email must be more than 3 characters long!";
          setSubmitForm(true);
        } else if (!validator.isEmail(value)) {
           errors.email = "Email is not valid!";
           setSubmitForm(true);
        } else {
          setSubmitForm(false);
        }
        return errors.email;
        
      case "phoneNumber":
        errors.phoneNumber = "";
  
        if(value && !/^[0-9]+$/.test(value)){
          errors.phoneNumber = "phone number should be a number "
        }else if (value.length >1 && !validPhoneNumber(value, countryCode)) {
          errors.phoneNumber = "phone number is not valid!";
          setSubmitForm(true);
        } else {
          setSubmitForm(false);
        }
        return errors.phoneNumber;
      default:
        setSubmitForm(false);
        break;
    }
    
  };
  
  const {loading, errors, submitForm} = formValues;
  return (
      <div className="main-content">
      
        <div className="page-content">
          <div className="container-fluid">
            
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 font-size-18">Add a member</h4>
                
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"> <Link to="/">home </Link> </li>
                      <li className="breadcrumb-item active">Add a  church member</li>
                    </ol>
                  </div>
              
                </div>
              </div>
            </div>
          
            <div className="row">
              <div className="col-12">
  
  
                <div className="card">
                  <div className="card-body" style={{ padding: "4.25rem"}}>
                    
                    <form className="form-horizontal">
                      <div className="row">
                        <div className="col-md-4">
                           <div className="form-group row">
                              <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Full Name</label>
                              <div className="col-sm-8 mb-2">
                                <input type="text" onChange={handleChange} name="name" className="form-control" id="colFormLabel" placeholder="Full Name"/>
                                {errors.name.length > 0 && (
                                    <span className="addGroup__error">{errors.name}</span>
                                )}
                              </div>
                            </div>
  
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Address</label>
                            <div className="col-sm-8 mb-2">
                              <div ref={ref}>
                                <input
                                    value={value}
                                    onChange={handleMapInput}
                                    disabled={!ready}
                                    className="form-control"
                                    placeholder="Address"
                                />
                                {status === "OK" && <ul className="google_autocomplete">{renderSuggestions()}</ul>}
                              </div>
                            </div>
                          </div>
                          
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Phone Number</label>
                            <div className="col-sm-8 mb-2">
                              <input type="text" onChange={handleChange} value={formValues.phoneNumber} name="phoneNumber" className="form-control" id="phoneNumber" placeholder="Phone Number"/>
                              {errors.phoneNumber.length > 0 && (
                                  <span className="addGroup__error">{errors.phoneNumber}</span>
                              )}
                            </div>
                          </div>
                        </div>
  
                        <div className="col-md-4">
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Gender</label>
                            <div className="col-sm-8 mb-2">
                              <Select
                                  value={{ label: formValues.gender || "Gender" }}
                                  onChange={(option)=> {
                                    setFormValues(prevState => {
                                      return {
                                        ...prevState,
                                        gender: option.value
                                      }
                                    })
                                  }}
                                  options={genderOptions}
                              />
                            </div>
                          </div>
                          
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Marital Status</label>
                            <div className="col-sm-8 mb-2">
                              <Select
                                  value={{ label: formValues.maritalStatus || "Marital Status" }}
                                  onChange={(option)=> {
                                    setFormValues(prevState => {
                                      return {
                                        ...prevState,
                                        maritalStatus: option.value
                                      }
                                    });}}
                                  options={maritalOptions}
                              />
                            </div>
                          </div>
                          
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8 mb-2">
                              <input type="email" onChange={handleChange} name="email" className="form-control" id="colFormLabel" placeholder="email"/>
                              {errors.email.length > 0 && (
                                  <span className="addGroup__error">{errors.email}</span>
                              )}
                            </div>
                          </div>

                        </div>
  
                        <div className="col-md-4">
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Date of birth</label>
                            <div className="col-sm-8 mb-2">
                              <input type="text" onChange={handleChange} name="dob" className="form-control" id="datePicker" defaultValue="01/01/1995"/>
                            </div>
                          </div>
  
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Occupation</label>
                            <div className="col-sm-8 mb-2">
                              <input type="email" className="form-control" id="colFormLabel" placeholder="occupation"/>
                            </div>
                          </div>
    
                          <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Group</label>
                            <div className="col-sm-8 mb-2">
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
                                        category: option.value
                                      }
                                    })
                                  }}
                                  options={categoryOptions}
                                  name="category"
                              />
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
                        
                       {/* <button type="submit" className="btn btn-primary waves-effect waves-light addChurchMember">Submit</button>*/}
                        </div>
                      </div>
                      
                    </form>
                
                  </div>
                </div>
              
              </div>
             
            </div>
        
          </div>
          
        </div>
       
      </div>
  )
}

export {AddChurchMember}
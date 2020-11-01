import React, {useEffect, useState} from 'react'
import {updateCategory} from '../../utils/auth-client'
import toastr from "toastr";
import validator from "validator";
/**
 * @return {string}
 */
function InviteUser(props) {

  const $ = window.$;
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    errors: {}
  });

  useEffect(()=> {
    window.$('#addGroup').modal('show');
    $('.dropify').dropify({
      messages: {
        'default': 'Drag and drop a file here or click',
        'replace': 'Drag and drop or click to replace',
        'remove':  'Remove',
        'error':   'Ooops, something wrong happended.'
      }
    });
  }, []);

  const closeModal =() => {
    props.toggleModal(false)
  };

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
    const { email } = formValues;
    setLoading(true);
    let errors = formValues.errors;
    for (let val in formValues) {
      if (val === "email") {
        if (email.length <= 3) {
          errors.name = "email must be more than 3 characters long!";
          setLoading(false);
          return
        }
        if (!validator.isEmail(email)) {
          errors.email = "Email is not valid!";
          setLoading(false);
          return
        }
      }
    }
    for (let val of Object.values(formValues.errors)) {
      if (val) {
        setLoading(false)
      }
    }
    setFormValues(prevState => {
      return {
        ...prevState,
        errors
      };
    });
    delete formValues.errors
    let data = await updateCategory(formValues);
    if (data.status === 'success') {
      toastr.success("product uploaded")
      $("#addGroup").modal('toggle');
      props.toggleModal(false);
    }
  };


  const {errors} = formValues;

  console.log("Errors ___", errors.email)

  return (
    props.toggleModal ?
      <div id="addGroup" className="modal fade" tabIndex="-1" role="dialog"
           aria-labelledby="addGroupLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addGroupLabel" >Invite User</h5>
              <button type="button" onClick={()=> closeModal() } className="close waves-effect waves-light" data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form className="needs-validation" noValidate>
                <div className="form-row">

                  <div className="col-md-12 mb-4">
                    <label htmlFor="validationCustom01">Email</label>
                    <input type="email" onChange={handleChange} name="email" className="form-control" id="colFormLabel"/>
                    {errors.email && errors.email.length > 0 && (
                      <span className="addGroup__error">{errors.email}</span>
                    )}
                  </div>

                </div>

              </form>
            </div>
            <div className="modal-footer">

              {!loading ?
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-large waves-effect waves-light"
                  style={{ margin: "auto", display: "block", width: "200px" }}
                >
                  Invite User
                </button> :
                <button type="button"
                        className="btn btn-primary btn-large waves-effect waves-light"
                        style={{margin: "auto", display: "block", width: "200px", opacity: "0.4"}}>
                  Invite  User .....
                </button>
              }

            </div>
          </div>
        </div>
      </div> : ""
  )
}

export {InviteUser}


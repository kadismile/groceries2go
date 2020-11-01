import React, {useEffect, useState} from 'react'
import { createProductType } from '../../utils/auth-client'
import {useAuth} from '../../context/auth-context'
import LaddaButton, {SLIDE_UP, XXL} from "react-ladda";
import toastr from "toastr";
/**
 * @return {string}
 */
function AddProductTypeModal(props) {
  const $ = window.$;
  const {user} = useAuth();
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    errors: {
      name: '',
    }});

  useEffect(()=> {
    window.$('#addGroup').modal('show');
  }, []);

  const closeModal =() => {
    props.toggleModal(false)
  };

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = formValues.errors;
    switch (name) {
      case "name":
        errors.name =
          value.length <= 2
            ? " name of category must be more than 2 characters long!"
            : "";
        break;
      default:
        break;
    }
    setFormValues(prevState => {
      return {
        ...prevState,
        errors,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {

    setLoading(true)
    e.preventDefault();
    const { name } = formValues;
    if (name.length > 2) {
      const  church_group = user[0].church_group;
      await createProductType( { name });
      setLoading(false)
      $('.form_name').val("");
      toastr.success("product type added successfully");
      $("#addGroup").modal('toggle');
      props.toggleModal(false);
    } else {
      toastr.error("name of category is empty");
      setLoading(false)
    }
  };

  const {errors} = formValues;

  return (
    props.toggleModal ?
      <div id="addGroup" className="modal fade" tabIndex="-1" role="dialog"
           aria-labelledby="addGroupLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addGroupLabel" >ADD PRODUCT TYPE</h5>
              <button type="button" onClick={()=> closeModal() } className="close waves-effect waves-light" data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form className="needs-validation" noValidate>
                <div className="form-row">

                  <div className="col-md-12 mb-4">
                    <label htmlFor="validationCustom01">Name of Product Type</label>
                    <input type="text" onChange={handleChange} name="name" className="form-control form_name" id="validationCustom01" placeholder="Name" required/>
                    {errors.name.length > 0 && (
                      <span className="addGroup__error">{errors.name}</span>
                    )}
                  </div>

                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary waves-effect waves-light"
                      data-dismiss="modal" onClick={()=> closeModal() }>Close
              </button>

              <LaddaButton
                loading={loading}
                onClick={handleSubmit}
                data-size={XXL}
                data-style={SLIDE_UP}
                data-spinner-size={30}
                data-spinner-color="#ddd"
                data-spinner-lines={12}
              >
                Add Product Type
              </LaddaButton>
            </div>
          </div>
        </div>
      </div> : ""
  )
}

export {AddProductTypeModal}


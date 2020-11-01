import React, {useEffect, useState} from 'react'
import {updateCategory} from '../../utils/auth-client'
import toastr from "toastr";
/**
 * @return {string}
 */
function EditCategories(props) {

  const $ = window.$;
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: props.category.name || '',
    _id: props.category._id || '',
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
    const { name } = formValues;
    setLoading(true);
    let errors = formValues.errors;
    for (let val in formValues) {
      if (val === "name") {
        if (name.length <= 3) {
          errors.name = "variant name must be more than 3 characters long!";
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

  return (
    props.toggleModal ?
      <div id="addGroup" className="modal fade" tabIndex="-1" role="dialog"
           aria-labelledby="addGroupLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addGroupLabel" >Update Category</h5>
              <button type="button" onClick={()=> closeModal() } className="close waves-effect waves-light" data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form className="needs-validation" noValidate>
                <div className="form-row">

                  <div className="col-md-12 mb-4">
                    <label htmlFor="validationCustom01">Name</label>
                    <input type="text" onChange={handleChange} name="name" value={formValues.name} className="form-control" id="colFormLabel"/>
                    {errors.name && errors.name.length > 0 && (
                      <span className="addGroup__error">{errors.name}</span>
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
                Update Category
              </button> :
              <button type="button"
                      className="btn btn-primary btn-large waves-effect waves-light"
                      style={{margin: "auto", display: "block", width: "200px", opacity: "0.4"}}>
                Updating  Category .....
              </button>
              }

            </div>
          </div>
        </div>
      </div> : ""
  )
}

export {EditCategories}


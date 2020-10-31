import React, { useEffect, useState } from "react";
/**
 * @return {string}
 */
function EditProductVariant(props) {
  const {productVariant} = props
  const baseUrl = process.env.REACT_APP_BACKEND_URL
  const $ = window.$
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: productVariant.name,
    description: productVariant.description,
    price: productVariant.price,
    code: productVariant.code,
    quantityInCase: productVariant.quantityInCase,
    inventory: productVariant.inventory,
    uom: productVariant.uom,
    upc: productVariant.upc,
    productVariantImage: productVariant.productVariantImage,
    errors: {}
  });

  useEffect(() => {
    window.$("#editProductVariant").modal("show");
    $('.dropify').dropify({
      messages: {
        'default': 'Drag and drop a file here or click',
        'replace': 'Drag and drop or click to replace',
        'remove':  'Remove',
        'error':   'Ooops, something wrong happended.'
      }
    });
  }, []);

  const closeModal = () => {
    props.toggleModal(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    let errors = formValues.errors;
    validateForm(errors);
    for (let val of Object.values(formValues.errors)) {
      if (val) {
        setTimeout(()=> setLoading(false), 2000)
        return
      }
    }
    delete formValues.errors
    props.toggleModal(false);
    $('#editProductVariant').modal('toggle');
    props.updateVariant(productVariant.id, formValues);
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

  const handlePress = event => {
    if (event.which !== 46 && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
    let { name, value } = event.target;
    let errors = formValues.errors;
    errors[name] = "";
    setFormValues(prevState => {
      return {
        ...prevState,
        errors,
        [name]: value
      };
    });
  };

  const validateForm = errors => {
    const { name, price, code,productVariantImage, description } = formValues;

    for (let val in formValues) {
      if (val === "name") {
        if (name.length <= 3) {
          errors.name = "variant name must be more than 3 characters long!";
        }
      }

      if (val === "description") {
        if (description.length <= 3) {
          errors.description = "description must be more than 3 characters long!";
        }
      }

      if (val === "price") {
        if (!price.length) {
          errors.price = "price cannot be empty";
        }
      }

      if (val === "code") {
        if (!code.length) {
          errors.code = "code cannot be empty";
        }
      }

      if (val === "productVariantImage") {
        if (!productVariantImage) {
          errors.productVariantImage = "kindly upload an Image";
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

  const { errors, name, price, code, inventory, quantityInCase, uom,upc, description} = formValues;

  return props.toggleModal ? (
    <div
      id="editProductVariant"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addGroupLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addGroupLabel">
              Edit {productVariant.name}
            </h5>
            <button
              type="button"
              onClick={() => closeModal()}
              className="close waves-effect waves-light"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <form className="needs-validation" noValidate>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <input
                    value={name}
                    type="text"
                    onChange={handleChange}
                    name="name"
                    className="form-control form_name"
                    placeholder="Name"
                    required
                  />
                  {errors.name && errors.name.length > 0 && (
                    <span className="addGroup__error">{errors.name}</span>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    defaultValue={price}
                    type="text"
                    onKeyPress={handlePress}
                    name="price"
                    className="form-control form_name"
                    placeholder="Price"
                    required
                  />
                  {errors.price && errors.price.length > 0 && (
                    <span className="addGroup__error">{errors.price}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <input
                    value={code}
                    type="text"
                    onChange={handleChange}
                    name="code"
                    className="form-control form_name"
                    placeholder="Code"
                    required
                  />
                  {errors.code && errors.code.length > 0 && (
                    <span className="addGroup__error">{errors.code}</span>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    defaultValue={inventory}
                    type="text"
                    onKeyPress={handlePress}
                    name="inventory"
                    className="form-control form_name"
                    id="validationCustom01"
                    placeholder="Inventory"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="colFormLabel" style={{paddingLeft: "0px"}}>Product Variant Image</label>
                  <input type="file" name="productVariantImage" data-default-file={`${baseUrl}/${formValues.productVariantImage}`} onChange={handleChange} className="dropify" data-height="150" data-allowed-file-extensions="jpg png jpeg" data-max-file-size="500K"/>
                  {errors.productVariantImage && errors.productVariantImage.length > 0 && (
                    <span className="addGroup__error">{errors.productVariantImage}</span>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="colFormLabel"  style={{paddingLeft: "0px"}}>Description</label>
                  <textarea value={description} className="form-control" id="exampleFormControlTextarea1" onChange={handleChange} name="description" rows="7"></textarea>
                  {errors.description && errors.description.length > 0 && (
                    <span className="addGroup__error">{errors.description}</span>
                  )}
                </div>
              </div>

              <br />
              <hr />
              <h5>Sub Unit</h5>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <input
                    value={quantityInCase}
                    type="text"
                    onChange={handleChange}
                    name="quantityInCase"
                    className="form-control form_name"
                    placeholder="Quantity In Case"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    value={uom}
                    type="text"
                    onChange={handleChange}
                    name="uom"
                    className="form-control form_name"
                    placeholder="UOM"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <input
                    value={upc}
                    type="text"
                    onChange={handleChange}
                    name="upc"
                    className="form-control form_name"
                    placeholder="UPC"
                    required
                  />
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
                Update Product Variant
              </button> :
              <button type="button"
                      className="btn btn-primary btn-large waves-effect waves-light"
                      style={{margin: "auto", display: "block", width: "200px", opacity: "0.4"}}>
                Updating Product Variant .....
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export { EditProductVariant };

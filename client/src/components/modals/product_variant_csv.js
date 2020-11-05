import React, {useEffect, useState} from 'react'
import {uploadVariantCsv} from '../../utils/auth-client'
import { ExportToCsv } from "export-to-csv";
import toastr from "toastr";
/**
 * @return {string}
 */
function ProductVariantCsvUpload(props) {
  const $ = window.$;
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    file: '',
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
    const { file } = formValues;
    setLoading(true);
    let errors = formValues.errors;
    for (let val in formValues) {
      if (val === "file") {
        if (!file.length) {
          errors.file = "kindly upload a csv file";
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
    let formData = new FormData();
    formData.append('file', file[0])
    let data = await uploadVariantCsv(formData);
    if (data.status === 'success') {
      toastr.success("variants uploaded")
      $("#addGroup").modal('toggle');
      props.toggleModal(false);
    }
    console.log("data ")
  };

  const downloadSampleCsv = async () => {
    let data = [{
      productId: "WrSLV84lEQamss0vgd",
      name: "milo",
      description: "a nourishing beverage for you and your family",
      price: 200,
      code: "MIL123",
      quantityInCase: 40,
      inventory: 500,
      uom:"",
      upc:"",
    }];
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      title: "Variant Sample",
      useTextFile: false,
      useBom: true,
      filename: "Variant CSV",
      useKeysAsHeaders: true
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  const {errors} = formValues;

  return (
    props.toggleModal ?
      <div id="addGroup" className="modal fade" tabIndex="-1" role="dialog"
           aria-labelledby="addGroupLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addGroupLabel" >Upload Variants By CSV</h5>
              <button type="button" onClick={()=> closeModal() } className="close waves-effect waves-light" data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form className="needs-validation" noValidate>
                <div className="form-row">

                  <p>Kindly click <a href="#" onClick={downloadSampleCsv}>here</a> for a sample upload</p>
                  <div className="col-md-12 mb-4">
                    <label htmlFor="validationCustom01">CSV file</label>
                    <input type="file" name="file" onChange={handleChange} className="dropify" data-height="90" data-allowed-file-extensions="csv" data-max-file-size="500K"/>
                    {errors.file && errors.file.length > 0 && (
                      <span className="addGroup__error">{errors.file}</span>
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
                  Upload Csv
                </button> :
                <button type="button"
                        className="btn btn-primary btn-large waves-effect waves-light"
                        style={{margin: "auto", display: "block", width: "200px", opacity: "0.4"}}>
                  Uploading  Csv .....
                </button>
              }

            </div>
          </div>
        </div>
      </div> : ""
  )
}

export {ProductVariantCsvUpload}


import React, {useEffect, useState} from "react";
import {getProductType} from "../../utils/auth-client";
import {EditProductType} from "./edit_product_type_modal";
import {AddGroupModal} from "../../components/modals/add_category";
import {ProductTypeCsvUpload} from "./create_product_type_csv_modal";
import {AddProductTypeModal} from "./add_product_type_modal";
import {Loader} from "../../components/lib";
function ProductTypeList() {

  const [productType, setProductType] = useState([]);

  const [productTypeToEdit, setProductTypeToEdit] = useState("")

  const [showModal, setShowModal] = useState(false);

  const [showCsvModal, setshowCsvModal] = useState(false);

  const [addCatModal, setAddCatModal] = useState(false);

  useEffect(() => {
    (async function(){
      const {data} = await getProductType()
      setProductType(data)
      const table = document.getElementById('datatable-buttons');
      if (table) {
        window.$('#datatable-buttons').DataTable({
          "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
        });
        window.$('input[type=search]').addClass('form-control');
      }
    })()
  }, [showModal, addCatModal, showCsvModal])

  const editCategory = async (index) => {
    setShowModal(true)
    setProductTypeToEdit(productType[index])
  }

  const displayModal = (value) => {
    setShowModal(value)
    setAddCatModal(value)
    setshowCsvModal(value)
  };


  return (
      <>
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">Products</h4>
                    <div className="page-title-right">
                      <div className="btn-group" role="group" style={{marginRight: "80px"}}>
                        <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action <i className="mdi mdi-chevron-down"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1" x-placement="bottom-start"
                             style={{position: "absolute", willChange: "transform", top: "0px", left: "-70px", transform: "translate3d(0px, 36px, 0px)"}}>

                            <a href="#" onClick={e => { setAddCatModal(true) }} className="dropdown-item notify-item">
                              Add Product Type
                            </a>
                            <a href="#" onClick={e => { setshowCsvModal(true) }} className="dropdown-item">
                              Upload Product Type Csv
                            </a>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      {
                        !productType.length ? <Loader /> :
                          <div className="table-responsive">
                          <table className="table mb-0">
                            <thead className="thead-light">
                            <tr role="row">
                              <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                  colSpan={1} style={{width: '274px'}} aria-sort="ascending"
                                  aria-label="Name: activate to sort column descending">#
                              </th>
                              <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                  colSpan={1} style={{width: '274px'}} aria-sort="ascending"
                                  aria-label="Name: activate to sort column descending">Name
                              </th>
                              <th className="sorting" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                  colSpan={1} style={{width: '397px'}}
                                  aria-label="Position: activate to sort column ascending">Id
                              </th>

                              <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1} colSpan={1} style={{width: '10px'}}>
                              </th>
                              <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1} colSpan={1} style={{width: '10px'}}>
                              </th>

                            </tr>
                            </thead>
                            <tbody>
                            {productType.map((cat, index)=> {
                              return (
                                <tr key={index}>
                                  <th scope="row">{index+1}</th>
                                  <td>{cat.name}</td>
                                  <td>{cat._id}</td>
                                  <td>

                                    <a onClick={() => editCategory(index)} style={{color: "#767c82", cursor: "pointer"}}>
                                      <i className="fa fa-fw fa-edit" data-toggle="tooltip" data-placement="top" title=""data-original-title="edit"></i>
                                    </a>

                                  </td>
                                  <td>

                                  </td>
                                </tr>
                              )
                            })}

                            </tbody>
                          </table>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
        }

        {showModal ? <EditProductType toggleModal={displayModal} productType={productTypeToEdit}/> : ""}
        {addCatModal ? <AddProductTypeModal toggleModal={displayModal}/> : ""}
        {showCsvModal ? <ProductTypeCsvUpload toggleModal={displayModal}/> : ""}
      </>


  )
}

export {ProductTypeList}
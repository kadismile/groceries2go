import React, {useEffect, useState} from "react";
import {getCategory, removeProduct} from "../../utils/auth-client";
import Swal from "sweetalert2";
import {Redirect} from "react-router";
import {EditCategories} from "./edit_categories_modal";
import {EditProductVariant} from "../../components/modals/product_variant/edit_product_variant";
import {AddGroupModal} from "../../components/modals/add_category";
import {CategoryCsvUpload} from "./create_categories_csv_modal";
import {Loader} from "../../components/lib";
function CategoryList() {

  const [categories, setcategories] = useState([]);

  const [categoryToEdit, setcategoryToEdit] = useState("")

  const [showModal, setShowModal] = useState(false);

  const [showCsvModal, setshowCsvModal] = useState(false);

  const [addCatModal, setAddCatModal] = useState(false);

  useEffect(() => {
    (async function(){
      const {data} = await getCategory()
      setcategories(data)
      const table = document.getElementById('datatable-buttons');
      if (table) {
        window.$('#datatable-buttons').DataTable({
          "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
        });
        window.$('input[type=search]').addClass('form-control');
      }
    })()
  }, [showModal, addCatModal])

  const editCategory = async (index) => {
    setShowModal(true)
    setcategoryToEdit(categories[index])
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
                    <h4 className="mb-0 font-size-18">Categories</h4>
                    <div className="page-title-right">
                      <div className="btn-group" role="group" style={{marginRight: "80px"}}>
                        <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action <i className="mdi mdi-chevron-down"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1" x-placement="bottom-start"
                             style={{position: "absolute", willChange: "transform", top: "0px", left: "-70px", transform: "translate3d(0px, 36px, 0px)"}}>

                          <a href="#" onClick={e => { setAddCatModal(true) }} className="dropdown-item notify-item">
                            Add Category
                          </a>
                          <a href="#" onClick={e => { setshowCsvModal(true) }} className="dropdown-item">
                            Upload Category Csv
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
                        <div className="table-responsive">
                          {!categories.length ? <Loader /> :
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
                            {categories.map((cat, index)=> {
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
                          }
                        </div>


                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        {showModal ? <EditCategories toggleModal={displayModal} category={categoryToEdit}/> : ""}
        {addCatModal ? <AddGroupModal toggleModal={displayModal}/> : ""}
        {showCsvModal ? <CategoryCsvUpload toggleModal={displayModal}/> : ""}
      </>


  )
}

export {CategoryList}
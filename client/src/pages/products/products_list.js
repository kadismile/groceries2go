import React, {useEffect, useState} from "react";
import {getProducts, removeProduct} from "../../utils/auth-client";
import Swal from "sweetalert2";
import {Redirect} from "react-router";
import {ProductCsvUpload} from "../../components/modals/product_csv_upload";
import {FullPageSpinner, Loader} from "../../components/lib";
import {Link} from "react-router-dom";
function ProductList() {

  const [products, setProducts] = useState([]);

  const [productToEdit, setProductToEdit] = useState(false)

  const [productId, setProductId] = useState("")

  const [showModal, setShowModal] = useState(false);

  const [ids, setIds] = useState([])

  useEffect(() => {
    (async function(){
      const {data} = await getProducts()
      setProducts(data)
      const table = document.getElementById('datatable-buttons');
      if (table) {
        window.$('#datatable-buttons').DataTable({
          "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
        });
        window.$('input[type=search]').addClass('form-control');
      }
    })()
  }, [showModal])

  const editProduct = (id) => {
    setProductToEdit(true)
    setProductId(id)
  }

  const deleteProduct = async (product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover this product ${product.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then( async (result) => {
      if (result.value) {
          const result = await removeProduct(product)
        console.log(result)
      }
    })
  }

  const displayModal = (value) => {
    setShowModal(value)
  };

  const deleteMultipleProduct = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover these selected products !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete them!',
      cancelButtonText: 'No, keep them'
    }).then( async (result) => {
      if (result.value) {
        const result = await removeProduct(ids)
        console.log(result)
      }
    })
  }
  const thicked = (_id) => {
    setIds(oldArray => [...oldArray, _id]);
  }


  return (
    !productToEdit ?
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

                      <Link to="/add-product" className="dropdown-item">
                        Add Product
                      </Link>

                      <a href="#" onClick={e => { setShowModal(true) }} className="dropdown-item">
                        Upload Product Csv
                      </a>

                      { ids.length ? <a href="#" onClick={ e => { deleteMultipleProduct()} } className="dropdown-item">
                       Delete Selected Product(s)
                      </a> : ""}

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
                    !products.length ?  <Loader /> :
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead className="thead-light">
                          <tr role="row">
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1} colSpan={1} style={{width: '10px'}}>
                            </th>
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
                                aria-label="Position: activate to sort column ascending">Product Type
                            </th>
                            <th className="sorting" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '202px'}}
                                aria-label="Office: activate to sort column ascending">Status
                            </th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1} colSpan={1} style={{width: '10px'}}>
                            </th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1} colSpan={1} style={{width: '10px'}}>
                            </th>

                          </tr>
                          </thead>
                          <tbody>
                          {products.map((product, index)=> {
                            return (
                              <tr key={index}>
                                <th>
                                  <div className="custom-control custom-checkbox">
                                    <input type="checkbox" onClick={() => thicked(product._id)} className="custom-control-input" id={`customCheck1${index}`} />
                                    <label className="custom-control-label" htmlFor={`customCheck1${index}`}></label>
                                  </div>
                                </th>
                                <th scope="row">{index+1}</th>
                                <td>{product.name}</td>
                                <td>{product.productType}</td>
                                <td>{product.status}</td>
                                <td>
                                  <a onClick={() => editProduct(product._id)} style={{color: "#767c82", cursor: "pointer"}}>
                                    <i className="fa fa-fw fa-edit" data-toggle="tooltip" data-placement="top" title=""data-original-title="edit"></i>
                                  </a>
                                </td>
                                <td>
                                  <a onClick={()=> deleteProduct(product)} style={{color: "#767c82", cursor: "pointer"}}>
                                    <i className="fa fa-fw fa-trash" data-toggle="tooltip" data-placement="top" title=""data-original-title="remove"></i>
                                  </a>
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
       {showModal ? <ProductCsvUpload toggleModal={displayModal}/> : ""}
      </>
      :
       <Redirect to={"/product/edit/"+productId} state={"productId"}/>

  )
}

export {ProductList}
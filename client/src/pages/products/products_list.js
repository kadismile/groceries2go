import React, {useEffect, useState} from "react";
import {getProducts, removeProduct} from "../../utils/auth-client";
import Swal from "sweetalert2";
import {Redirect} from "react-router";
function ProductList() {

  const [products, setProducts] = useState([]);

  const [productToEdit, setProductToEdit] = useState(false)
  const [productId, setProductId] = useState("")

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
  }, [])

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


  return (
    !productToEdit ?
      <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">Products</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                    <li className="breadcrumb-item active">Products</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/*<div className="card">
                <div className="card-body">

                  <div id="datatable-buttons_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                    <br/>
                    <br/>
                    <div className="row">
                      <div className="col-sm-12">
                        <table id="datatable-buttons" className="table table-striped dt-responsive nowrap dataTable no-footer dtr-inline" role="grid" aria-describedby="datatable-buttons_info" style={{width: '1590px'}}>
                          <thead>
                          <tr role="row">
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

                          </tr>
                          </thead>
                          <tbody>

                          {
                            users.map((user, index)=> { return (
                              <tr role="row" className="odd" key={index}>
                                <td tabIndex={0} className="sorting_1">{user.name}</td>
                                <td>{user.productType}</td>
                                <td>{user.status}</td>
                              </tr>
                            )
                            })

                          }


                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>
              </div>*/}
              <div className="card">
                <div className="card-body">
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

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div> :
      <Redirect to={"/product/edit/"+productId} state={"productId"}/>
  )
}

export {ProductList}
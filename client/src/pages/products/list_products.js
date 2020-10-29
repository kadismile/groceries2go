import React, {useEffect, useState} from "react";
import moment from "moment";
import {getProducts} from "../../utils/auth-client";
function ProductList() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function(){
      const {data} = await getProducts()
      setUsers(data)
      const table = document.getElementById('datatable-buttons');
      if (table) {
        window.$('#datatable-buttons').DataTable({
          "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
        });
        window.$('input[type=search]').addClass('form-control');
      }
    })()

  }, [])

  const age = (user) => {
    const today = moment().format("Y M D");
    const age = moment(user.dob).format("Y M D");
    return moment(today).diff(moment(age), 'years')
  }


  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">Datatables</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                    <li className="breadcrumb-item active">Datatables</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
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
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export {ProductList}
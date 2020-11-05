import React from 'react'

function Home() {
  return (
      <div className="main-content">
      
        <div className="page-content">
          <div className="container-fluid">
          
          
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 font-size-18">Dashboard</h4>
                
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"><a href="javascript: void(0);">Lunoz</a></li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
              
                </div>
              </div>
            </div>
          
          
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <i className="bx bx-layer float-right m-0 h2 text-muted"></i>
                    <h6 className="text-muted text-uppercase mt-0">Orders</h6>
                    <h3 className="mb-3" data-plugin="counterup">1,587</h3>
                    <span className="badge badge-success mr-1"> +11% </span> <span className="text-muted">From previous period</span>
                  </div>
                </div>
              </div>
            
              <div className="col-xl-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <i className="bx bx-dollar-circle float-right m-0 h2 text-muted"></i>
                    <h6 className="text-muted text-uppercase mt-0">Revenue</h6>
                    <h3 className="mb-3">₦<span data-plugin="counterup">46,782</span></h3>
                    <span className="badge badge-danger mr-1"> -29% </span> <span className="text-muted">From previous period</span>
                  </div>
                </div>
              </div>
            
              <div className="col-xl-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <i className="bx bx-bx bx-analyse float-right m-0 h2 text-muted"></i>
                    <h6 className="text-muted text-uppercase mt-0">Average Price</h6>
                    <h3 className="mb-3">₦<span data-plugin="counterup">15.9</span></h3>
                    <span className="badge badge-warning mr-1"> 0% </span> <span className="text-muted">From previous period</span>
                  </div>
                </div>
              </div>
            
              <div className="col-xl-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <i className="bx bx-basket float-right m-0 h2 text-muted"></i>
                    <h6 className="text-muted text-uppercase mt-0">Product Sold</h6>
                    <h3 className="mb-3" data-plugin="counterup">1,890</h3>
                    <span className="badge badge-success mr-1"> +89% </span> <span
                      className="text-muted">Last year</span>
                  </div>
                </div>
              </div>
            </div>
          
          
            <div className="row">
            
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown float-right position-relative">
                      <a href="#" className="dropdown-toggle h4 text-muted" data-toggle="dropdown"
                         aria-expanded="false">
                        <i className="mdi mdi-dots-vertical"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li><a href="#" className="dropdown-item">Action</a></li>
                        <li><a href="#" className="dropdown-item">Another action</a></li>
                        <li><a href="#" className="dropdown-item">Something else here</a></li>
                        <li className="dropdown-divider"></li>
                        <li><a href="#" className="dropdown-item">Separated link</a></li>
                      </ul>
                    </div>
                    <h4 className="card-title d-inline-block">Daily Sales</h4>
                  
                    <div id="morris-donut-example" className="morris-chart" style={{height: "260px"}}></div>
                  
                    <div className="row text-center mt-4">
                      <div className="col-6">
                        <h4>5,459</h4>
                        <p className="text-muted mb-0">Total Sales</p>
                      </div>
                      <div className="col-6">
                        <h4>18</h4>
                        <p className="text-muted mb-0">Open Compaign</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
            
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown float-right position-relative">
                      <a href="#" className="dropdown-toggle h4 text-muted" data-toggle="dropdown"
                         aria-expanded="false">
                        <i className="mdi mdi-dots-vertical"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li><a href="#" className="dropdown-item">Action</a></li>
                        <li><a href="#" className="dropdown-item">Another action</a></li>
                        <li><a href="#" className="dropdown-item">Something else here</a></li>
                        <li className="dropdown-divider"></li>
                        <li><a href="#" className="dropdown-item">Separated link</a></li>
                      </ul>
                    </div>
                    <h4 className="card-title d-inline-block">Statistics</h4>
                  
                    <div id="morris-bar-example" className="morris-chart" style={{height: "260px"}}></div>
                  
                    <div className="row text-center mt-4">
                      <div className="col-6">
                        <h4>₦1875.54</h4>
                        <p className="text-muted mb-0">Revenue</p>
                      </div>
                      <div className="col-6">
                        <h4>541</h4>
                        <p className="text-muted mb-0">Total Offers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown float-right position-relative">
                      <a href="#" className="dropdown-toggle h4 text-muted" data-toggle="dropdown"
                         aria-expanded="false">
                        <i className="mdi mdi-dots-vertical"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li><a href="#" className="dropdown-item">Action</a></li>
                        <li><a href="#" className="dropdown-item">Another action</a></li>
                        <li><a href="#" className="dropdown-item">Something else here</a></li>
                        <li className="dropdown-divider"></li>
                        <li><a href="#" className="dropdown-item">Separated link</a></li>
                      </ul>
                    </div>
                    <h4 className="card-title d-inline-block">Total Revenue</h4>
                  
                    <div id="morris-line-example" className="morris-chart" style={{height: "260px"}}></div>
                  
                    <div className="row text-center mt-4">
                      <div className="col-6">
                        <h4>₦7841.12</h4>
                        <p className="text-muted mb-0">Total Revenue</p>
                      </div>
                      <div className="col-6">
                        <h4>17</h4>
                        <p className="text-muted mb-0">Open Compaign</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
            </div>
          
            <div className="row">
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown float-right position-relative">
                      <a href="#" className="dropdown-toggle h4 text-muted" data-toggle="dropdown"
                         aria-expanded="false">
                        <i className="mdi mdi-dots-vertical"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li><a href="#" className="dropdown-item">Action</a></li>
                        <li><a href="#" className="dropdown-item">Another action</a></li>
                        <li><a href="#" className="dropdown-item">Something else here</a></li>
                        <li className="dropdown-divider"></li>
                        <li><a href="#" className="dropdown-item">Separated link</a></li>
                      </ul>
                    </div>
                  
                    <h4 className="card-title overflow-hidden">Recent Buyers</h4>
                    <p className="card-subtitle mb-4 font-size-13 overflow-hidden">Transaction period from 21 July to 25
                      Aug
                    </p>
                  
                    <div className="table-responsive">
                      <table className="table table-centered table-hover table-xl mb-0" id="recent-orders">
                        <thead>
                        <tr>
                          <th className="border-top-0">Product</th>
                          <th className="border-top-0">Customers</th>
                          <th className="border-top-0">Categories</th>
                          <th className="border-top-0">Popularity</th>
                          <th className="border-top-0">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td className="text-truncate">iPone X</td>
                          <td className="text-truncate">Tiffany W. Yang</td>
                          <td>
                            <span className="badge badge-soft-success p-2">Mobile</span>
                          </td>
                          <td>
                            <div className="progress" style={{height: "6px"}}>
                              <div className="progress-bar progress-bar-striped bg-secondary"
                                   role="progressbar" aria-valuenow="85"
                                   aria-valuemin="20" aria-valuemax="100"
                                   style={{width:"85%"}}></div>
                            </div>
                          </td>
                          <td className="text-truncate">₦ 1200.00</td>
                        </tr>
                        <tr>
                          <td className="text-truncate">iPad</td>
                          <td className="text-truncate">Dale P. Warman</td>
                          <td>
                            <span className="badge badge-soft-success p-2">Tablet</span>
                          </td>
                          <td>
                            <div className="progress" style={{height: "6px"}}>
                              <div className="progress-bar progress-bar-striped bg-secondary"
                                   role="progressbar" aria-valuenow="72"
                                   aria-valuemin="20" aria-valuemax="100"
                                   style={{width:"72%"}}></div>
                            </div>
                          </td>
                          <td className="text-truncate">₦ 1190.00</td>
                        </tr>
                        <tr>
                          <td className="text-truncate">OnePlus</td>
                          <td className="text-truncate">Garth J. Terry</td>
                          <td>
                            <span className="badge badge-soft-success p-2">Electronics</span>
                          </td>
                          <td>
                            <div className="progress" style={{height: "6px"}}>
                              <div className="progress-bar progress-bar-striped bg-secondary"
                                   role="progressbar" aria-valuenow="43"
                                   aria-valuemin="20" aria-valuemax="100"
                                   style={{width: "43%"}}></div>
                            </div>
                          </td>
                          <td className="text-truncate">₦ 999.00</td>
                        </tr>
                        <tr>
                          <td className="text-truncate">ZenPad</td>
                          <td className="text-truncate">Marilyn D. Bailey</td>
                          <td>
                            <span className="badge badge-soft-success p-2">Cosmetics</span>
                          </td>
                          <td>
                            <div className="progress" style={{height: "6px"}}>
                              <div className="progress-bar progress-bar-striped bg-secondary"
                                   role="progressbar" aria-valuenow="37"
                                   aria-valuemin="20" aria-valuemax="100"
                                   style={{ width:"37%" }}></div>
                            </div>
                          </td>
                          <td className="text-truncate">₦ 1150.00</td>
                        </tr>
                        <tr>
                          <td className="text-truncate">Pixel 2</td>
                          <td className="text-truncate">Denise R. Vaughan</td>
                          <td>
                            <span className="badge badge-soft-success p-2">Appliences</span>
                          </td>
                          <td>
                            <div className="progress" style={{height: "6px"}}>
                              <div className="progress-bar progress-bar-striped bg-secondary"
                                   role="progressbar" aria-valuenow="82"
                                   aria-valuemin="20" aria-valuemax="100"
                                   style={{width:"82%"}}></div>
                            </div>
                          </td>
                          <td className="text-truncate">₦ 1180.00</td>
                        </tr>
                        <tr>
                          <td className="text-truncate">Pixel 2</td>
                          <td className="text-truncate">Jeffery R. Wilson</td>
                          <td>
                            <span className="badge badge-soft-success p-2">Mobile</span>
                          </td>
                          <td>
                            <div className="progress" style={{height: "6px"}}>
                              <div className="progress-bar progress-bar-striped bg-secondary"
                                   role="progressbar" aria-valuenow="36"
                                   aria-valuemin="20" aria-valuemax="100"
                                   style={{width:"36%"}}></div>
                            </div>
                          </td>
                          <td className="text-truncate">₦ 1180.00</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                
                  </div>
              
                </div>
            
              </div>
            
            
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-body">
                  
                    <div className="dropdown float-right position-relative">
                      <a href="#" className="dropdown-toggle h4 text-muted" data-toggle="dropdown"
                         aria-expanded="false">
                        <i className="mdi mdi-dots-vertical"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li><a href="#" className="dropdown-item">Action</a></li>
                        <li><a href="#" className="dropdown-item">Another action</a></li>
                        <li><a href="#" className="dropdown-item">Something else here</a></li>
                        <li className="dropdown-divider"></li>
                        <li><a href="#" className="dropdown-item">Separated link</a></li>
                      </ul>
                    </div>
                  
                    <h4 className="card-title overflow-hidden">Account Transactions</h4>
                    <p className="card-subtitle mb-4 font-size-13 overflow-hidden">Transaction period from 21 July to 25
                      Aug
                    </p>
                  
                    <div className="table-responsive">
                      <table
                          className="table table-borderless table-hover table-centered table-nowrap mb-0">
                        <tbody>
                        <tr>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">4257 **** ****
                              7852</h5>
                            <span className="text-muted font-size-12">11 April 2019</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">₦79.49</h5>
                            <span className="text-muted font-size-12">Amount</span>
                          </td>
                          <td>
                            <h5 className="font-size-17 mb-1 font-weight-normal"><i
                                className="fab fa-cc-visa"></i></h5>
                            <span className="text-muted font-size-12">Card</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">Helen Warren
                            </h5>
                            <span className="text-muted font-size-12">Pay</span>
                          </td>
                        </tr>
                      
                        <tr>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">4265 **** ****
                              0025</h5>
                            <span className="text-muted font-size-12">28 Jan 2019</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">₦1254.00</h5>
                            <span className="text-muted font-size-12">Amount</span>
                          </td>
                          <td>
                            <h5 className="font-size-17 mb-1 font-weight-normal"><i
                                className="fab fa-cc-stripe"></i></h5>
                            <span className="text-muted font-size-12">Card</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">Kayla Lambie
                            </h5>
                            <span className="text-muted font-size-12">Pay</span>
                          </td>
                        </tr>
                      
                        <tr>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">5570 **** ****
                              8547</h5>
                            <span className="text-muted font-size-12">08 Dec 2018</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">₦784.25</h5>
                            <span className="text-muted font-size-12">Amount</span>
                          </td>
                          <td>
                            <h5 className="font-size-17 mb-1 font-weight-normal"><i
                                className="fab fa-cc-amazon-pay"></i></h5>
                            <span className="text-muted font-size-12">Card</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">Hugo Lavarack
                            </h5>
                            <span className="text-muted font-size-12">Pay</span>
                          </td>
                        </tr>
                      
                        <tr>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">7845 **** ****
                              5214</h5>
                            <span className="text-muted font-size-12">03 Dec 2018</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">₦485.24</h5>
                            <span className="text-muted font-size-12">Amount</span>
                          </td>
                          <td>
                            <h5 className="font-size-17 mb-1 font-weight-normal"><i
                                className="fab fa-cc-visa"></i></h5>
                            <span className="text-muted font-size-12">Card</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">Amber Scurry
                            </h5>
                            <span className="text-muted font-size-12">Pay</span>
                          </td>
                        </tr>
                      
                        <tr>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">4257 **** ****
                              7852</h5>
                            <span className="text-muted font-size-12">12 Nov 2018</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">₦8964.04</h5>
                            <span className="text-muted font-size-12">Amount</span>
                          </td>
                          <td>
                            <h5 className="font-size-17 mb-1 font-weight-normal"><i
                                className="fab fa-cc-visa"></i></h5>
                            <span className="text-muted font-size-12">Card</span>
                          </td>
                          <td>
                            <h5 className="font-size-15 mb-1 font-weight-normal">Caitlyn Gibney
                            </h5>
                            <span className="text-muted font-size-12">Pay</span>
                          </td>
                        </tr>
                      
                        </tbody>
                      </table>
                    </div>
                
                  </div>
              
                </div>
            
              </div>
          
            </div>
        
          </div>
      
        </div>
      
        {/*<footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                2020 © Lunoz.
              </div>
              <div className="col-sm-6">
                <div className="text-sm-right d-none d-sm-block">
                  Design & Develop by Myra
                </div>
              </div>
            </div>
          </div>
        </footer>*/}
    
      </div>
  )
}

export {Home}
import React from 'react'
import {Link } from 'react-router-dom'
function SideBar() {
  return (
      <>
        <div className="vertical-menu">
    
          <div data-simplebar className="h-100">
      
            <div className="navbar-brand-box">
              <br/>
              <h5>
                <a href="/" style={{color: "white"}}>Grocesries2go</a>
              </h5>
             
            </div>
      
            
            <div id="sidebar-menu">
            
              <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title">Menu</li>
          
                <li>
                  <Link to="/" className="waves-effect"> <i className='bx bx-home-smile'></i><span
                      className="badge badge-pill badge-primary float-right">7</span><span>Dashboard</span></Link>
                </li>

                <li>
                  <Link to="/church-members" className="waves-effect"> <i className='bx bx-list-ol'></i><span>Transactions</span> </Link>
                </li>

                <li>
                  <Link to="/church-members" className="waves-effect"> <i className='bx bx-cart'></i><span>Orders</span> </Link>
                </li>

                <li>
                  <Link to="/church-members" className="waves-effect"> <i className='bx bx-car'></i><span>Delivery Trips</span> </Link>
                </li>
  
                <li>
                  <Link to="/church-members" className="waves-effect"> <i className='bx bx-group'></i><span>Members</span> </Link>
                </li>
                
  
                <li>
                  <Link to="/products/list" className="waves-effect"> <i className='bx bxl-product-hunt'></i><span>Products</span> </Link>
                </li>

                <li>
                  <a href="index.html" className="waves-effect"><i className='bx bx-git-branch'></i><span>Brands</span></a>
                </li>

                <li>
                  <a href="index.html" className="waves-effect"><i className='bx bx-stats'></i><span>Inventory  Report</span></a>
                </li>

  
               {/* <li>
                  <a href="/#" className="has-arrow waves-effect"><i
                      className="bx bx-pound"></i><span>Accounting</span></a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li><a href="ui-buttons.html">Buttons</a></li>
                    <li><a href="ui-cards.html">Cards</a></li>


                  </ul>
                </li>*/}


  
  
                <li>
                  <a href="/#" className="has-arrow waves-effect"><i
                      className="bx bx-cog"></i><span>Settings</span></a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li><a href="ui-buttons.html">User</a></li>
                    <li><a href="ui-cards.html">Sms</a></li>
                  </ul>
                </li>
                
                
              </ul>
            </div>
           
          </div>
        </div>
      
      </>
  
  );
}

export {SideBar}
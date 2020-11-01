/** @jsx jsx */
/** @jsxFrag React.Fragment */
//import React, {useEffect} from 'react'
import {jsx} from '@emotion/core'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorMessage,} from './components/lib'
import {Home} from './pages/home'
import {AddProduct} from './pages/products/add_products'
import {AddGroupModal} from './components/modals/add_category'
import {NotFoud} from './components/404'
import {Header} from "./components/header";
import {SideBar} from "./components/sidebar";
import React from "react";
import {ChurchMemberList} from "./pages/church_members/church_member_list";
import {ProductList} from "./pages/products/products_list";
import {ProductEdit} from "./pages/products/product_edit";
import {CategoryList} from "./pages/categories/list_categories";
import {ProductTypeList} from "./pages/product_type/list_product_type";

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function AuthenticatedApp() {
  return (
   <div id="layout-wrapper">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <Route render={props => <Header {...props} />} />
          <Route render={props => <SideBar {...props} />} />
          <Switch>
            <Route path="/" exact render={props => <Home {...props} />} />
            <Route path="/add-product" exact render={props => <AddProduct {...props} />} />
            <Route path="/products/list" exact render={props => <ProductList {...props} />} />
            <Route path="/product/edit/:productId" exact render={props => <ProductEdit {...props} />} />
            <Route path="/add-group" exact render={props => <AddGroupModal {...props} />} />
            <Route path="/categories" exact render={props => <CategoryList {...props} />} />
            <Route path="/product-types" exact render={props => <ProductTypeList {...props} />} />
            <Route path="*" exact render={props => <NotFoud {...props} />} />
          </Switch>
        </Router>
        
      </ErrorBoundary>
     <footer className="footer">
       <div className="container-fluid">
         <div className="row">
           <div className="col-sm-6">
           
           </div>
           <div className="col-sm-6">
             <div className="text-sm-right d-none d-sm-block">
               {new Date().getFullYear()} © kadismile.
             </div>
           </div>
         </div>
       </div>
     </footer>
    </div>
  )
}


export default AuthenticatedApp

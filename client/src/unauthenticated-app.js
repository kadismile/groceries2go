import React, {useEffect, useState} from 'react'
import {useAuth} from './context/auth-context'
import {useForm} from "./hooks/useForm";
import LaddaButton, { XXL,SLIDE_UP} from 'react-ladda';

function UnauthenticatedApp() {
  
  useEffect(()=> {
    window.$('body').addClass("bg-primary");
    return () => {
      setTimeout(()=>{
        window.$("#side-menu").metisMenu()
      }, 1000);
      window.$('body').removeClass("bg-primary");
    }
  },[]);
  
  const {login, user} = useAuth();
  const [values, handleChange] = useForm({email: '', password: ''});
  const [loading, handleLoading] = useState(false);
  
  async function handleSubmit(event) {
    event.preventDefault();
    handleLoading(true);
    
    setTimeout(()=>{
      if (!user) {
        handleLoading(false);
      }
    },1000);
    
    let {email, password} = values;
    email = "brianking319@gmail.com";
    password = "111222";

    let x = await login( {email, password});



    console.log("hello ____", x)

  }
  
  
  return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center min-vh-100">
                <div className="w-100 d-block my-5">
                  <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-5">
                      <div className="card">
                        <div className="card-body">
                          <div className="text-center mb-4 mt-3">
                            <h3>
                              <a href="/">CHURCH ADMIN</a>
                            </h3>
                          </div>
                          <form>
                            <div className="form-group">
                              <label htmlFor="emailaddress">Email address</label>
                              <input type="email" name="email" onChange={handleChange} className="form-control" placeholder="Your Email Address"/>
                            </div>
                            <div className="form-group">
                              <a href="pages-recoverpw.html" className="text-muted float-right">Forgot your
                                password?</a>
                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" onChange={handleChange} className="form-control" required placeholder="Your Password"/>
                            </div>
                          
                            <div className="form-group mb-4 pb-3">
                              <div className="custom-control custom-checkbox checkbox-primary">
                                <input type="checkbox" className="custom-control-input" id="checkbox-signin"/>
                                  <label className="custom-control-label" htmlFor="checkbox-signin">Remember me</label>
                              </div>
                            </div>
                            <div className="mb-3 text-center">
                              <LaddaButton
                                  loading={loading}
                                  onClick={handleSubmit}
                                  data-size={XXL}
                                  data-style={SLIDE_UP}
                                  data-spinner-size={30}
                                  data-spinner-color="#ddd"
                                  data-spinner-lines={12}
                              >
                                Sign In
                              </LaddaButton>
                            </div>
                          </form>
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

export default UnauthenticatedApp

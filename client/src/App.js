import React, {useEffect} from 'react'
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'
const AuthenticatedApp = React.lazy(() => import('./authenticated-app'),)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  
  useEffect(()=>{
    setTimeout(()=>{
      window.$("#side-menu").metisMenu()
    }, 1000)
  },[]);
  
  const {user} = useAuth();
  
  return (
      <React.Suspense fallback={<FullPageSpinner />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
  )
}

export {App}

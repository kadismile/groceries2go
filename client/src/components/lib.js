/** @jsx jsx */
/** @jsxFrag React.Fragment */
import {jsx} from '@emotion/core'

import {Link as RouterLink} from 'react-router-dom'
import styled from '@emotion/styled/macro'
import {keyframes} from '@emotion/core'
import {Dialog as ReachDialog} from '@reach/dialog'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})


const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  rex: {
    width: '100%',
    margin: '10vh auto',
  },
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

function FullPageSpinner() {
  return (
      <div
          css={{
            fontSize: '4em',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <div className="spinner-border avatar-lg text-primary m-2" role="status"></div>
      </div>
  )
}

const Link = styled(RouterLink)({
  color: "indigo",
  ':hover': {
    color: 'dark',
    textDecoration: 'underline',
  },
})

const errorMessageVariants = {
  stacked: {display: 'block'},
  inline: {display: 'inline-block'},
}

function ErrorMessage({error, variant = 'stacked', ...props}) {
  return (
      <div
          role="alert"
          css={[{color: 'red'}, errorMessageVariants[variant]]}
          {...props}
      >
        <span>There was an error: </span>
        <pre
            css={[
              {whiteSpace: 'break-spaces', margin: '0', marginBottom: -5},
              errorMessageVariants[variant],
            ]}
        >
        {error.message}
      </pre>
      </div>
  )
}

function FullPageErrorFallback({error}) {
  return (
      <div
          role="alert"
          css={{
            color: 'red',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
  )
}

export {
  FullPageErrorFallback,
  ErrorMessage,
  Spinner,
  Dialog,
  FormGroup,
  FullPageSpinner,
  Link,
}

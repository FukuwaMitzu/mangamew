import '../styles/globals.css'
import App from '../src/layouts/App'
import { Fragment } from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <App>
        <Component {...pageProps} />
      </App>
    </Fragment>
  )
}

export default MyApp

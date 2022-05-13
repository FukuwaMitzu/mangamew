import 'styles/globals.css'
import App from 'src/layouts/App'
import { Fragment } from 'react'
import { Provider} from 'react-redux'
import store from "src/store"

import "@fontsource/material-icons-outlined";
import "@fontsource/poppins";


function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Provider store={store}>
        <App>
          <Component {...pageProps} />
        </App>
      </Provider>
    </Fragment>
  )
}

export default MyApp

import 'react-toastify/dist/ReactToastify.css'
import Chat from './components/Chat/Chat'
import GlobalStyles from './theme/GlobalStyles'
import Main from 'components/templates/Main/Main'
import React from 'react'
import store from 'store/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { theme } from './theme/theme'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Main>
          <Chat />
        </Main>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  )
}

export default App

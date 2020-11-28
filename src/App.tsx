import Chat from './components/Chat/Chat'
import GlobalStyles from './theme/GlobalStyles'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'
import store from 'store/store'
import ChatRoom from 'components/Chat/ChatRoom'

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ChatRoom />
      <Chat />
    </ThemeProvider>
  </Provider>
)

export default App

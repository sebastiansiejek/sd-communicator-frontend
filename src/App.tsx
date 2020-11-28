import Chat from './components/Chat/Chat'
import GlobalStyles from './theme/GlobalStyles'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Chat />
  </ThemeProvider>
)

export default App

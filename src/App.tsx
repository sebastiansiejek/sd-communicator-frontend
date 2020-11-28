import Chat from './components/Chat/Chat'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'
import GlobalStyles from './theme/GlobalStyles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <Chat />
      </div>
    </ThemeProvider>
  )
}

export default App

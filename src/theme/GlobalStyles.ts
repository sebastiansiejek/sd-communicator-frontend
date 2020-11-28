import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyles = createGlobalStyle`
  ${normalize}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }
`

export default GlobalStyles

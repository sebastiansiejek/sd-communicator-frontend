import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyles = createGlobalStyle`
  ${normalize}
  @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    outline: none;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Epilogue', sans-serif;
    font-size: 1.6rem;
  }
`

export default GlobalStyles

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
  #chat-header{
    background: #1FCA74;
    padding: 2rem;
    color: #fff;
    width: 92.6rem;
  }
  #room-id{
    color: #101B4F;
  }
  #copy-link{
    display: inline-block;
  }
  #copy-link button{
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
    border: none;
    color: ${({ theme }) => theme.colors.black[700]};
    font-weight: bold;
    padding: 1rem;
    background: #4D68C1;
    box-shadow: 0px 5px 15px rgba(16, 27, 79, 0.15);
    border-radius: 10px;

    &:hover {
      background: #fff;
    }
  }
`

export default GlobalStyles

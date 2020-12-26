import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    radius: {
      small: string
      normal: string
    }

    colors: {
      black: {
        700: string
      }
      yellow: {
        500: string
      }
      blue: {
        600: string
      }
      gray: {
        500: string
      }
      white: {
        600: string
      }
      green: {
        500: string
      }
    }
  }
}

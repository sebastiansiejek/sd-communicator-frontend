import styled from 'styled-components'

const InputStyled = styled.input`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};
`

export default InputStyled

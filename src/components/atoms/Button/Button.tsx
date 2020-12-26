import styled from 'styled-components'

const ButtonStyled = styled.button`
  padding: 1.2rem 1.6rem;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  border: none;
  color: ${({ theme }) => theme.colors.white[600]};
  font-weight: bold;
  margin-left: 0.8rem;
  background: #4d68c1;
  box-shadow: 0px 5px 15px rgba(16, 27, 79, 0.15);
  border-radius: 10px;

  &:hover {
    background: #1fca74;
    color: ${({ theme }) => theme.colors.white[600]};
  }
`
export default ButtonStyled

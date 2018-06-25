import styled from 'styled-components';

const Input = styled.input`
  display: inline-block;
  padding: 4px;
  border: 1px solid #e6ecf0;
  border-radius: 3px;
  outline: 0;
  flex: 1;
  font-size: 14px;
  &:focus {
    border-color: #A3D4F2;
    box-shadow: inset 0 0 0 1px rgba(27,149,224,0.7);
  }
`;

export default Input;

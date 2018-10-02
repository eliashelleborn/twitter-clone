import styled from 'styled-components';

const User = styled.button`
  border: none;
  outline: 0;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export default User;

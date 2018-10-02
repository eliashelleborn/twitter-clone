import styled from 'styled-components';

const Avatar = styled.div`
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-top: 3px;
`;

export default Avatar;
